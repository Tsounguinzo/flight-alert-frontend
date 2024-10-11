import { Metadata } from "next";
import { redirect } from "next/navigation";

import UpdatePasswordForm from "@/components/auth/update-password-form";
import { constructMetadata } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = constructMetadata({
  title: "Update password",
  description: "Update your account password",
  canonical: "/update-password",
});

export default async function UpdatePasswordPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }
  // Redirect to the home page if the user is not using email provider
  if (data.user.app_metadata.provider !== "email") {
    redirect("/");
  }

  return <UpdatePasswordForm />;
}
