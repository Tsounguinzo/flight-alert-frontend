import { redirect } from "next/navigation";

import VerificationComponent from "@/components/auth/verification";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/queries";

export default async function Verification() {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (user) {
    redirect("/");
  }

  return <VerificationComponent />;
}
