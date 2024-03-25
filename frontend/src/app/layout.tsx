import { env } from "@/env.mjs";
import { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const typeWriter = localFont({
  src: "../assets/SpecialElite-Regular.ttf",
  display: "swap",
});

const PAGE_TITLE = "Story Verse";
const PAGE_DESCRIPTION =
  "Welcome to Story Verse, a place to create your own stories and share them with the world.";

export const metadata: Metadata = {
  title: {
    template: `${PAGE_TITLE} | %s`,
    default: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  other: {
    "of:version": "vNext",
    "fc:frame": "vNext",
    "of:accepts:farcaster": "vNext",
    "of:accepts:xmtp": "2024-02-01",
    "of:post_url": `${env.NEXT_PUBLIC_BFF_API_URL}/frames`,
    "fc:frame:post_url": `${env.NEXT_PUBLIC_BFF_API_URL}/frames`,
    "of:image:aspect_ratio": "1:1",
    "fc:frame:image:aspect_ratio": "1:1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-full h-screen min-h-screen ${typeWriter.className}`}>
        {children}
      </body>
    </html>
  );
}
