"use client";

import { type Provider } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { redirectToPath } from "./server";

import { createClient } from "@/utils/supabase/client";
import { getURL } from "@/utils/helpers";

export async function handleRequest(
  formData: FormData,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null,
): Promise<boolean | void> {
  const redirectUrl: string = await requestFunc(formData);

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl);
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl);
  }
}

export async function signInWithOAuth(formData: FormData) {
  const provider = String(formData.get("provider")).trim() as Provider;

  // Create client-side supabase client and call signInWithOAuth
  const supabase = createClient();
  const redirectURL = getURL("/auth/callback");

  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL,
    },
  });
}
