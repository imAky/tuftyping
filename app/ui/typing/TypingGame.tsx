"use client";
import useEngine from "@/app/hooks/useEngine";
import CountdownTimer from "./CountdownTimer";
import GeneratedWords from "./GeneratedWords";
import WordsContainer from "./WordsContainer";
import UserTypings from "./UserTypings";
import RestartButton from "./RestartButton";
import { Result } from "postcss";

import { calculateAccuracyPercentage } from "@/app/utils/helpers";
import Results from "./Results";

const TypingGame = () => {
  const {
    words,
    typed,
    timeLeft,
    errors,
    state,
    restart,
    totalTyped,
    adjustTimer,
  } = useEngine();

  console.log("re-ren typing game");
  console.log(`typinggame${timeLeft}`);

  return (
    <div className="flex flex-grow flex-col items-center mx-4">
      <CountdownTimer
        timeLeft={timeLeft}
        adjustTimer={adjustTimer}
        state={state}
      />
      {state !== "finish" ? (
        <WordsContainer>
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
          errors={errors}
          accuracyPercentage={
            calculateAccuracyPercentage(errors, totalTyped) || 0
          }
          total={totalTyped}
        />
      )}
      {}
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={restart}
      />
    </div>
  );
};

export default TypingGame;
