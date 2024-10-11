import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";

import { Providers } from "./providers";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import {siteConfig} from "@/utils/constants";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Providers themeProps={{ attribute: "class", forcedTheme: "white" }}>
          <PostHogPageView />
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl py-20 px-6 flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster richColors position="bottom-right" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
