import { redirect } from "next/navigation";
import { Metadata } from "next/types";

import SignInComponent from "@/components/auth/signin";
import { createClient } from "@/utils/supabase/server";
import { constructMetadata } from "@/lib/utils";
import { getUser } from "@/utils/supabase/queries";

export const metadata: Metadata = constructMetadata({
  title: "Sign In",
  description: "Sign in to your account",
  canonical: "/signin",
});

export default async function SignUIn() {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (user) {
    redirect("/");
  }

  return <SignInComponent />;
}
