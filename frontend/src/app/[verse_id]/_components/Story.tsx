"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/Avatar";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/components/Tooltip";
import { Content } from "@/common/lib/traverse";
import { computeCastUrl } from "@/common/lib/warpcast";
import { clsx } from "clsx";

interface StoryProps {
  contents: Content[];
}

const Story = ({ contents }: StoryProps) => {
  const reversedContents = [...contents].reverse();

  return (
    <div className="space-y-4">
      {reversedContents.map((data, index) => (
        <TooltipProvider key={index}>
          <Tooltip delayDuration={500}>
            <TooltipTrigger className="text-left">
              <a
                key={index}
                className={clsx(
                  "text-xl whitespace-pre-line transition-all duration-300 ease-in-out underline decoration-transparent",
                  "hover:decoration-red-500 hover:decoration-wavy "
                )}
                href={computeCastUrl(data.cast.Data)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {`${data.content.Data}${
                  data.content.Data.endsWith(".") ? "" : "."
                }`}
              </a>
            </TooltipTrigger>
            <TooltipContent
              className="p-0 border-none"
              side={index % 2 === 0 ? "left" : "right"}
            >
              <div className="p-4 bg-white rounded-lg shadow-lg flex items-center">
                <Avatar>
                  <AvatarImage src={data.user.Data.pfp_url} />
                  <AvatarFallback>
                    {data.user.Data.display_name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg">{data.user.Data.username}</p>
              </div>
              <TooltipArrow className="fill-white w-4 h-5" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export { Story };
