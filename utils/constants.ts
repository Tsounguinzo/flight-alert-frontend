export const CONTACT_EMAIL = "help@flyfast.io";

export const TEST_MODE_ENABLED = ["true", "True", "TRUE"].includes(
  process.env.NEXT_PUBLIC_TEST_MODE_ENABLED ?? "",
);

export const siteConfig = {
  name: "Flights Alert",
  description: "Get notified when the price of your flight drops.",
  navItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Flights",
      href: "/flights",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Flights",
      href: "/flights",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
  },
};
