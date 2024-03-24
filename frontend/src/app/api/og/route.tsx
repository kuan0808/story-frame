/* eslint-disable @next/next/no-img-element */

import { getVerseInfo } from "@/common/lib/traverse";
import { ImageResponse } from "next/og";
import { z } from "zod";

export const runtime = "edge";

const RequestQuerySchema = z.object({
  verse_id: z.string().optional(),
});

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = RequestQuerySchema.parse(Object.fromEntries(searchParams));

    const verseId = query.verse_id;
    if (!verseId) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "black",
            }}
          >
            <h1 tw="text-white text-4xl">Welcome to Story Verse</h1>
          </div>
        ),
        {
          width: 1200,
          height: 1200,
        }
      );
    }

    const { contents, sibling_ids, genesis_id } = await getVerseInfo(verseId);

    const isGenesisVerse = genesis_id === Number(verseId);
    const verseFullId = isGenesisVerse ? verseId : `${genesis_id}🍂${verseId}`;

    const raw = contents
      .reverse()
      .map((data) => data.content.Data)
      .join(",");

    // Make sure the font exists in the specified path:
    // const fontData = await fetch(
    //   new URL("../../../assets/SpecialElite-Regular.ttf", import.meta.url)
    // ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            gap: "1rem",
            // fontFamily: '"Typewriter"',
          }}
        >
          <h1 tw="text-white text-4xl">Welcome to Verse No.{verseFullId}</h1>
          <p tw="text-white text-base m-4">{raw}</p>
        </div>
      ),
      {
        width: 1200,
        height: 1200,
        // fonts: [
        //   {
        //     name: "Typewriter",
        //     data: fontData,
        //     style: "normal",
        //   },
        // ],
      }
    );
  } catch (e) {
    console.error(e);

    const imageData = await fetch(
      new URL("./no-image.png", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "black",
          }}
        >
          {/* @ts-expect-error */}
          <img width="100%" height="100%" src={imageData} alt="Error" />
        </div>
      ),
      {
        width: 1200,
        height: 1200,
      }
    );
  }
};
