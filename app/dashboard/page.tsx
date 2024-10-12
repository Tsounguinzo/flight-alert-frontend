import { redirect } from "next/navigation";
import { Metadata } from "next/types";

import DashboardPage from "@/components/dashboard";
import { getUserAndSubscription } from "@/lib/data-fetching";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Dashboard",
  description: "Manage your account, billing, and team preferences.",
  canonical: "/dashboard",
});

export default async function Dashboard() {
  const {
    user,
    subscription,
    redirect: redirectTo,
  } = await getUserAndSubscription();

  if (redirectTo || !user) {
    return redirect(redirectTo ?? "/signin");
  }

  return <DashboardPage subscription={subscription} user={user} />;
}
