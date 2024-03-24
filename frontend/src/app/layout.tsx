import { env } from "@/env.mjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Story Verse</title>
        <meta property="of:version" content="vNext" />
        <meta property="fc:frame" content="vNext" />
        <meta property="of:accepts:farcaster" content="vNext" />
        <meta property="of:accepts:xmtp" content="2024-02-01" />
        <meta
          property="of:post_url"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames`}
        />
        <meta
          property="fc:frame:post_url"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames`}
        />
        <meta property="of:image:aspect_ratio" content="1:1" />
        <meta property="fc:frame:image:aspect_ratio" content="1:1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
