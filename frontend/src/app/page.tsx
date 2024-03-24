import { env } from "@/env.mjs";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta property="of:image" content="" />
        <meta property="of:image:alt" content="" />
        <meta
          property="og:image"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/og`}
        />
        <meta property="of:post_url" content={env.NEXT_PUBLIC_BFF_API_URL} />
        <meta property="of:input:text" content="Verse Id" />
        <meta property="of:button:1" content="Enter Verse" />
        <meta property="of:button:1:action" content="post_url" />
        <meta
          property="of:button:1:target"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames/enter-verse`}
        />
        <meta property="of:button:1" content="Create Story" />
        <meta property="of:button:1:action" content="post_url" />
        <meta
          property="of:button:1:target"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames/create-story`}
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Welcome to Verse</h1>
        <p className="text-lg">
          A place where you can create and continue stories.
        </p>
      </main>
    </>
  );
}
