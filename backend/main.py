from fastapi import FastAPI, Request, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import os
from pathlib import Path
from dotenv import load_dotenv
import uuid
from datetime import datetime
import json
import re

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

if not GROQ_API_KEY:
    # Fail fast with a clear error to the frontend
    raise RuntimeError("GROQ_API_KEY not found in environment. Add it to your .env")

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
    senderAddress: Optional[str] = ""   # NEW
    recipientAddress: Optional[str] = ""  # NEW
    jurisdiction: Optional[str] = ""
    deadline: Optional[str] = ""
    urgency: Optional[str] = ""
    k: Optional[int] = 6
    max_tokens: Optional[int] = 4096
    clarifications: Optional[Dict[str, str]] = None  # NEW: user-provided answers to follow-up questions


class ClarifyRequest(BaseModel):
    prompt: str
    senderName: Optional[str] = ""
    recipientName: Optional[str] = ""
    senderAddress: Optional[str] = ""    # NEW
    recipientAddress: Optional[str] = "" # NEW
    jurisdiction: Optional[str] = ""
    deadline: Optional[str] = ""
    urgency: Optional[str] = ""
    k: Optional[int] = 4


class DynamicRequest(BaseModel):
    prompt: str
    senderName: Optional[str] = ""
    recipientName: Optional[str] = ""
    senderAddress: Optional[str] = ""     # NEW
    recipientAddress: Optional[str] = ""  # NEW
    jurisdiction: Optional[str] = ""
    deadline: Optional[str] = ""
    urgency: Optional[str] = ""
    answers: Optional[Dict[str, str]] = None  # accumulated user answers from prior turns
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
        # If we cannot query, assume empty so we attempt auto-ingest
        return False


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


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "model": GROQ_MODEL,
        "db_path": str(Path(DB_DIR).resolve()),
        "store_ready": _ensure_non_empty_store(),
    }


def _format_context_for_prompt(hits):
    parts = []
    for i, h in enumerate(hits, 1):
        src = h.get("metadata", {}).get("source_label") or h.get("metadata", {}).get("source") or "unknown"
        parts.append(f"[{i}] Source: {src}\n{h['document']}")
    return "\n\n".join(parts)


def _retrieve(prompt: str, k: int = 4):
    try:
        results = collection.query(query_texts=[prompt], n_results=k)
    except Exception:
        return []
    docs = results.get("documents") or [[]]
    ids = results.get("ids") or [[]]
    metas = results.get("metadatas") or [[]]
    hits = []
    for i in range(len(docs[0])):
        hits.append({"document": docs[0][i], "id": ids[0][i] if ids and ids[0] else None, "metadata": metas[0][i] if metas and metas[0] else {}})
    return hits


def _detect_placeholders_or_gaps(text: str) -> bool:
    # Simple gap detection from placeholders and common missing items
    patterns = [
        r"\[[^\]]+\]",  # [placeholder]
        r"Invoice\s*#\s*\[", r"\b[0-9]{4}-[0-9]{2}-[0-9]{2}\b",  # date formats OK, but still run clarifier optionally
        r"\bamount\b.*\b\[", r"\bdue date\b.*\b\[", r"\bcontract\b.*\bdate\b.*\b\[",
        r"\bproperty address\b.*\b\[", r"\btrademark\b.*\b\[", r"\bregistration\b.*\b\[",
        r"\bplatform\b.*\b\[", r"\bURL\b.*\b\[", r"\bjurisdiction\b.*\b\[",
    ]
    for p in patterns:
        if re.search(p, text, flags=re.IGNORECASE):
            return True
    # Also short or very generic prompts
    return len(text.strip()) < 80


def _sanitize_questions(raw_questions: Any) -> List[Dict[str, Any]]:
    out: List[Dict[str, Any]] = []
    if not isinstance(raw_questions, list):
        return out
    for i, q in enumerate(raw_questions, 1):
        if not isinstance(q, dict):
            continue
        qid = str(q.get("id") or q.get("label") or f"q_{i}")[:64]
        out.append({
            "id": qid,
            "label": str(q.get("label") or "").strip()[:300] or f"Additional detail {i}",
            "placeholder": str(q.get("placeholder") or "").strip()[:300],
            "required": bool(q.get("required", True)),
            "type": q.get("type") if q.get("type") in ("text", "date", "number", "url") else "text",
        })
    return out[:10]


def _llm_clarify(prompt: str, hits: List[dict], user_details: Dict[str, str], k: int = 4) -> List[Dict[str, Any]]:
    """
    Ask the LLM to return JSON-only list of clarification questions required to draft a formal legal notice.
    Each item: { "id": "string", "label": "string", "placeholder": "string", "required": true, "type": "text"|"date"|"number"|"url" }
    """
    context_block = _format_context_for_prompt(hits) if hits else ""
    today = datetime.now().strftime("%d %B %Y")
    clarify_prompt = f"""You are an Indian legal assistant preparing to draft a formal legal notice. Given the user's matter description and limited details, identify any essential factual details that are typically required BEFORE drafting.

Return ONLY valid JSON with this schema:
{{
  "questions": [
    {{"id": "string", "label": "string", "placeholder": "string", "required": true, "type": "text|date|number|url"}}
  ]
}}

Guidance:
- Ask only for objective facts, not personal names (they are collected separately).
- Tailor questions to the matter type (invoice: invoice number, amount, due date; lease: property address, lease start date, violations; copyright/trademark: links/locations of infringement, dates; contract: contract date/title/breach specifics; harassment: incident dates/locations, communication channels).
- Prefer 3–8 concise questions. Mark truly critical ones as required.

=== CONTEXT (if any) ===
{context_block or "No retrieved legal context."}

=== USER DETAILS ===
Sender Name: {user_details.get('senderName') or '<Provided later>'}
Recipient Name: {user_details.get('recipientName') or '<Provided later>'}
Jurisdiction: {user_details.get('jurisdiction') or '<Provided later>'}
Deadline: {user_details.get('deadline') or '30 days from receipt'}
Urgency: {user_details.get('urgency') or 'Standard'}
Current Date: {today}

=== MATTER DESCRIPTION ===
{prompt}
"""

    try:
        resp = groq_client.chat.completions.create(
            messages=[{"role": "system", "content": "Return JSON only. No commentary."},
                      {"role": "user", "content": clarify_prompt}],
            model=GROQ_MODEL,
            max_tokens=700,
            temperature=0.1,
            top_p=0.9,
        )
        text = (resp.choices[0].message.content or "").strip()
        # Extract JSON if model wrapped it
        match = re.search(r"\{.*\}\s*$", text, flags=re.S)
        json_text = match.group(0) if match else text
        data = json.loads(json_text)
        questions = data.get("questions") or []
        # Sanitize
        out = []
        for q in questions:
            if not isinstance(q, dict): continue
            qid = str(q.get("id") or q.get("label") or f"q_{len(out)+1}")[:64]
            out.append({
                "id": qid,
                "label": str(q.get("label") or "").strip()[:300] or "Additional detail",
                "placeholder": str(q.get("placeholder") or "").strip()[:300],
                "required": bool(q.get("required", True)),
                "type": q.get("type") if q.get("type") in ("text", "date", "number", "url") else "text",
            })
        return out[:10]
    except Exception:
        # Fallback minimal heuristics
        qs: List[Dict[str, Any]] = []
        p = prompt.lower()
        def add(id, label, placeholder="", t="text", required=True):
            qs.append({"id": id, "label": label, "placeholder": placeholder, "type": t, "required": required})
        if any(x in p for x in ["invoice", "payment", "overdue"]):
            add("invoice_number", "Invoice Number", "e.g., INV-2024-001")
            add("amount_due", "Total Amount Due (currency + amount)", "e.g., INR 45,000", "text")
            add("original_due", "Original Due Date", "YYYY-MM-DD", "date")
            add("goods_services", "Goods/Services Description", "e.g., Web design for July")
        elif any(x in p for x in ["lease", "tenant", "rent", "evict"]):
            add("property_address", "Property Address", "e.g., Flat 301, ...")
            add("violation_detail", "Specific Lease Violation(s)", "e.g., late rent for May, unauthorized pet")
            add("cure_deadline", "Cure Period (days)", "e.g., 7", "number", False)
        elif any(x in p for x in ["copyright", "dmca"]):
            add("work_description", "Describe the Copyrighted Work", "e.g., 10 product photos, SKU set A")
            add("infringement_location", "Where is it Infringing (URL/platform/store)?", "URL or platform", "url")
            add("first_noticed", "When did you first notice the infringement?", "YYYY-MM-DD", "date", False)
        elif "trademark" in p:
            add("mark", "Trademark Name or Mark", "e.g., LEGALMIND")
            add("registration_no", "Registration Number (if any)", "e.g., 1234567", "text", False)
            add("infringement_location", "Where is it used (URL/platform/marketplace)?", "URL or location", "url")
        elif any(x in p for x in ["contract", "breach"]):
            add("contract_title", "Contract Title/Description", "e.g., Services Agreement")
            add("contract_date", "Contract Date", "YYYY-MM-DD", "date")
            add("breach_details", "Breach Details", "e.g., failed delivery by 2024-08-10")
        elif any(x in p for x in ["harass", "stalk", "threat"]):
            add("incident_dates", "Incident Dates/Range", "e.g., 2025-08-01 to 2025-08-10", "text")
            add("channels", "Communication Channels Used", "e.g., phone calls, WhatsApp")
            add("location", "Location(s) of Incidents", "e.g., outside residence", "text", False)

        return qs[:8]


@app.post("/clarify")
async def clarify(body: ClarifyRequest):
    # If the prompt looks complete, return no questions
    hits = _retrieve(body.prompt, k=int(body.k or 4))
    needs = _detect_placeholders_or_gaps(body.prompt)
    questions = _llm_clarify(
        body.prompt,
        hits,
        {
            "senderName": body.senderName or "",
            "recipientName": body.recipientName or "",
            "jurisdiction": body.jurisdiction or "",
            "deadline": body.deadline or "",
            "urgency": body.urgency or "",
        },
        k=int(body.k or 4),
    ) if needs else []
    return {"needed": len(questions) > 0, "questions": questions}


@app.post("/generate-notice")
async def generate_notice(data: NoticeRequest):
    # Input validation
    if not data.prompt or len(data.prompt.strip()) < 20:
        raise HTTPException(status_code=400, detail="Prompt is too short. Provide more details.")

    # Retrieve context
    k = max(1, min(int(data.k or 6), 10))
    hits = _retrieve(data.prompt, k=k)

    # If user didn't provide clarifications and we detect gaps, return questions (interactive flow)
    if not data.clarifications or len(data.clarifications) == 0:
        if _detect_placeholders_or_gaps(data.prompt):
            qs = _llm_clarify(
                data.prompt,
                hits,
                {
                    "senderName": data.senderName or "",
                    "recipientName": data.recipientName or "",
                    "jurisdiction": data.jurisdiction or "",
                    "deadline": data.deadline or "",
                    "urgency": data.urgency or "",
                },
                k=k,
            )
            if qs:
                # 422 with a structured payload the frontend can handle
                raise HTTPException(
                    status_code=422,
                    detail={"code": "NEED_CLARIFICATION", "questions": qs}
                )

    # Build prompt
    context_block = _format_context_for_prompt(hits) if hits else ""
    today = datetime.now().strftime("%d %B %Y")
    sender = (data.senderName or "").strip()
    recipient = (data.recipientName or "").strip()
    jurisdiction = (data.jurisdiction or "").strip()
    deadline = (data.deadline or "").strip()
    urgency = (data.urgency or "").strip()

    clar_block = ""
    if data.clarifications:
        lines = []
        for key, val in data.clarifications.items():
            if str(val).strip():
                lines.append(f"- {key}: {str(val).strip()}")
        if lines:
            clar_block = "ADDITIONAL FACTS PROVIDED BY USER:\n" + "\n".join(lines) + "\n"

    prompt = f"""You are a meticulous Indian legal assistant. Using ONLY the context below, draft a formal, professional legal notice. If context is insufficient for any claim, state assumptions explicitly.

=== CONTEXT START ===
{context_block if context_block.strip() else 'No relevant context was retrieved.'}
=== CONTEXT END ===

=== USER PROVIDED DETAILS (USE EXACTLY AS GIVEN WHERE APPLICABLE) ===
Sender Name: {sender or '<Your Name>'}
Recipient Name: {recipient or '<Recipient Name>'}
Jurisdiction: {jurisdiction or '<Jurisdiction>'}
Response Deadline: {deadline or '30 days from receipt'}
Urgency: {urgency or 'Standard'}
Current Date: {today}

{clar_block}QUERY (Matter Description):
{data.prompt}

REQUIREMENTS:
- Write in clear, formal legal language suitable for India.
- Use the names above verbatim in the From and To sections.
- If Jurisdiction is provided, include a line mentioning the applicable jurisdiction.
- In Legal Basis, prefer precise statutory citations from context (Act name and section numbers), quote short relevant fragments when helpful, and avoid fabricating citations.
- In Response Timeline, reflect the provided Response Deadline and optionally reference the Urgency.
- Output in the following sections with headings:
  1. Date
  2. From
  3. To
  4. Subject
  5. Background / Facts
  6. Legal Basis
  7. Demands / Relief Sought
  8. Response Timeline
  9. Consequences of Non-Compliance
  10. Disclaimer
  11. Signature
  12. Jurisdiction

CONSTRAINTS:
- Avoid inventing sections not supported by context.
- If statutes are unclear in the context, say: 'Based on available context, specific statutory citation is not determinable.'
- Do not add extra commentary outside the sections.

FORMAT STRICTLY LIKE THIS (no extra commentary outside sections):

Date: {today}

From:
{sender or '<Your Name / Firm>'}
<Address>
<Contact>

To:
{recipient or '<Recipient Name / Entity>'}
<Address>

Subject: <Concise subject>

Background / Facts:
<...>

Legal Basis:
- Cite provisions as: Act Name — Section X ("short quote if applicable")
- Explain why each applies.

Demands / Relief Sought:
<...>

Response Timeline:
{deadline or '30 days from receipt'} ({urgency or 'Standard'})

Consequences of Non-Compliance:
<...>

Disclaimer:
<...>

Signature:
{sender or '<Your Name>'}
<Designation>

Jurisdiction:
{jurisdiction or '<Jurisdiction>'}
"""
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a meticulous Indian legal assistant. Draft professional legal notices based on provided context and queries."},
                {"role": "user", "content": prompt}
            ],
            model=GROQ_MODEL,
            max_tokens=int(data.max_tokens or 2048),
            temperature=0.1,
            top_p=0.9,
        )
        notice_text = (chat_completion.choices[0].message.content or "").strip()
        if not notice_text:
            raise RuntimeError("Empty response from model.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {e}")

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


def _llm_decide_or_draft(prompt: str, hits: List[dict], user_details: Dict[str, str], answers: Optional[Dict[str, str]] = None, max_tokens: int = 2048) -> Dict[str, Any]:
    """
    One-shot controller: the model decides whether more info is required (stage='ask') or can draft now (stage='draft').
    Returns a dict like:
      { "stage": "ask", "questions": [...], "missing_fields": [...], "rationale": "..." }
    or
      { "stage": "draft", "notice": "text", "used_answers": {...} }
    """
    context_block = _format_context_for_prompt(hits) if hits else "No retrieved legal context."
    today = datetime.now().strftime("%d %B %Y")
    answers_block = ""
    if answers:
        used = [f"- {k}: {str(v).strip()}" for k, v in answers.items() if str(v).strip()]
        if used:
            answers_block = "Known factual answers provided so far:\n" + "\n".join(used) + "\n"

    controller_prompt = f"""ROLE: You are a meticulous Indian legal assistant drafting a formal legal notice.
Task: Decide whether the information provided is sufficient to draft a complete, professional notice. If anything essential is missing, ask specific follow-up questions. Otherwise, produce the final draft.

STRICT OUTPUT: Return ONLY valid JSON matching one of these shapes:

1) If more info is needed:
{{
  "stage": "ask",
  "rationale": "short reason why more info is needed",
  "missing_fields": ["short_field_slugs"],
  "questions": [
    {{
      "id": "string",
      "label": "clear user-facing question",
      "placeholder": "helpful example",
      "required": true,
      "type": "text|date|number|url"
    }}
  ]
}}

2) If information is sufficient to draft:
{{
  "stage": "draft",
  "notice": "the full notice text using the exact format below",
  "used_answers": {{}}
}}

Guidance for 'ask' stage:
- Ask only for objective facts (no personal names—they're provided separately).
- Tailor to the matter (invoice, lease, IP, contract, harassment).
- Prefer 3–8 concise questions. Mark truly critical ones as required.

Guidance for 'draft' stage:
- Do not fabricate statutory citations; only use what appears in the retrieved context. If unclear, write: "Based on available context, specific statutory citation is not determinable."
- Use this section format exactly (no extra commentary outside sections):

Date: {today}

From:
{user_details.get('senderName') or '<Your Name / Firm>'}
<Address>
<Contact>

To:
{user_details.get('recipientName') or '<Recipient Name / Entity>'}
<Address>

Subject: <Concise subject>

Background / Facts:
<...>

Legal Basis:
- Cite provisions as: Act Name — Section X ("short quote if applicable")
- Explain why each applies.

Demands / Relief Sought:
<...>

Response Timeline:
{user_details.get('deadline') or '30 days from receipt'} ({user_details.get('urgency') or 'Standard'})

Consequences of Non-Compliance:
<...>

Disclaimer:
<...>

Signature:
{user_details.get('senderName') or '<Your Name>'}
<Designation>

Jurisdiction:
{user_details.get('jurisdiction') or '<Jurisdiction>'}

=== RETRIEVED CONTEXT ===
{context_block}

=== FIXED USER DETAILS ===
Sender Name: {user_details.get('senderName') or '<Provided later>'}
Recipient Name: {user_details.get('recipientName') or '<Provided later>'}
Jurisdiction: {user_details.get('jurisdiction') or '<Provided later>'}
Response Deadline: {user_details.get('deadline') or '30 days from receipt'}
Urgency: {user_details.get('urgency') or 'Standard'}
Current Date: {today}

{answers_block}=== MATTER DESCRIPTION ===
{prompt}
"""

    try:
        resp = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Return JSON only. No commentary. Ensure valid JSON."},
                {"role": "user", "content": controller_prompt},
            ],
            model=GROQ_MODEL,
            max_tokens=max_tokens,
            temperature=0.1,
            top_p=0.9,
        )
        raw = (resp.choices[0].message.content or "").strip()
        # Try to extract JSON if the model wrapped it
        m = re.search(r"\{[\s\S]*\}\s*$", raw)
        json_text = m.group(0) if m else raw
        data = json.loads(json_text)

        stage = str(data.get("stage") or "").strip().lower()
        if stage == "ask":
            data["questions"] = _sanitize_questions(data.get("questions"))
            data["missing_fields"] = [str(x)[:64] for x in (data.get("missing_fields") or [])][:12]
            data["rationale"] = str(data.get("rationale") or "")[:500]
            return {"stage": "ask", **data}
        elif stage == "draft":
            notice_text = str(data.get("notice") or "").strip()
            if not notice_text:
                raise ValueError("Empty 'notice' in draft stage.")
            used_answers = data.get("used_answers") or {}
            return {"stage": "draft", "notice": notice_text, "used_answers": used_answers}
        else:
            # Fallback to ask if stage is unclear
            return {"stage": "ask", "rationale": "Stage not determinable; asking for essential facts.", "questions": _sanitize_questions([]), "missing_fields": []}
    except Exception as e:
        # As a safe fallback, trigger a clarification round with heuristics/clarifier
        qs = _llm_clarify(prompt, hits, user_details, k=4)
        return {
            "stage": "ask",
            "rationale": f"Parser/LLM error or insufficient info: {str(e)[:120]}",
            "missing_fields": [],
            "questions": _sanitize_questions(qs),
        }


@app.post("/dynamic-draft")
async def dynamic_draft(data: DynamicRequest):
    """
    Multi-turn endpoint.
    - Call with prompt + base details. If info is missing, returns 422 NEED_INFO with {questions, missing_fields, rationale}.
    - Call again with 'answers' merged from user input; when sufficient, returns 200 with {notice, context, metadata}.
    """
    if not data.prompt or len(data.prompt.strip()) < 20:
        raise HTTPException(status_code=400, detail="Prompt is too short. Provide more details.")

    k = max(1, min(int(data.k or 6), 10))
    hits = _retrieve(data.prompt, k=k)

    user_details = {
        "senderName": data.senderName or "",
        "recipientName": data.recipientName or "",
        "senderAddress": data.senderAddress or "",          # NEW
        "recipientAddress": data.recipientAddress or "",    # NEW
        "jurisdiction": data.jurisdiction or "",
        "deadline": data.deadline or "",
        "urgency": data.urgency or "",
    }

    result = _llm_decide_or_draft(
        prompt=data.prompt,
        hits=hits,
        user_details=user_details,
        answers=data.answers or {},
        max_tokens=int(data.max_tokens or 2048),
    )

    if result.get("stage") == "ask":
        # Return questions for the client to display and collect answers, then call again with answers included.
        raise HTTPException(
            status_code=422,
            detail={
                "code": "NEED_INFO",
                "rationale": result.get("rationale") or "",
                "missing_fields": result.get("missing_fields") or [],
                "questions": result.get("questions") or [],
            },
        )

    # stage == "draft"
    notice_text = result.get("notice") or ""
    if not notice_text.strip():
        raise HTTPException(status_code=500, detail="Draft stage returned empty notice.")

    today = datetime.now().strftime("%d %B %Y")
    return {
        "notice": notice_text,
        "context": hits,
        "metadata": {
            "senderName": data.senderName or "",
            "recipientName": data.recipientName or "",
            "senderAddress": data.senderAddress or "",          # NEW
            "recipientAddress": data.recipientAddress or "",    # NEW
            "jurisdiction": data.jurisdiction or "",
            "deadline": data.deadline or "",
            "urgency": data.urgency or "",
            "date": today,
            "used_answers": result.get("used_answers") or {},
        },
    }
