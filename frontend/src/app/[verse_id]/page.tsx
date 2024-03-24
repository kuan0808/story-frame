import { env } from "@/env.mjs";
import Head from "next/head";

const Verse = async ({
  params,
}: {
  params: {
    verse_id: string;
  };
}) => {
  return (
    <>
      <Head>
        <meta
          property="of:image"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${params.verse_id}`}
        />
        <meta
          property="fc:frame:image"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${params.verse_id}`}
        />
        <meta
          property="og:image"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${params.verse_id}`}
        />
        {/* Travel Back */}
        <meta property="of:button:1" content="Travel Back" />
        <meta property="of:button:1:action" content="post" />
        <meta
          property="of:button:1:target"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames/travel-back`}
        />
        <meta property="fc:frame:button:1" content="Travel Back" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta
          property="fc:frame:button:1:post_url"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames/travel-back`}
        />

        {/* Input */}
        <meta property="of:input:text" content="Write down your story" />
        <meta property="fc:frame:input:text" content="Write down your story" />

        {/* Write Story */}
        <meta property="of:button:2" content="Continue" />
        <meta property="of:button:2:action" content="post_url" />
        <meta
          property="of:button:2:target"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames/continue`}
        />
        <meta property="fc:frame:button:2" content="Continue" />
        <meta property="fc:frame:button:2:action" content="post" />
        <meta
          property="fc:frame:button:2:post_url"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames/continue`}
        />
      </Head>
      <main>
        <h1>Welcome to Verse No.{params.verse_id}</h1>
      </main>
    </>
  );
};

export default Verse;
