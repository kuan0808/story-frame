"use client";

import TypeIt from "typeit-react";

const TypeWriterTitle = () => {
  return (
    <TypeIt
      options={{
        speed: 50,
      }}
      as="h1"
      className="text-6xl font-bold"
      getBeforeInit={(instance: any) => {
        instance
          .type("Welcome to Story Frame")
          .pause(750)
          .delete(5)
          .pause(1000)
          .type("Verse 📜");

        // Remember to return it!
        return instance;
      }}
    />
  );
};

export { TypeWriterTitle };
