import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MetadataProps = {
  title?: string;
  description?: string;
  canonical: string;
  ogImage?: string;
};

const defaultMetadata = {
  title: "FlyFast - Flight Search Engine for Cheap Flights",
  description:
    "FlyFast is a flight search engine that helps you find cheap flights. We compare flight prices from hundreds of airlines and travel agencies to help you find the best deals.",
};

export const normalizeDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const constructMetadata = ({
  title,
  description = defaultMetadata.description,
  canonical = "/",
  ogImage = "/images/og-image.png",
}: MetadataProps) => {
  return {
    metadataBase: new URL("https://flyfast.io/"),
    title: title ? `${title} - FlyFast` : defaultMetadata.title,
    description,
    keywords: [
      "cheap flights",
      "flight search engine",
      "flight deals",
      "flight comparison",
      "travel",
      "airlines",
    ],
    alternates: {
      canonical,
    },
    authors: [
      {
        name: "Beaudelaire Tsoungui Nzodoumkouo",
        url: "https://github.com/",
      },
      {
        name: "Ravi Singh Deep",
        url: "https://github.com/",
      },
      {
        name: "Mohamad Al Adraa",
        url: "https://github.com/",
      },
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "OG Image",
        },
      ],
    },

    // --- will add this once we get the logo ---
    // icons: {
    //   icon: "/icon.png",
    //   shortcut: "/icon.png",
    //   apple: "/icon.png",
    // },

    // --- need a twitter handle for this ---
    // twitter: {
    //   title,
    //   description,
    //   creator: "@flyfast",
    //   site: "flyfast.io",
    //   card: "summary_large_image",
    // },
  };
};

export function capitalizeInital(input: unknown): string | undefined {
  if (typeof input !== "string") {
    return "";
  }
  if (input.length === 0) {
    return "";
  } else if (input.length === 1) {
    return input.toUpperCase();
  }

  return input.charAt(0).toUpperCase() + input.slice(1);
}
