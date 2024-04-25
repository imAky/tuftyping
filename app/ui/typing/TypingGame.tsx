"use client";
import useEngine from "@/app/hooks/useEngine";
import CountdownTimer from "./CountdownTimer";
import GeneratedWords from "./GeneratedWords";
import WordsContainer from "./WordsContainer";
import RestartButton from "./RestartButton";
import Results from "./Results";
import { Suspense, useEffect, useState } from "react";
import { MainSpinner } from "../component/Spinner";

const TypingGame = () => {
  const {
    words,
    timeLeft,
    wordsRef,
    state,
    restart,
    isLoadingResuts,
    adjustTimer,
    gameResults,
    keydownHandler,
  } = useEngine();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <div className="flex flex-grow  mb-8 flex-col items-center ">
          {state !== "finish" && (
            <CountdownTimer
              timeLeft={timeLeft}
              adjustTimer={adjustTimer}
              state={state}
            />
          )}
          <div className="flex justify-center items-start max-sm:-mt-4">
            {state !== "finish" && (
              <WordsContainer keydownHandler={keydownHandler}>
                {" "}
                <GeneratedWords key={words} words={words} wordsRef={wordsRef} />
              </WordsContainer>
            )}
            {state === "finish" &&
              (isLoadingResuts ? (
                <MainSpinner className="absolute inset-0 flex items-center justify-center" />
              ) : (
                <Suspense fallback={null}>
                  <Results
                    state={state}
                    gameResults={gameResults}
                    onRestart={restart}
                  />
                </Suspense>
              ))}
          </div>
          {state !== "finish" && (
            <Suspense fallback={null}>
              <RestartButton
                className="mx-auto mt-10 text-slate-500"
                onRestart={restart}
              />
            </Suspense>
          )}
        </div>
      )}
    </>
  );
};

export default TypingGame;
