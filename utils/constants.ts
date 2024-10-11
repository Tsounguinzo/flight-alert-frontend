import { Frequency, FrequencyEnum, Tier, TiersEnum } from "@/types/pricing";

export const CONTACT_EMAIL = "help@flyfast.io";
export const TEST_MODE_ENABLED = ["true", "True", "TRUE"].includes(
  process.env.NEXT_PUBLIC_TEST_MODE_ENABLED ?? "",
);

export const frequencies: Array<Frequency> = [
  { key: FrequencyEnum.Monthly, label: "Pay Monthly", priceSuffix: "month" },
  {
    key: FrequencyEnum.Daily,
    label: "Pay Daily",
    priceSuffix: "day",
  },
];

export const tiers: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Free",
    price: "Free",
    href: "#",
    featured: false,
    mostPopular: false,
    description: "For starters and hobbyists that want to try out.",
    features: [
      "5 free searches/day",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Continue with Free",
    buttonColor: "default",
    buttonVariant: "flat",
  },
  {
    key: TiersEnum.Pro,
    title: "Pro",
    description: "For small teams that have less that 10 members.",
    href: "#",
    mostPopular: true,
    price: {
      mothly: "$72",
      daily: "$24",
    },
    featured: false,
    features: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Team,
    title: "Team",
    href: "#",
    featured: true,
    mostPopular: false,
    description: "For large teams that have more than 10 members.",
    price: {
      mothly: "$90",
      daily: "$120",
    },
    priceSuffix: "per user",
    features: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];
