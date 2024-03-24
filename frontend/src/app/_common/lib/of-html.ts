import { TargetType } from "@/common/model";
import { env } from "@/env.mjs";

type Action = "post" | "post_redirect" | "mint" | "link";

type Button =
  | {
      type: "button";
      label: string;
      action: Exclude<Action, "link">;
      targetType: TargetType;
      targetVerseId: number;
    }
  | {
      type: "button";
      label: string;
      action: "link";
      target: string;
    };

type Input = {
  type: "input";
  label: string;
};
export type Component = Button | Input;

export interface ComputeOfHtmlParams {
  title?: string;
  imagePath: string;
  imageAlt?: string;
  postUrl?: string;
  components?: Component[];
}

export const computeOfHtml = (params: ComputeOfHtmlParams) => {
  const head = `
    <head>
      <meta property="of:image" content="${params.imagePath}" />
      <meta property="fc:frame:image" content="${params.imagePath}" />
      <meta property="of:image:alt" content="${params.imageAlt}" />
      <meta property="og:image" content="${params.imagePath}" />

      <meta property="of:post_url" content="${params.postUrl}" />
      <meta property="fc:frame:post_url" content="${params.postUrl}" />
      ${
        params.components
          ?.map((component, index) => {
            if (component.type === "button") {
              return `
              <meta property="of:button:${index + 1}" content="${
                component.label
              }" />
              <meta property="of:button:${index + 1}:action" content="${
                component.action
              }" />
              ${
                component.action === "link"
                  ? `
                  <meta property="of:button:${index + 1}:target" content="${
                      component.target
                    }" />
                  `
                  : `
                  <meta property="of:button:${index + 1}:target" content="${
                      env.NEXT_PUBLIC_BFF_API_URL
                    }/frames?${new URLSearchParams({
                      type: component.targetType,
                      verse_id: component.targetVerseId.toString(),
                    }).toString()}" />
                  `
              }
              <meta property="fc:frame:button:${index + 1}" content="${
                component.label
              }" />
              <meta property="fc:frame:button:${index + 1}:action" content="${
                component.action
              }" />
              ${
                component.action === "link"
                  ? `
                  <meta property="fc:frame:button:${
                    index + 1
                  }:target" content="${component.target}" />
                  `
                  : `
                  <meta property="fc:frame:button:${
                    index + 1
                  }:post_url" content="${
                      env.NEXT_PUBLIC_BFF_API_URL
                    }/frames?${new URLSearchParams({
                      type: component.targetType,
                      verse_id: component.targetVerseId.toString(),
                    }).toString()}" />
                  `
              }
              `;
            } else if (component.type === "input") {
              return `
              <meta property="of:input:text" content="${component.label}" />
              <meta property="fc:frame:input:text" content="${component.label}" />
            `;
            }
          })
          .join("") ?? ""
      }
    </head>
  `;

  return `
    <html lang="en">
      <title>${params.title}</title>
      ${head}
    </html>
  `;
};
