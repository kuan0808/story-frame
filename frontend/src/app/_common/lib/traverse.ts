import { createError } from "@/common/lib/utils";
import { env } from "@/env.mjs";
import { z } from "zod";

export const traverseApiError = createError("TraverseApiError");
export const zodError = createError("ZodError");

const VerseInfoSchema = z.object({
  contents: z.array(z.string()),
  sibling_ids: z.array(z.string()).nullable(),
});
export const getVerseInfo = async (verse_id: string) =>
  fetch(`${env.BE_API_URL}/${verse_id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => VerseInfoSchema.parse(res))
    .catch((e) => {
      if (e instanceof z.ZodError) {
        throw zodError("Failed to parse verse info", e);
      }
      throw traverseApiError("Failed to fetch verse info", e);
    });

const Userschema = z.object({
  object: z.literal("user"),
  fid: z.number(),
  username: z.string().min(1),
  display_name: z.string().min(1),
  pfp_url: z.string().url(),
});

const CastSchema = z.object({
  hash: z.string().startsWith("0x"),
  author: Userschema,
});

export type Cast = z.infer<typeof CastSchema>;
const PastVerseSchema = z.object({
  contents: z.array(z.string()),
  parent_id: z.string().nullable(),
  parent_cast: CastSchema.nullable(),
});
export const travelBack = async (verse_id: string) =>
  fetch(`${env.BE_API_URL}/${verse_id}/back`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => PastVerseSchema.parse(res))
    .catch((e) => {
      if (e instanceof z.ZodError) {
        throw zodError("Failed to parse past verse info", e);
      }
      throw traverseApiError("Failed to fetch past verse info", e);
    });

const CreateVersePayloadSchema = z.object({
  parent_id: z.string().optional(),
  content: z.string().min(1),
  cast: CastSchema,
  interactor: Userschema,
});
type CreateVersePayload = z.infer<typeof CreateVersePayloadSchema>;
const CreateVerseResponseSchema = z.object({
  verse_id: z.string().min(1),
  contents: z.array(z.string()),
});
export const createVerse = async (payload: CreateVersePayload) => {
  return fetch(`${env.BE_API_URL}`, {
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
