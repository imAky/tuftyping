import React, { KeyboardEventHandler, useRef, useEffect } from "react";

// Define the isMobile function outside of the component
const isMobile = () => {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  }
  return false; // Default to false if window or navigator is not available
};

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
    keydownHandler(event);
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
        className="w-full h-full absolute inset-0  cursor-text"
        ref={inputRef}
        onKeyDown={handleKeydown}
        onBlur={handleBlur} // Handle blur event
      />
      <div className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
