import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Providers } from "./providers";

import { Header } from "@/components/nav/header";
import Footer from "@/components/footer";
import { siteConfig } from "@/utils/constants";
import { Toaster as CustomToaster } from "@/components/Toasts/toaster";

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
    <html suppressHydrationWarning className="bg-white" lang="en">
      <head>
        <link
          href="/favicon-48x48.png"
          rel="icon"
          sizes="48x48"
          type="image/png"
        />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
      </head>
      <body className="min-h-screen font-sans antialiased bg-white vsc-initialized">
        <Providers themeProps={{ attribute: "class", forcedTheme: "white" }}>
          <PostHogPageView />
          <div className="relative flex flex-col h-screen bg-white">
            <Header />
            <main className="w-full py-20 px-6 flex-grow">{children}</main>
            <Footer />
            <Suspense>
              <CustomToaster />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
