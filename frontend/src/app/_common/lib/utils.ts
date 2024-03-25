import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const createError =
  (name: string) => (message: string, cause?: Error["cause"]) =>
    Object.assign(
      new Error(message, {
        cause,
      }),
      { name }
    );
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
