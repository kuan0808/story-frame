import { env } from "@/env.mjs";
import { Cast } from "./traverse";

export const computeCastUrl = (cast: Cast) => {
  if (!cast.author)
    return `https://warpcast.com/~/developers/frames?url=${env.NEXT_PUBLIC_APP_URL}`;

  const castHash = cast.hash.slice(10);
  return `${env.NEXT_PUBLIC_WARPCAST_URI}/${cast.author.username}/${castHash}`;
};

export const computeCastComposerUrl = (
  verseId: number | null,
  text?: string
) => {
  const searchParams = new URLSearchParams({
    ...(text && { text }),
    ["embeds[]"]: `${env.NEXT_PUBLIC_APP_URL}/${verseId ?? ""}`,
  });

  return `${env.NEXT_PUBLIC_WARPCAST_URI}/~/compose?${searchParams.toString()}`;
};
