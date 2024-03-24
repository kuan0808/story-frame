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
        <meta property="of:image" content="" />
        <meta property="of:image:alt" content="" />
        <meta
          property="og:image"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${params.verse_id}`}
        />
        {/* Travel Back */}

        <meta property="of:button:1" content="Travel Back" />
        <meta property="of:button:1:action" content="post_url" />
        <meta
          property="of:button:1:target"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames/travel-back`}
        />

        {/* Input */}
        <meta property="of:input:text" content="Write down your story" />

        {/* Write Story */}
        <meta property="of:button:1" content="Continue" />
        <meta property="of:button:1:action" content="post_url" />
        <meta
          property="of:button:1:target"
          content={`${env.NEXT_PUBLIC_BFF_API_URL}/frames/continue`}
        />
      </Head>
    </>
  );
};

export default Verse;
