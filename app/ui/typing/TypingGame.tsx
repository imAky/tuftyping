"use client";
import useEngine from "@/app/hooks/useEngine";
import CountdownTimer from "./CountdownTimer";
import GeneratedWords from "./GeneratedWords";
import WordsContainer from "./WordsContainer";
import UserTypings from "./UserTypings";
import RestartButton from "./RestartButton";
import { Result } from "postcss";
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
    gameResults,
  } = useEngine();

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
          gameResults={gameResults}
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
