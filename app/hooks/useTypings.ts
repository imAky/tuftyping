import { useCallback, useEffect, useRef, useState } from "react";
import { isKeyboardCodeAllowed } from "../utils/helpers";

const useTypings = (enabled: boolean) => {
  const [cursor, setCursor] = useState<number>(0);
  const [typed, setTyped] = useState<string>("");
  const [totalTypedCharacter, setTotalTypedCharacter] = useState<string>("");
  const [totalCorrChar, setTotalCorrChar] = useState<string>("");

  const keydownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key, code } = event;
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }
      console.log(`end : ${{ key, code }}`);
      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setTotalCorrChar((prev) => prev.slice(0, -1));
          setCursor((cursor) => cursor - 1);
          break;
        default:
          setTyped((prev) => prev.concat(key));
          setTotalCorrChar((prev) => prev.concat(key));
          setTotalTypedCharacter((prev) => prev.concat(key));
          setCursor((cursor) => cursor + 1);
      }
    },
    [enabled]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    setTotalCorrChar("");
    setTotalTypedCharacter("");
  }, []);

  return {
    typed,
    totalCorrChar,
    totalTypedCharacter,
    cursor,
    clearTyped,
    resetTotalTyped,
    keydownHandler,
  };
};

export default useTypings;
