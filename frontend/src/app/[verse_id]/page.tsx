import { getGenesisVerseId, getVerseInfo } from "@/common/lib/traverse";
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
  const res = await getVerseInfo(params.verse_id);
  const genesisVerseId = res.genesis_id;
  const hasParent = res.contents.length > 1;

  const isGenesisVerse = genesisVerseId?.toString() === params.verse_id;
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
      ...(hasParent && {
        "of:button:1": "Travel Back",
        "of:button:1:action": "post",
        "of:button:1:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames?type=travel-back&verse_id=${params.verse_id}`,
        "fc:frame:button:1": "Travel Back",
        "fc:frame:button:1:action": "post",
        "fc:frame:button:1:target": `${env.NEXT_PUBLIC_BFF_API_URL}/frames?type=travel-back&verse_id=${params.verse_id}`,
      }),
      "of:input:text": "Write down your story",
      "fc:frame:input:text": "Write down your story",
      [`of:button:${hasParent ? 2 : 1}`]: "Continue",
      [`of:button:${hasParent ? 2 : 1}:action`]: "post_url",
      [`of:button:${
        hasParent ? 2 : 1
      }:target`]: `${env.NEXT_PUBLIC_BFF_API_URL}/frames?type=continue&verse_id=${params.verse_id}`,
      [`fc:frame:button:${hasParent ? 2 : 1}`]: "Continue",
      [`fc:frame:button:${hasParent ? 2 : 1}:action`]: "post",
      [`fc:frame:button:${
        hasParent ? 2 : 1
      }:target`]: `${env.NEXT_PUBLIC_BFF_API_URL}/frames?type=continue&verse_id=${params.verse_id}`,
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

  const isGenesisVerse = genesis_id.toString() === params.verse_id;

  const verseFullId = isGenesisVerse
    ? params.verse_id
    : `${genesis_id}🍂${params.verse_id}`;

  return (
    <>
      <main>
        <h1 className="text-6xl">Welcome to Verse No.{verseFullId}</h1>
      </main>
    </>
  );
};

export default Verse;
