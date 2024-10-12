"use client";
import { User } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Subscription } from "@/types/subscription";
import ProfileCard from "@/components/dashboard/profile-card";
import SubscriptionCard from "@/components/dashboard/subscription-card";
import FreeTrialCard from "@/components/dashboard/freetrial-card";

type DashboardPageProps = {
  subscription: Subscription | null;
  user: User;
};

export type UsageType = {
  percent_credit_used: number | null;
};

export default function DashboardPage({
  subscription,
  user,
}: DashboardPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState<UsageType>({
    percent_credit_used: null,
  });

  useEffect(() => {
    const handleCallbackForApp = async () => {
      // Handle callback
      const callback = searchParams?.get("callback");

      if (callback) {
        const decodedCallback = decodeURIComponent(callback);
        const callbackUrl = new URL(decodedCallback);
        const newSearchParams = new URLSearchParams(callbackUrl.search);

        callbackUrl.search = newSearchParams.toString();
        const openAppUrl = callbackUrl.toString();

        router.push(openAppUrl);

        const currentUrl = new URL(window.location.href);

        currentUrl.searchParams.delete("callback");
        window.history.replaceState({}, "", currentUrl.toString());
      }
    };

    const getUserRequestsUsage = async () => {
      try {
        const response = await fetch("/api/dashboard-usage", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          toast.error("Failed to fetch requests usage.");

          return;
        }
        const usage = await response.json();

        setUsage(usage);
      } catch (error) {
        toast.error(`Error fetching requests usage: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    handleCallbackForApp();
    getUserRequestsUsage();
  }, [router, searchParams]);

  return (
        <div className="p-4 text-foreground sm:p-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your account, billing, and preferences.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ProfileCard user={user} />
            {/* Below commented out until we implement Free Trial */}
            {subscription ? (
              <SubscriptionCard
                loading={loading}
                subscription={subscription}
                usage={usage}
                user={user}
              />
            ) : (
              <FreeTrialCard loading={loading} usage={usage} />
            )}
          </div>
        </div>
  );
}
