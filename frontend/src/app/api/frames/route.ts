import { validateMessage } from "@/common/lib/neynar";
import { Component, computeOfHtml } from "@/common/lib/of-html";
import { createVerse, travelBack } from "@/common/lib/traverse";
import { createError } from "@/common/lib/utils";
import { computeCastUrl } from "@/common/lib/warpcast";
import { FrameActionPayloadSchema, TargetTypeSchema } from "@/common/model";
import { env } from "@/env.mjs";
import { P, match } from "ts-pattern";
import { z } from "zod";

const RequestQuerySchema = z.object({
  type: TargetTypeSchema,
  verse_id: z.coerce.number().optional(),
});

const RequestBodySchema = FrameActionPayloadSchema;

const searchParamsError = createError("SearchParamsError");
const noParentError = createError("NoParentError");
const inputNotProvidedError = createError("InputNotProvided");

export async function POST(req: Request) {
  try {
    const body = RequestBodySchema.parse(await req.json());
    const actionInfo = await validateMessage(body.trustedData.messageBytes);

    const { searchParams } = new URL(req.url);
    const query = RequestQuerySchema.parse(Object.fromEntries(searchParams));

    const verseId = query.verse_id;
    const targetType = query.type;

    match(targetType)
      //
      .with("enter-verse", async () => {
        if (!verseId) throw searchParamsError("VerseIdNotProvided");

        const parentVerse = await travelBack(verseId);
        const components: Component[] = [
          {
            type: "input",
            label: "Write your verse here",
          },
          {
            type: "button",
            label: "Continue",
            action: "post",
            targetType: "continue",
            targetVerseId: verseId,
          },
        ];

        if (!!parentVerse.parent_id) {
          components.unshift({
            type: "button",
            label: "Travel Back",
            action: "post",
            targetType: "travel-back",
            targetVerseId: parentVerse.parent_id,
          });
        }

        return new Response(
          computeOfHtml({
            imagePath: `${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${verseId}`,
            components,
          }),
          {
            status: 200,
          }
        );
      })
      .with(P.union("create-story", "continue"), async () => {
        const input = actionInfo.action.input?.text?.trim();

        // FIXME: This should be a better error
        if (!input) throw inputNotProvidedError("");

        const res = await createVerse({
          parent_id: verseId,
          content: input,
          cast: actionInfo.action.cast,
          interactor: actionInfo.action.interactor,
        });

        return new Response(
          computeOfHtml({
            imagePath: `${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${res.verse_id}`,
            components: [
              {
                type: "button",
                label: "Share Your Verse",
                action: "link",
                //TODO: Implement this
                target: `${env.NEXT_PUBLIC_APP_URL}/${res.verse_id}?share_modal=open`,
              },
            ],
          }),
          {
            status: 200,
          }
        );
      })
      .with("travel-back", async () => {
        if (!verseId) throw searchParamsError("VerseIdNotProvided");

        const parentVerse = await travelBack(verseId);
        if (!parentVerse.parent_id)
          //FIXME: This should be a better error
          throw noParentError("No parent verse found");

        const grandParentVerse = await travelBack(parentVerse.parent_id);
        const components: Component[] = [
          {
            type: "button",
            label: "Step In",
            action: "link",
            target: computeCastUrl(parentVerse.parent_cast!),
          },
        ];

        if (!!grandParentVerse.parent_id) {
          components.unshift({
            type: "button",
            label: "Travel Back",
            action: "post",
            targetType: "travel-back",
            targetVerseId: parentVerse.parent_id,
          });
        }

        return new Response(
          computeOfHtml({
            imagePath: `${env.NEXT_PUBLIC_BFF_API_URL}/og?verse_id=${parentVerse.parent_id}`,
            components: components,
          }),
          {
            status: 200,
          }
        );
      })

      .exhaustive();
  } catch (error) {
    match(error)
      //
      .with(
        {
          name: "SearchParamsError",
        },
        (error) => {}
      )
      .with(
        {
          name: "NoParentError",
        },
        (error) => {}
      )
      .with(
        {
          name: "InputNotProvided",
        },
        (error) => {}
      )
      .with(
        {
          name: "ValidationError",
        },
        (error) => {}
      );
  }
}
