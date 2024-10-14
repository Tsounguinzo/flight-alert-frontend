import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(
          `${requestUrl.origin}/signin`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again.",
        ),
      );
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/dashboard`,
      "Success!",
      "You are now signed in.",
    ),
  );
}
