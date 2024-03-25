import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    BE_API_URL: z.string().min(1),
    NEYNAR_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BFF_API_URL: z.string().min(1),
    NEXT_PUBLIC_WARPCAST_URI: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_GENESIS_CAST_URL: z
      .string()
      .default("https://warpcast.com/kuannnn/0xd60a1422"),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BE_API_URL: process.env.BE_API_URL,
    NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    NEXT_PUBLIC_BFF_API_URL: process.env.NEXT_PUBLIC_BFF_API_URL,
    NEXT_PUBLIC_WARPCAST_URI: process.env.NEXT_PUBLIC_WARPCAST_URI,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_GENESIS_CAST_URL: process.env.NEXT_PUBLIC_GENESIS_CAST_URL,
  },
});
