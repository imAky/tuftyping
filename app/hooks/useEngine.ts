import { useCallback, useEffect, useRef, useState } from "react";
import { countErrors, isMobile } from "../utils/helpers";
import useCountdown from "./useCountdown";
import useTypings from "./useTypings";
import useWords from "./useWords";
import { gameResult } from "../utils/results";
import { GameResult } from "../lib/definition";

export type State = "start" | "run" | "finish";

const useEngine = (initialCountSeconds: number = 30) => {
  const [state, setState] = useState<State>("start");
  const [isLoadingResuts, setIsLoadingResults] = useState(false);
  const wordsRef = useRef(null);

  const [countdownSeconds, setCountdownSeconds] =
    useState<number>(initialCountSeconds);

  const { timeLeft, startCountdown, resetCountdown } =
    useCountdown(countdownSeconds);
  const { words, updateWords } = useWords(isMobile() ? 5 : 30); // related

  const {
    cursor,
    typed,
    totalCorrChar,
    clearTyped,
    totalTypedCharacter,
    resetTotalTyped,
    keydownHandler,
  } = useTypings(state !== "finish", wordsRef, words);

  const [totalWordsGenerated, setTotalWordsGenerated] = useState<string>("");
  const [gameResults, setGameResults] = useState<GameResult>({
    wpm: 0,
    rawWpm: 0,
    acc: 0,
    corrWords: 0,
    corrChar: 0,
    incorrChar: 0,
    errMod: 0,
    tolType: 0,
    timing: 0,
    point: 0,
  });
  const isFirstRender = useRef(true);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;
  if (areWordsFinished) console.log("cursen", cursor, "words", words.length);

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
      setIsLoadingResults(true);
      setState("finish");
      const calculateResult = async () => {
        try {
          const gameresult = await gameResult(
            totalCorrChar,
            totalTypedCharacter,
            totalWordsGenerated,
            countdownSeconds
          );
          console.log("totalChar", totalCorrChar);
          console.log("totalTypedChar", totalTypedCharacter);
          console.log("totalWordsGenerated", totalWordsGenerated);
          console.log("countdownSeconds", countdownSeconds);
          setGameResults(gameresult);
        } catch (error) {
          console.error("Error calculating results", error);
        } finally {
          setIsLoadingResults(false);
        }
      };
      calculateResult();
    }
  }, [timeLeft, state]);

  /**
   * when the current words are all filled up, we generate and show another set of words
   */

  useEffect(() => {
    if (areWordsFinished) {
      if (areWordsFinished) console.log("words", cursor, "words", words.length);
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

    restart,
    timeLeft,
    isLoadingResuts,
    wordsRef,

    adjustTimer,
    gameResults,
    keydownHandler,
  };
};

export default useEngine;
