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
          <div className="flex items-center justify-center bg-black w-full h-full">
            <h1 className="text-white text-4xl">Welcome to Verse</h1>
          </div>
        ),
        {
          width: 600,
          height: 600,
        }
      );
    }

    const { contents, sibling_ids } = await getVerseInfo(verseId);
    contents.reverse();

    // Make sure the font exists in the specified path:
    const fontData = await fetch(
      new URL("../../../assets/SpecialElite-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          className="flex items-center justify-center bg-black w-full h-full"
          style={{
            fontFamily: '"Typewriter"',
          }}
        >
          <h1 className="text-white text-4xl">Welcome to Verse No.{verseId}</h1>
          {contents.map((content, index) => (
            <span key={index}>{content}</span>
          ))}
        </div>
      ),
      {
        width: 600,
        height: 600,
        fonts: [
          {
            name: "Typewriter",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {}
};
