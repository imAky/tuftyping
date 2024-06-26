import { useCallback, useEffect, useRef, useState } from "react";
import { countErrors, isMobile } from "../utils/helpers";
import useCountdown from "./useCountdown";
import useTypings from "./useTypings";
import useWords from "./useWords";
import {
  calculateTypingMetrics,
  countRawWpm,
  countWpm,
} from "../utils/results";

export type State = "start" | "run" | "finish";

export type GameResults = {
  wpmResult: {
    wpm: number;
    correctWords: number;
  };
  rawWpm: number;
  typingMetrics: {
    accuracy: number;
    correctCharacters: number;
    incorrectCharacters: number;
  };
  timing: number;
};

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
    clearTyped,
    totalTyped,
    totalTypedCharacter,
    resetTotalTyped,
    keydownHandler,
  } = useTypings(state !== "finish");

  const [errors, setErrors] = useState(0);

  const [totalWordsGenerated, setTotalWordsGenerated] = useState<string>("");
  const [gameResults, setGameResults] = useState<GameResults>({
    wpmResult: {
      wpm: 0,
      correctWords: 0,
    },
    rawWpm: 0,
    typingMetrics: {
      accuracy: 0,
      correctCharacters: 0,
      incorrectCharacters: 0,
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
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setTotalWordsGenerated((prevTotalWordsGenerated) =>
        prevTotalWordsGenerated.concat(" ", words)
      );
    } else {
      isFirstRender.current = false;
    }
  }, [words]);

  // as soon the user start the first letters, we start

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // when the time is up, we've finished
  useEffect(() => {
    if (!timeLeft && state === "run") {
      console.log(`typed character ${totalTypedCharacter}`);
      console.log(`words character ${totalWordsGenerated}`);

      const typingMetrics = calculateTypingMetrics(
        totalTypedCharacter,
        totalWordsGenerated
      );
      const wpmResult = countWpm(
        totalTypedCharacter,
        totalWordsGenerated,
        countdownSeconds
      );
      const rawWpm = countRawWpm(
        totalTypedCharacter,
        totalWordsGenerated,
        countdownSeconds
      );

      setGameResults({
        wpmResult,
        rawWpm,
        typingMetrics,
        timing: countdownSeconds,
      });
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, state, sumErrors]);

  /**
   * when the current words are all filled up, we generate and show another set of words
   */

  useEffect(() => {
    if (areWordsFinished) {
      console.log(`typed ${typed}`);
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

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
    errors,
    restart,
    timeLeft,
    totalTyped,
    adjustTimer,
    gameResults,
    keydownHandler,
  };
};

export default useEngine;
