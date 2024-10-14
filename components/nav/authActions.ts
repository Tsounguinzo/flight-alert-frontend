"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function handleSignOut() {
  const supabase = createClient();

  await supabase.auth.signOut();
  redirect("/");
}
