import { KeyboardEventHandler, useRef } from "react";

const WordsContainer = ({
  children,
  keydownHandler,
}: {
  children: React.ReactNode;
  keydownHandler: KeyboardEventHandler<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    keydownHandler(event);
  };

  const isMobile = () => {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  };

  return (
    <div
      className="relative bg-secondary-2 text-stone-400 p-8 w-11/12 rounded-lg shadow-md border-gray-300 outline-none focus:ring-0"
      tabIndex={0}
      onClick={isMobile() ? handleContainerClick : undefined}
    >
      <input
        className="w-full h-full absolute inset-0 opacity-0 cursor-text"
        ref={inputRef}
        onKeyDown={handleKeydown}
        autoFocus={!isMobile()} // Autofocus only if not on a mobile device
      />
      <div className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
