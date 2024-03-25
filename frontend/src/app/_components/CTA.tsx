"use client";

import { env } from "@/env.mjs";
import { CSSProperties } from "react";

const buttonInlineStyle = {
  "-webkit-mask-image":
    "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png')",
  maskImage:
    "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png')",
  "-webkit-mask-size": "944px 604px",
  "-webkit-mask-position": "13rem 6rem",
  maskSize: "944px 604px",
  maskPosition: "13rem 6rem",
  mixBlendMode: "multiply",
  transform: "rotate(-5deg)", // This overrides the Tailwind rotate class if needed
};

const CTA = () => {
  return (
    <button
      className="mt-6 md:mt-12 transform rotate-12 text-3xl font-bold inline-block uppercase font-mono bg-gray-200 border-[12px] text-[#0A9928] border-[#0A9928] rounded-none p-2 cursor-pointer"
      style={buttonInlineStyle as CSSProperties}
      onClick={() => {
        window.open(
          env.NEXT_PUBLIC_GENESIS_CAST_URL,
          "StoryVerseGenesisCast",
          "popup,width=600,height=600"
        );
      }}
    >
      Start Your Journey
    </button>
  );
};

export { CTA };
