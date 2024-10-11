import { redirect } from "next/navigation";
import { Metadata } from "next/types";

import ResetPasswordComponent from "@/components/auth/reset-password";
import { createClient } from "@/utils/supabase/server";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Reset Password",
  description: "Reset your password",
  canonical: "/reset-password",
});

export default async function ResetPassword() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }

  return <ResetPasswordComponent />;
}
