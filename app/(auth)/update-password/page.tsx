import { Metadata } from "next";
import { redirect } from "next/navigation";

import UpdatePasswordForm from "@/components/auth/update-password-form";
import { constructMetadata } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/queries";

export const metadata: Metadata = constructMetadata({
  title: "Update password",
  description: "Update your account password",
  canonical: "/update-password",
});

export default async function UpdatePasswordPage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (!user) {
    redirect("/signin");
  }

  // Redirect to the home page if the user is not using email provider
  if (user.app_metadata.provider !== "email") {
    redirect("/");
  }

  return <UpdatePasswordForm />;
}
