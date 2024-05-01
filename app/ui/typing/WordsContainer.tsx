import React, { KeyboardEventHandler, useRef, useEffect } from "react";
import { isMobile } from "@/app/utils/helpers";

const WordsContainer = ({
  children,
  keydownHandler,
}: {
  children: React.ReactNode;
  keydownHandler: KeyboardEventHandler<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isMobile() && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleContainerClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile() && inputRef.current) {
      event?.preventDefault();
      inputRef.current.focus();
    }
  };

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (!isMobile()) {
      keydownHandler(event);
    }
  };
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (isMobile()) {
      const input = event.target as HTMLInputElement;
      const currentValue = input.value;

      if (currentValue.length === 0) {
        keydownHandler({
          key: "Backspace",
          code: "Backspace",
          nativeEvent: event.nativeEvent,
        } as React.KeyboardEvent<HTMLInputElement>);
        return;
      }

      const previousValue = input.getAttribute("data-previous-value") || "";
      input.setAttribute("data-previous-value", currentValue);

      if (currentValue.length < previousValue.length) {
        keydownHandler({
          key: "Backspace",
          code: "Backspace",
          nativeEvent: event.nativeEvent,
        } as React.KeyboardEvent<HTMLInputElement>);
      } else {
        const key = currentValue.slice(-1);
        let code = "";
        if (key === " ") {
          code = "Space";
        } else if (!isNaN(parseInt(key))) {
          code = "Digit" + key;
        } else {
          code = "Key" + key.toUpperCase();
        }
        const syntheticEvent = {
          key,
          code,
          nativeEvent: event.nativeEvent,
        };
        keydownHandler(syntheticEvent as React.KeyboardEvent<HTMLInputElement>);
      }
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="relative w-full  bg-gray-800 text-slate-500 drop-shadow-2xl p-6  rounded-lg shadow-2xl border-gray-300 outline-none focus:ring-0 mx-2"
      tabIndex={0}
      onClick={handleContainerClick}
    >
      <input
        className="w-full h-full absolute inset-0  cursor-text opacity-0"
        ref={inputRef}
        readOnly={!isMobile()}
        onKeyDown={!isMobile() ? handleKeydown : undefined}
        onInput={isMobile() ? handleInput : undefined}
        onBlur={handleBlur}
      />
      <div>{children}</div>
    </div>
  );
};

export default WordsContainer;
