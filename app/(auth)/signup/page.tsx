import { redirect } from "next/navigation";
import { Metadata } from "next/types";

import { createClient } from "@/utils/supabase/server";
import SignUPComponent from "@/components/auth/signup";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Sign Up",
  description: "Sign up for an account",
  canonical: "/signup",
});

export default async function SignUp() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }

  return <SignUPComponent />;
}
