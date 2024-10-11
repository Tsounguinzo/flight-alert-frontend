import { Metadata } from "next/types";

import { constructMetadata } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import PricingSuccess from "@/components/pricing-success";

export const metadata: Metadata = constructMetadata({
  title: "Pricing success",
  description: "The pricing success page for FlyFast.",
  canonical: "/pricing/success",
});

export default async function Pricing() {
  const supabase = createClient();

  return (
    <>
      <PricingSuccess />
    </>
  );
}
