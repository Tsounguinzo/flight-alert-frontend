import { Metadata } from "next/types";

import { constructMetadata } from "@/lib/utils";
import FlightsComponent from "@/components/flights";

export const metadata: Metadata = constructMetadata({
  title: "Flights",
  description: "Search for flights",
  canonical: "/flights",
});

export default async function Flights() {
  return <FlightsComponent />;
}
