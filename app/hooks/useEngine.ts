import { useCallback, useEffect, useRef, useState } from "react";
import { countErrors, isMobile } from "../utils/helpers";
import useCountdown from "./useCountdown";
import useTypings from "./useTypings";
import useWords from "./useWords";
import { GameResults } from "../utils/results";
import { GameResultsTypes } from "../lib/definition";

export type State = "start" | "run" | "finish";

const useEngine = (initialCountSeconds: number = 30) => {
  const [state, setState] = useState<State>("start");
  const [countdownSeconds, setCountdownSeconds] =
    useState<number>(initialCountSeconds);

  const { timeLeft, startCountdown, resetCountdown } =
    useCountdown(countdownSeconds);
  const { words, updateWords } = useWords(isMobile() ? 5 : 20);
  const {
    cursor,
    typed,
    totalCorrChar,
    clearTyped,
    totalTypedCharacter,
    resetTotalTyped,
    keydownHandler,
  } = useTypings(state !== "finish");

  const [totalWordsGenerated, setTotalWordsGenerated] = useState<string>("");
  const [gameResults, setGameResults] = useState<GameResultsTypes>({
    wpmResult: {
      wpm: 0,
      correctWords: 0,
    },
    rawWpm: 0,
    typingMetrics: {
      accuracy: 0,
      correctCharacters: 0,
      incorrectCharacters: 0,
      errors: 0,
      totalTyped: 0,
    },
    timing: 0,
  });
  const isFirstRender = useRef(true);
  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const restart = useCallback(() => {
    resetCountdown();
    resetTotalTyped();
    setTotalWordsGenerated("");
    setState("start");

    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setTotalWordsGenerated((prevTotalWordsGenerated) =>
        prevTotalWordsGenerated.concat(" ", words)
      );
    } else {
      isFirstRender.current = false;
    }
  }, [words]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  useEffect(() => {
    if (!timeLeft && state === "run") {
      const calculateResult = async () => {
        const gameresult = await GameResults(
          totalCorrChar,
          totalTypedCharacter,
          totalWordsGenerated,
          countdownSeconds
        );

        setGameResults(gameresult);

        setState("finish");
      };
      calculateResult();
    }
  }, [timeLeft, state]);

  /**
   * when the current words are all filled up, we generate and show another set of words
   */

  useEffect(() => {
    if (areWordsFinished) {
      console.log(`typed ${typed}`);
      // sumErrors();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords]);

  const adjustTimer = useCallback(
    (increment: number) => {
      let newCountdownSeconds = countdownSeconds;
      if (countdownSeconds >= 60) {
        newCountdownSeconds += increment * 60;
      } else {
        newCountdownSeconds += increment * (countdownSeconds < 30 ? 15 : 30);
      }

      newCountdownSeconds = Math.max(newCountdownSeconds, 15);
      setCountdownSeconds(newCountdownSeconds);
    },
    [countdownSeconds]
  );

  return {
    state,
    words,
    typed,
    totalCorrChar,

    restart,
    timeLeft,

    adjustTimer,
    gameResults,
    keydownHandler,
  };
};

export default useEngine;
