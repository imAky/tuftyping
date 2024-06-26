import { useCallback, useEffect, useRef, useState } from "react";
import { isKeyboardCodeAllowed } from "../utils/helpers";

const useTypings = (enabled: boolean) => {
  const [cursor, setCursor] = useState<number>(0);
  const [typed, setTyped] = useState<string>("");
  const [totalTypedCharacter, setTotalTypedCharacter] = useState<string>("");
  const totalTyped = useRef(0);

  const keydownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key, code } = event;
      console.log(`begin : ${{ key, code }}`);
      console.log(event);
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }
      console.log(`end : ${{ key, code }}`);
      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setCursor((cursor) => cursor - 1);
          totalTyped.current -= 1;
          break;
        default:
          setTyped((prev) => prev.concat(key));
          setTotalTypedCharacter((prev) => prev.concat(key));
          setCursor((cursor) => cursor + 1);
          totalTyped.current += 1;
      }
    },
    [enabled]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0;
    setTotalTypedCharacter("");
  }, []);

  return {
    typed,
    totalTypedCharacter,
    cursor,
    clearTyped,
    resetTotalTyped,
    totalTyped: totalTyped.current,
    keydownHandler,
  };
};

export default useTypings;
