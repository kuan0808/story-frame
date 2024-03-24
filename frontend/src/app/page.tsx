import { env } from "@/env.mjs";
import { Metadata } from "next";

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
    "fc:frame:input:text": "Verse Id",
    "of:button:1": "Enter Verse",
    "of:button:1:action": "post",
    "of:button:1:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames/enter-verse`,
    "fc:frame:button:1": "Enter Verse",
    "fc:frame:button:1:action": "post",
    "fc:frame:button:1:post_url": `${env.NEXT_PUBLIC_BFF_API_URL}/frames/enter-verse`,
    "of:button:2": "Create Genesis Verse",
    "of:button:2:action": "post",
    "of:button:2:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames/create-story`,
    "fc:frame:button:2": "Create Genesis Verse",
    "fc:frame:button:2:action": "post",
    "fc:frame:button:2:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames/create-story`,
  },
};

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Welcome to Verse</h1>
        <p className="text-lg">
          A place where you can create and continue stories.
        </p>
      </main>
    </div>
  );
}
