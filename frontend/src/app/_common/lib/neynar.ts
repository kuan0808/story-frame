import { NeynarAPIClient } from "@neynar/nodejs-sdk";

import { env } from "@/env.mjs";

const client = new NeynarAPIClient(env.NEYNAR_API_KEY);

export const validateMessage = async (message: string) => {
  const res = await client.validateFrameAction(message, {
    castReactionContext: true,
  });

  if (!res.valid) {
    throw new Error("MessageValidationFailed");
  }

  return res;
};
