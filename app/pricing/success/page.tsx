import { Metadata } from "next/types";

import { constructMetadata } from "@/lib/utils";
import PricingSuccess from "@/components/pricing-success";

export const metadata: Metadata = constructMetadata({
  title: "Pricing success",
  description: "The pricing success page for FlyFast.",
  canonical: "/pricing/success",
});

export default async function Pricing() {
  return <PricingSuccess />;
}
