import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

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
      <head />
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
