import { redirect } from "next/navigation";
import { Metadata } from "next/types";

import ResetPasswordComponent from "@/components/auth/reset-password";
import { createClient } from "@/utils/supabase/server";
import { constructMetadata } from "@/lib/utils";
import { getUser } from "@/utils/supabase/queries";

export const metadata: Metadata = constructMetadata({
  title: "Reset Password",
  description: "Reset your password",
  canonical: "/reset-password",
});

export default async function ResetPassword() {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (user) {
    redirect("/");
  }

  return <ResetPasswordComponent />;
}
