import { cn } from "@/common/lib/utils";
import { env } from "@/env.mjs";
import { Metadata } from "next";
import { CTA, TypeWriterSubTitle, TypeWriterTitle } from "./_components";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${env.NEXT_PUBLIC_BFF_API_URL}/og`,
        alt: "Story Verse",
      },
    ],
  },
  other: {
    "of:image": `${env.NEXT_PUBLIC_BFF_API_URL}/og`,
    "fc:frame:image": `${env.NEXT_PUBLIC_BFF_API_URL}/og`,
    "of:image:alt": "Genesis Verse",
    "og:image": `${env.NEXT_PUBLIC_BFF_API_URL}/og`,
    "of:post_url": `${env.NEXT_PUBLIC_BFF_API_URL}`,
    "fc:frame:post_url": `${env.NEXT_PUBLIC_BFF_API_URL}`,
    "of:input:text": "Verse Id",
    "fc:frame:input:text": "Jump to Verse ID",
    "of:button:1": "Enter Verse",
    "of:button:1:action": "post",
    "of:button:1:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames?type=enter-verse`,
    "fc:frame:button:1": "Enter Verse",
    "fc:frame:button:1:action": "post",
    "fc:frame:button:1:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames?type=enter-verse`,
    "of:button:2": "Create Genesis Verse",
    "of:button:2:action": "post",
    "of:button:2:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames?type=to-create-story`,
    "fc:frame:button:2": "Create Genesis Verse",
    "fc:frame:button:2:action": "post",
    "fc:frame:button:2:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames?type=to-create-story`,
  },
};

export default function Home() {
  return (
    <div>
      <main
        className={cn(
          "text-black flex min-h-screen flex-col items-center justify-center p-2 text-center md:p-24 gap-4 md:gap-10",
          "bg-[url('/book.jpg')] bg-center bg-no-repeat bg-cover"
        )}
      >
        <TypeWriterTitle />
        <TypeWriterSubTitle />

        <CTA />
      </main>
    </div>
  );
}
