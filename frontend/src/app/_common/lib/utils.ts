export const createError =
  (name: string) => (message: string, cause?: Error["cause"]) =>
    Object.assign(
      new Error(message, {
        cause,
      }),
      { name }
    );
