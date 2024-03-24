import { getGenesisVerseId } from "@/common/lib/traverse";
import { env } from "@/env.mjs";
import { Metadata } from "next";

type Props = {
  params: {
    verse_id: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  let genesisVerseId = 0;
  try {
    const res = await getGenesisVerseId(Number(params.verse_id));
    genesisVerseId = res.genesis_id;
  } catch (e) {
    console.error(e);
  }
  const isGenesisVerse = genesisVerseId.toString() === params.verse_id;
  const verseFullId = isGenesisVerse
    ? params.verse_id
    : `${genesisVerseId}🍂${params.verse_id}`;

  return {
    title: `No.${verseFullId}`,
    description: `Welcome to Verse no.${params.verse_id}, a realm born from a series of choices within Genesis Verse no.${genesisVerseId}.`,
    openGraph: {
      images: [
        {
          url: `${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${params.verse_id}`,
        },
      ],
    },
    other: {
      "of:image": `${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${params.verse_id}`,
      "fc:frame:image": `${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${params.verse_id}`,
      "og:image": `${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${params.verse_id}`,
      "of:button:1": "Travel Back",
      "of:button:1:action": "post",
      "of:button:1:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames/travel-back`,
      "fc:frame:button:1": "Travel Back",
      "fc:frame:button:1:action": "post",
      "fc:frame:button:1:post_url": `${env.NEXT_PUBLIC_BFF_API_URL}/frames/travel-back`,
      "of:input:text": "Write down your story",
      "fc:frame:input:text": "Write down your story",
      "of:button:2": "Continue",
      "of:button:2:action": "post_url",
      "of:button:2:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames/continue`,
      "fc:frame:button:2": "Continue",
      "fc:frame:button:2:action": "post",
      "fc:frame:button:2:post_url": `${env.NEXT_PUBLIC_BFF_API_URL}/frames/continue`,
    },
  };
};

const Verse = async ({
  params,
}: {
  params: {
    verse_id: string;
  };
}) => {
  const { genesis_id } = await getGenesisVerseId(Number(params.verse_id));

  const verseFullId = !!genesis_id
    ? `${genesis_id}🍂${params.verse_id}`
    : params.verse_id;

  return (
    <>
      <main>
        <h1>Welcome to Verse No.{verseFullId}</h1>
      </main>
    </>
  );
};

export default Verse;
