import React, { useRef, useEffect } from "react";

const GeneratedWords = ({
  words,
  wordsRef,
}: {
  words: string;
  wordsRef: any;
}) => {
  return (
    <div
      className="words relative text-2xl tracking-wider max-w-5xl leading-loose break-words"
      ref={wordsRef}
    >
      <span className="caret">|</span>

      {words.split("").map((char, index) => (
        <span className="char tracking-widest transition-all" key={index}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default GeneratedWords;
