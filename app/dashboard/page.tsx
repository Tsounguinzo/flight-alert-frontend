import { redirect } from "next/navigation";
import { Metadata } from "next/types";

import DashboardPage from "@/components/dashboard";
import { constructMetadata } from "@/lib/utils";
import { getSubscription, getUser } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = constructMetadata({
  title: "Dashboard",
  description: "Manage your account, billing, and team preferences.",
  canonical: "/dashboard",
});

export default async function Dashboard() {
  const supabase = createClient();
  const [user, subscription] = await Promise.all([
    getUser(supabase),
    getSubscription(supabase),
  ]);

  if (!user) {
    return redirect("/signin");
  }

  return <DashboardPage subscription={subscription} user={user} />;
}
