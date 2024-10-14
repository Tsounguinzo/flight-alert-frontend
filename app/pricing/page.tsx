import { Metadata } from "next/types";
import React from "react";

import PricingPage from "@/components/pricing";
import { constructMetadata } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";

export const metadata: Metadata = constructMetadata({
  title: "Pricing",
  description: "The pricing and download page for FlyFast.",
  canonical: "/pricing",
});

export default async function Pricing() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  // @ts-ignore
  return (
    <PricingPage products={products} subscription={subscription} user={user} />
  );
}
