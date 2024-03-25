"use client";

import TypeIt from "typeit-react";

const TypeWriterSubTitle = () => {
  return (
    <TypeIt
      as="h2"
      className="text-xl font-bold"
      options={{
        speed: 50,
      }}
      getBeforeInit={(instance: any) => {
        instance
          .pause(4000)
          .type("A place where you can create and continue stories.");

        // Remember to return it!
        return instance;
      }}
    />
  );
};

export { TypeWriterSubTitle };
