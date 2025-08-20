"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export interface LegalNoticeData {
  notice_type: string
  title: string
  content: string
  scenario_details: any
}

export async function createLegalNotice(data: LegalNoticeData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: notice, error } = await supabase
    .from("legal_notices")
    .insert([
      {
        user_id: user.id,
        ...data,
      },
    ])
    .select()
    .single()

  if (error) {
    throw new Error("Failed to create legal notice")
  }

  return notice
}

export async function getUserLegalNotices() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: notices, error } = await supabase
    .from("legal_notices")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch legal notices")
  }

  return notices
}
