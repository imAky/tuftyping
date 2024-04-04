"use client";
import useEngine from "@/app/hooks/useEngine";
import CountdownTimer from "./CountdownTimer";
import GeneratedWords from "./GeneratedWords";
import WordsContainer from "./WordsContainer";
import UserTypings from "./UserTypings";
import RestartButton from "./RestartButton";
import Results from "./Results";
import { useEffect, useState } from "react";

const TypingGame = () => {
  const {
    words,
    typed,
    timeLeft,

    state,
    restart,

    adjustTimer,
    gameResults,
    keydownHandler,
  } = useEngine();

  return (
    <div className="flex flex-grow h-[625px] mb-8 flex-col items-center">
      {state !== "finish" && (
        <CountdownTimer
          timeLeft={timeLeft}
          adjustTimer={adjustTimer}
          state={state}
        />
      )}
      <div className="flex justify-center items-start max-sm:-mt-4">
        {state !== "finish" ? (
          <WordsContainer keydownHandler={keydownHandler}>
            {" "}
            <GeneratedWords key={words} words={words} />
            <UserTypings
              className="absolute inset-0"
              words={words}
              userInput={typed}
            />
          </WordsContainer>
        ) : (
          <Results
            className="mt-10"
            state={state}
            gameResults={gameResults}
            onRestart={restart}
          />
        )}
      </div>
      {state !== "finish" && (
        <RestartButton
          className="mx-auto mt-10 text-slate-500"
          onRestart={restart}
        />
      )}
    </div>
  );
};

export default TypingGame;
