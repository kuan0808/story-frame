import { createError } from "@/common/lib/utils";
import { env } from "@/env.mjs";
import { z } from "zod";

export const traverseApiError = createError("TraverseApiError");
export const zodError = createError("ValidationError");

const Userschema = z.object({
  object: z.literal("user"),
  fid: z.number(),
  username: z.string().min(1),
  display_name: z.string().min(1),
  pfp_url: z.string().url(),
});

const CastSchema = z.object({
  hash: z.string().startsWith("0x"),
  author: Userschema.optional(),
});
const ContentSchema = z.object({
  id: z.number(),
  content: z.object({
    Data: z.string(),
  }),
  cast: z.object({
    Data: CastSchema,
  }),
  user: z.object({
    Data: Userschema,
  }),
});
export type Content = z.infer<typeof ContentSchema>;
const VerseInfoSchema = z.object({
  contents: z.array(ContentSchema),
  // sibling_ids: z.array(z.number()).nullable(),
  genesis_id: z.number().nullable(),
});
export const getVerseInfo = async (verse_id: string) =>
  fetch(`${env.BE_API_URL}/${verse_id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => VerseInfoSchema.parse(res))
    .catch((e) => {
      if (e instanceof z.ZodError) {
        throw zodError(`Failed to parse verse info of verse ${verse_id}`, e);
      }
      throw traverseApiError(
        `Failed to fetch verse info of verse ${verse_id}`,
        e
      );
    });

export type Cast = z.infer<typeof CastSchema>;
const PastVerseSchema = z.object({
  contents: z.array(ContentSchema),
  parent_id: z.number().nullable(),
  parent_cast: z.object({ Data: CastSchema }).nullable(),
  genesis_id: z.number().optional(),
});
export const travelBack = async (verse_id: number) =>
  fetch(`${env.BE_API_URL}/${verse_id}/back`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => PastVerseSchema.parse(res))
    .catch((e) => {
      if (e instanceof z.ZodError) {
        throw zodError(
          `Failed to parse past verse info of verse ${verse_id}`,
          e
        );
      }
      throw traverseApiError(
        `Failed to fetch past verse info of verse ${verse_id}`,
        e
      );
    });

const CreateVersePayloadSchema = z.object({
  parent_id: z.number().optional(),
  content: z.string().min(1),
  cast: CastSchema,
  user: Userschema,
});
type CreateVersePayload = z.infer<typeof CreateVersePayloadSchema>;
const CreateVerseResponseSchema = z.object({
  verse_id: z.number(),
  contents: z.array(ContentSchema),
});
export const createVerse = async (payload: CreateVersePayload) => {
  return fetch(`${env.BE_API_URL}/create`, {
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => CreateVerseResponseSchema.parse(res))
    .catch((e) => {
      if (e instanceof z.ZodError) {
        throw zodError("Failed to parse create verse response", e);
      }
      const parentId = payload.parent_id;
      if (!!parentId) {
        throw traverseApiError(`Failed to create verse from ${parentId}`, e);
      }
      throw traverseApiError("Failed to create new verse", e);
    });
};

const GetGenesisIdResponseSchema = z.object({
  genesis_id: z.number(),
});
export const getGenesisVerseId = async (verseId: number) =>
  fetch(`${env.BE_API_URL}/${verseId}/genesis`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => GetGenesisIdResponseSchema.parse(res))
    .catch((e) => {
      if (e instanceof z.ZodError) {
        throw zodError(
          `Failed to parse genesis verse id of verse ${verseId}`,
          e
        );
      }
      throw traverseApiError(
        `Failed to fetch genesis verse id of ${verseId}`,
        e
      );
    });
