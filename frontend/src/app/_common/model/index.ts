import { z } from "zod";

export const TargetTypeSchema = z.union([
  z.literal("enter-verse"),
  z.literal("create-story"),
  z.literal("travel-back"),
  z.literal("continue"),
]);
export type TargetType = z.infer<typeof TargetTypeSchema>;

export const FrameActionPayloadSchema = z.object({
  trustedData: z.object({
    messageBytes: z.string().min(5),
  }),
});
export type FrameActionPayload = z.infer<typeof FrameActionPayloadSchema>;
