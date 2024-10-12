import { Frequency, FrequencyEnum, Tier, TiersEnum } from "@/types/pricing";

export const CONTACT_EMAIL = "help@flyfast.io";
export const TEST_MODE_ENABLED = ["true", "True", "TRUE"].includes(
  process.env.NEXT_PUBLIC_TEST_MODE_ENABLED ?? "",
);

const NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID = "price_1PZ9X608N4O93LU5yqMbGDtu";
const NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID_TEST =
  "price_1PZUT208N4O93LU5jItKoEYu";
const NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID = "price_1PoZiZ08N4O93LU5kCrdrXvI";
const NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_TEST =
  "price_1Ppa9408N4O93LU5irNxLp5p";
const NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID = "price_1PpZUO08N4O93LU5FYFUyh43";
const NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID_TEST =
  "price_1PZUSi08N4O93LU5UVdlkfp2";

export const STRIPE_PRICE_IDS = {
  WAITLIST: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_WAITLIST_PRICE_ID,
  MONTHLY: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  ANNUAL: TEST_MODE_ENABLED
    ? NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID_TEST
    : NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
};

export const frequencies: Array<Frequency> = [
  { key: FrequencyEnum.Monthly, label: "Pay Monthly", priceSuffix: "month" },
];

export const tiers: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Free",
    price: "Free",
    href: "/",
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
    href: "/",
    mostPopular: true,
    price: {
      monthly: "$72",
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
    href: "/",
    featured: true,
    mostPopular: false,
    description: "For large teams that have more than 10 members.",
    price: {
      monthly: "$90",
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

export const siteConfig = {
  name: "Flights Alert",
  description: "Get notified when the price of your flight drops.",
  navItems: [
    {
      label: "Slap Me",
      href: "/",
    },
    {
      label: "Motivation",
      href: "/",
    },
    {
      label: "Review",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Flights",
      href: "/flights",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
  },
};
