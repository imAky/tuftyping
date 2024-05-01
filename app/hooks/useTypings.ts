import { useCallback, useEffect, useState } from "react";
import { isKeyboardCodeAllowed } from "../utils/helpers";
import { useSound } from "@/app/context/typing/SoundContext";
const useTypings = (enabled: boolean, wordsRef: any, words: string) => {
  const [typed, setTyped] = useState<string>("");
  const [cursor, setCursor] = useState(0);
  const [backspacePressed, setBackspacePressed] = useState(false);
  const [totalTypedCharacter, setTotalTypedCharacter] = useState<string>("");
  const [totalCorrChar, setTotalCorrChar] = useState<string>("");
  const [typeError, setTypeError] = useState(0);
  const { isMuted } = useSound();

  const isCorrect = cursor > 0 && typed[cursor - 1] === words[cursor - 1];

  const keydownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key, code } = event;
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }
      if (key === " ") {
        event.preventDefault();
      }
      if (!isMuted) {
        const audio = new Audio("/sounds/cherry.wav");
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }

      switch (key) {
        case "Backspace":
          if (cursor > 0) {
            setCursor((cursor) => cursor - 1);
          }
          setBackspacePressed(true);
          setTyped((prev) => prev.slice(0, -1));
          setTotalCorrChar((prev) => prev.slice(0, -1));
          break;
        default:
          const expectedSpace = cursor > 0 && words[cursor] === " ";
          if (expectedSpace && key !== " ") {
            return;
          }
          setCursor((cursor) => cursor + 1);
          setTyped((prev) => prev.concat(key));
          setTotalTypedCharacter((prev) => prev.concat(key));
          setTotalCorrChar((prev) => prev.concat(key));
      }
    },
    [enabled, cursor]
  );

  const clearTyped = useCallback(() => {
    setTotalCorrChar((prev) => prev.concat(" "));
    setTotalTypedCharacter((prev) => prev.concat(" "));
    setTyped("");
    setCursor(0);
    wordsRef.current = null;
  }, []);

  const resetTotalTyped = useCallback(() => {
    setTotalCorrChar("");
    setTotalTypedCharacter("");
    setTypeError(0);
  }, []);

  useEffect(() => {
    if (!wordsRef?.current) return;
    const wordsContainer = wordsRef.current;

    const wordSpans = wordsContainer.querySelectorAll(".char");

    const updateCharacterColorAndCaret = () => {
      if (cursor >= 0 && cursor <= wordSpans.length) {
        const selectedSpan = wordSpans[cursor - 1];
        const nextSpan = wordSpans[cursor];

        if (selectedSpan) {
          if (!backspacePressed) {
            if (isCorrect) {
              selectedSpan.classList.add("correct");
            } else {
              setTypeError((prev) => prev + 1);
              selectedSpan.classList.add("incorrect");
            }
          }
        }

        if (nextSpan) {
          if (backspacePressed) {
            if (nextSpan.classList.contains("correct")) {
              nextSpan.classList.remove("correct");
            }
            if (nextSpan.classList.contains("incorrect")) {
              nextSpan.classList.remove("incorrect");
            }
            setBackspacePressed(false);
          }
          const nextSpanRect = nextSpan.getBoundingClientRect();
          if (nextSpanRect) {
            const topPosition =
              nextSpanRect.top - wordsContainer.getBoundingClientRect().top;
            const leftPosition =
              nextSpanRect.left - wordsContainer.getBoundingClientRect().left;

            wordsContainer.querySelector(".caret").style.left = `${
              leftPosition - 10
            }px`;
            wordsContainer.querySelector(".caret").style.top = `${
              topPosition - 15
            }px`;
          }
        }
      }
    };

    updateCharacterColorAndCaret();
  }, [typed, wordsRef, cursor]);

  return {
    typed,
    totalCorrChar,
    totalTypedCharacter,
    cursor,
    typeError,
    clearTyped,
    resetTotalTyped,
    keydownHandler,
  };
};

export default useTypings;
