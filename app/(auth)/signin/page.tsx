import { redirect } from "next/navigation";
import { Metadata } from "next/types";

import SignInComponent from "@/components/auth/signin";
import { createClient } from "@/utils/supabase/server";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Sign In",
  description: "Sign in to your account",
  canonical: "/signin",
});

export default async function SignUIn() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }

  return <SignInComponent />;
}
