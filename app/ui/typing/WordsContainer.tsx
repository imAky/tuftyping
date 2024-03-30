import React, { KeyboardEventHandler, useRef, useEffect } from "react";

const WordsContainer = ({
  children,
  keydownHandler,
}: {
  children: React.ReactNode;
  keydownHandler: KeyboardEventHandler<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input element when the component mounts or updates
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle blur event to prevent input from losing focus
  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    keydownHandler(event);
  };

  return (
    <div
      className="relative bg-secondary-2 text-stone-400 p-8 w-11/12 rounded-lg shadow-md border-gray-300 outline-none focus:ring-0"
      tabIndex={0}
      onBlur={handleBlur} // Prevent input from losing focus
    >
      <input
        className="w-full h-full absolute inset-0 opacity-0 cursor-text"
        ref={inputRef}
        onKeyDown={handleKeydown}
      />
      <div className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
