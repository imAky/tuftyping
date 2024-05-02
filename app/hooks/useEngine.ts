import { useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "../utils/helpers";
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
  const { words, updateWords } = useWords(isMobile() ? 5 : 30);
  let isAdsOn = true;
  const {
    cursor,
    typed,
    totalCorrChar,
    clearTyped,
    typeError,
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
    inCorrWords: 0,
    correctTypeChar: 0,
    incorrectTypeChar: 0,
    corrChar: 0,
    incorrChar: 0,
    cpm: 0,
    timing: 0,
    point: 0,
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
      setTotalWordsGenerated(words);
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

      const calculateResult = async () => {
        const gameresult = await gameResult(
          isAdsOn,
          typeError,
          totalCorrChar,
          totalTypedCharacter,
          totalWordsGenerated,
          countdownSeconds
        );

        setGameResults(gameresult);
        setIsLoadingResults(false);
        setState("finish");
      };
      calculateResult();
    }
  }, [timeLeft, state]);

  useEffect(() => {
    if (areWordsFinished) {
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
