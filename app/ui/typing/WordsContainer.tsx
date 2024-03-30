import React, { KeyboardEventHandler, useRef, useEffect } from "react";
import { isMobile } from "@/app/utils/helpers";

// Define the isMobile function outside of the component

const WordsContainer = ({
  children,
  keydownHandler,
}: {
  children: React.ReactNode;
  keydownHandler: KeyboardEventHandler<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input element when the component mounts or updates,
  // but only if it's not a mobile device
  useEffect(() => {
    if (!isMobile() && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Function to handle click on the container
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

      // If the input length is 0 and backspace is pressed, treat it as a backspace key
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

      // Check if the length of the current value is less than the previous value
      if (currentValue.length < previousValue.length) {
        // If so, it indicates that the backspace key was pressed
        keydownHandler({
          key: "Backspace",
          code: "Backspace",
          nativeEvent: event.nativeEvent,
        } as React.KeyboardEvent<HTMLInputElement>);
      } else {
        // Otherwise, treat it as a regular character input
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

  // Function to handle blur event on the input
  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="relative bg-secondary-2 text-stone-400 p-8 w-11/12 rounded-lg shadow-md border-gray-300 outline-none focus:ring-0"
      tabIndex={0}
      onClick={handleContainerClick} // Always attach handleContainerClick
    >
      <input
        className="w-full h-full absolute inset-0  cursor-text opacity-0"
        ref={inputRef}
        readOnly={!isMobile()}
        onKeyDown={!isMobile() ? handleKeydown : undefined}
        onInput={isMobile() ? handleInput : undefined}
        onBlur={handleBlur} // Handle blur event
      />
      <div className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
