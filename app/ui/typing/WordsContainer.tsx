import { KeyboardEventHandler, useRef } from "react";

const WordsContainer = ({
  children,
  keydownHandler,
}: {
  children: React.ReactNode;
  keydownHandler: KeyboardEventHandler<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const hanldeContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      inputRef.current.focus();
    }
  };

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    keydownHandler(event);
  };

  return (
    <div
      className="bg-secondary-2 text-stone-400 p-8 w-11/12 rounded-lg shadow-md border-gray-300 outline-none focus:ring-0"
      tabIndex={0}
      onClick={hanldeContainerClick}
    >
      <input
        className="w-1 h-1 absolute inset-0 opacity-0 cursor-text"
        ref={inputRef}
        onKeyDown={handleKeydown}
      />
      <div
        style={{ pointerEvents: "none" }}
        className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all pointer-events: none" // Apply pointer-events: none here
      >
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
