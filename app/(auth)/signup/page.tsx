import { redirect } from "next/navigation";
import { Metadata } from "next/types";

import { createClient } from "@/utils/supabase/server";
import SignUPComponent from "@/components/auth/signup";
import { constructMetadata } from "@/lib/utils";
import { getUser } from "@/utils/supabase/queries";

export const metadata: Metadata = constructMetadata({
  title: "Sign Up",
  description: "Sign up for an account",
  canonical: "/signup",
});

export default async function SignUp() {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (user) {
    redirect("/");
  }

  return <SignUPComponent />;
}
