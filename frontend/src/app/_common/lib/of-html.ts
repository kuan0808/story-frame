import { TargetType } from "@/common/model";
import { env } from "@/env.mjs";

type Action = "post" | "post_redirect" | "mint" | "link";

type Button =
  | {
      type: "button";
      label: string;
      action: Exclude<Action, "link">;
      targetType: TargetType;
      targetVerseId?: number;
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
  let buttonIndex = 0;
  const head = `
    <head>
      <meta property="of:image" content="${params.imagePath}" />
      <meta property="fc:frame:image" content="${params.imagePath}" />
      <meta property="of:image:alt" content="${params.imageAlt}" />
      <meta property="og:image" content="${params.imagePath}" />
      <meta property="of:image:aspect_ratio" content="1:1" />
      <meta property="fc:frame:image:aspect_ratio" content="1:1" />

      <meta property="of:post_url" content="${params.postUrl}" />
      <meta property="fc:frame:post_url" content="${params.postUrl}" />
      ${
        params.components
          ?.map((component, index) => {
            if (component.type === "button") {
              buttonIndex++;

              return `
              <meta property="of:button:${buttonIndex}" content="${
                component.label
              }" />
              <meta property="of:button:${buttonIndex}:action" content="${
                component.action
              }" />
              ${
                component.action === "link"
                  ? `
                  <meta property="of:button:${buttonIndex}:target" content="${component.target}" />
                  `
                  : `
                  <meta property="of:button:${buttonIndex}:target" content="${
                      env.NEXT_PUBLIC_BFF_API_URL
                    }/frames?${new URLSearchParams({
                      type: component.targetType,
                      ...(component.targetVerseId && {
                        verse_id: component.targetVerseId.toString(),
                      }),
                    }).toString()}" />
                  `
              }
              <meta property="fc:frame:button:${buttonIndex}" content="${
                component.label
              }" />
              <meta property="fc:frame:button:${buttonIndex}:action" content="${
                component.action
              }" />
              ${
                component.action === "link"
                  ? `
                  <meta property="fc:frame:button:${buttonIndex}:target" content="${component.target}" />
                  `
                  : `
                  <meta property="fc:frame:button:${buttonIndex}:target" content="${
                      env.NEXT_PUBLIC_BFF_API_URL
                    }/frames?${new URLSearchParams({
                      type: component.targetType,
                      ...(component.targetVerseId && {
                        verse_id: component.targetVerseId.toString(),
                      }),
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
