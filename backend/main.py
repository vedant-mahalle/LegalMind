from fastapi import FastAPI, Request, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
from pathlib import Path
from dotenv import load_dotenv
import uuid
from datetime import datetime

# Import your existing logic
import chromadb
from sentence_transformers import SentenceTransformer
from groq import Groq
from pypdf import PdfReader

# Load env
load_dotenv()
DB_DIR = os.getenv("CHROMA_DIR", "./chroma_store")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "mixtral-8x7b-32768")

# Embedding model
embedder = SentenceTransformer("all-MiniLM-L6-v2")
class ChromaEmbeddingFunction:
    def __call__(self, input):
        return embedder.encode(input, convert_to_numpy=True).tolist()
    def name(self):
        return "all-MiniLM-L6-v2"

client = chromadb.PersistentClient(path=DB_DIR)
collection = client.get_or_create_collection(
    name="legal-notices",
    embedding_function=ChromaEmbeddingFunction()
)

groq_client = Groq(api_key=GROQ_API_KEY)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NoticeRequest(BaseModel):
    prompt: str
    senderName: str
    recipientName: str
    jurisdiction: Optional[str] = ""
    deadline: Optional[str] = ""
    urgency: Optional[str] = ""
    k: Optional[int] = 6
    max_tokens: Optional[int] = 4096

def _chunk_text_words(text: str, max_words: int = 250) -> List[str]:
    words = text.split()
    chunks = []
    for i in range(0, len(words), max_words):
        chunk = " ".join(words[i:i + max_words]).strip()
        if chunk:
            chunks.append(chunk)
    return chunks


def _extract_pdf_text_chunks(pdf_path: Path, max_words: int = 250) -> List[str]:
    chunks: List[str] = []
    reader = PdfReader(str(pdf_path))
    for page in reader.pages:
        text = page.extract_text() or ""
        if not text.strip():
            continue
        for c in _chunk_text_words(text, max_words=max_words):
            chunks.append(c)
    return chunks


def _ingest_pdf(pdf_path: Path, source_label: Optional[str] = None) -> int:
    if not pdf_path.exists() or not pdf_path.is_file():
        raise FileNotFoundError(f"No file found at: {pdf_path}")
    chunks = _extract_pdf_text_chunks(pdf_path)
    if not chunks:
        return 0
    ids = [str(uuid.uuid4()) for _ in chunks]
    metadatas = [{
        "source": str(pdf_path),
        "source_label": source_label or pdf_path.stem,
    }] * len(chunks)
    collection.add(ids=ids, documents=chunks, metadatas=metadatas)
    return len(chunks)


def _ensure_non_empty_store() -> bool:
    try:
        results = collection.query(query_texts=["__ping__"], n_results=1)
        docs = results.get("documents") or []
        return bool(docs and docs[0])
    except Exception:
        return True


def _auto_ingest_from_dir():
    auto_dir = os.getenv("AUTO_INGEST_DIR", str(Path(__file__).parent / "data"))
    folder = Path(auto_dir)
    if not folder.exists():
        try:
            folder.mkdir(parents=True, exist_ok=True)
        except Exception:
            return
    if _ensure_non_empty_store():
        return
    # Ingest all PDFs if store appears empty
    for pdf in folder.glob("*.pdf"):
        try:
            _ingest_pdf(pdf)
        except Exception:
            continue


@app.on_event("startup")
def on_startup():
    _auto_ingest_from_dir()


@app.post("/generate-notice")
async def generate_notice(data: NoticeRequest):
    # Retrieve context
    try:
        results = collection.query(query_texts=[data.prompt], n_results=data.k)
    except Exception:
        results = {"documents": [[]], "ids": [[]], "metadatas": [[]]}
    docs = results.get("documents") or [[]]
    ids = results.get("ids") or [[]]
    metas = results.get("metadatas") or [[]]
    hits = []
    for i in range(len(docs[0])):
        hits.append({
            "document": docs[0][i],
            "id": ids[0][i] if ids and ids[0] else None,
            "metadata": metas[0][i] if metas and metas[0] else {}
        })
    def format_context_for_prompt(hits):
        parts = []
        for i, h in enumerate(hits, 1):
            src = h.get("metadata", {}).get("source_label") or h.get("metadata", {}).get("source") or "unknown"
            parts.append(f"[{i}] Source: {src}\n{h['document']}")
        return "\n\n".join(parts)
    context_block = format_context_for_prompt(hits) if hits else ""
    today = datetime.now().strftime("%d %B %Y")

    # Normalized user-provided details (empty strings allowed; model will keep placeholders if missing)
    sender = (data.senderName or "").strip()
    recipient = (data.recipientName or "").strip()
    jurisdiction = (data.jurisdiction or "").strip()
    deadline = (data.deadline or "").strip()
    urgency = (data.urgency or "").strip()

    prompt = f"""You are a meticulous Indian legal assistant. Using ONLY the context below, draft a formal, professional legal notice. If context is insufficient for any claim, state assumptions explicitly.\n\n=== CONTEXT START ===\n{context_block if context_block.strip() else 'No relevant context was retrieved.'}\n=== CONTEXT END ===\n\n=== USER PROVIDED DETAILS (USE EXACTLY AS GIVEN WHERE APPLICABLE) ===\nSender Name: {sender or '<Your Name>'}\nRecipient Name: {recipient or '<Recipient Name>'}\nJurisdiction: {jurisdiction or '<Jurisdiction>'}\nResponse Deadline: {deadline or '30 days from receipt'}\nUrgency: {urgency or 'Standard'}\nCurrent Date: {today}\n\nQUERY (Matter Description):\n{data.prompt}\n\nREQUIREMENTS:\n- Write in clear, formal legal language suitable for India.\n- Use the names above verbatim in the From and To sections.\n- If Jurisdiction is provided, include a line mentioning the applicable jurisdiction.\n- In Legal Basis, prefer precise statutory citations from context (Act name and section numbers), quote short relevant fragments when helpful, and avoid fabricating citations.\n- In Response Timeline, reflect the provided Response Deadline and optionally reference the Urgency.\n- Output in the following sections with headings:\n  1. Date\n  2. From\n  3. To\n  4. Subject\n  5. Background / Facts\n  6. Legal Basis\n  7. Demands / Relief Sought\n  8. Response Timeline\n  9. Consequences of Non-Compliance\n  10. Disclaimer\n  11. Signature\n\nCONSTRAINTS:\n- Avoid inventing sections not supported by context.\n- If statutes are unclear in the context, say: 'Based on available context, specific statutory citation is not determinable.'\n- Do not add extra commentary outside the sections.\n\nFORMAT STRICTLY LIKE THIS (no extra commentary outside sections):\n\nDate: {today}\n\nFrom:\n{sender or '<Your Name / Firm>'}\n<Address>\n<Contact>\n\nTo:\n{recipient or '<Recipient Name / Entity>'}\n<Address>\n\nSubject: <Concise subject>\n\nBackground / Facts:\n<...>\n\nLegal Basis:\n- Cite provisions as: Act Name — Section X ("short quote if applicable")\n- Explain why each applies.\n\nDemands / Relief Sought:\n<...>\n\nResponse Timeline:\n{deadline or '30 days from receipt'} ({urgency or 'Standard'})\n\nConsequences of Non-Compliance:\n<...>\n\nDisclaimer:\n<...>\n\nSignature:\n{sender or '<Your Name>'}\n<Designation>\n\nJurisdiction:\n{jurisdiction or '<Jurisdiction>'}\n"""
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a meticulous Indian legal assistant. Draft professional legal notices based on provided context and queries."},
                {"role": "user", "content": prompt}
            ],
            model=GROQ_MODEL,
            max_tokens=data.max_tokens,
            temperature=0.1,
            top_p=0.9,
        )
        notice_text = chat_completion.choices[0].message.content.strip()
    except Exception as e:
        return {"error": str(e)}
    return {
        "notice": notice_text,
        "context": hits,
        "metadata": {
            "senderName": data.senderName,
            "recipientName": data.recipientName,
            "jurisdiction": data.jurisdiction,
            "deadline": data.deadline,
            "urgency": data.urgency,
            "date": today
        }
    }


class IngestPathRequest(BaseModel):
    path: str
    label: Optional[str] = None


@app.post("/ingest-path")
async def ingest_path(body: IngestPathRequest):
    pdf_path = Path(body.path).expanduser().resolve()
    try:
        count = _ingest_pdf(pdf_path, source_label=body.label)
        return {"status": "ok", "chunks": count, "source": str(pdf_path)}
    except Exception as e:
        return {"status": "error", "error": str(e)}


@app.post("/ingest-file")
async def ingest_file(file: UploadFile = File(...), label: Optional[str] = Form(None)):
    try:
        tmp_dir = Path(os.getenv("UPLOAD_TMP_DIR", str(Path(__file__).parent / "uploads")))
        tmp_dir.mkdir(parents=True, exist_ok=True)
        dest = tmp_dir / file.filename
        with dest.open("wb") as f:
            f.write(await file.read())
        count = _ingest_pdf(dest, source_label=label)
        return {"status": "ok", "chunks": count, "source": str(dest)}
    except Exception as e:
        return {"status": "error", "error": str(e)}


@app.get("/stats")
async def stats():
    try:
        results = collection.query(query_texts=["__stat__"], n_results=10)
        approx = len(results.get("ids", [[]])[0]) if results.get("ids") else 0
        return {"approx_samples": approx, "db_path": str(Path(DB_DIR).resolve())}
    except Exception as e:
        return {"status": "error", "error": str(e)}
