export const CONTACT_EMAIL = "help@flyfast.io";

export const TEST_MODE_ENABLED = ["true", "True", "TRUE"].includes(
  process.env.NEXT_PUBLIC_TEST_MODE_ENABLED ?? ""
);

export const siteConfig = {
  name: "Flights Alert",
  description: "Get notified when the price of your flight drops.",
  navItems: [
    {
      label: "How it works",
      href: "/",
    },
    {
      label: "Deals",
      href: "/",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "About us",
      href: "/",
    },
    {
      label: "Contact",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "How it works",
      href: "/",
    },
    {
      label: "Deals",
      href: "/",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "About us",
      href: "/",
    },
    {
      label: "Contact",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
  },
};
