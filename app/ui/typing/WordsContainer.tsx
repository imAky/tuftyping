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

  // Focus the input element initially on both desktop and mobile
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle click on the container for mobile focus
  const handleContainerClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile() && inputRef.current) {
      event.preventDefault(); // Prevent default click behavior
      inputRef.current.focus(); // Focus the input element
    }
  };

  // Handle keydown events
  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    keydownHandler(event);
  };

  // Handle blur event to maintain focus on the input
  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="relative bg-secondary-2 text-stone-400 p-8 w-11/12 rounded-lg shadow-md border-gray-300 outline-none focus:ring-0"
      tabIndex={0} // Allow keyboard navigation
      onClick={handleContainerClick} // Handle container click for mobile
    >
      <input
        className="w-full h-full absolute inset-0 cursor-text"
        ref={inputRef}
        onKeyDown={handleKeydown}
        onBlur={handleBlur} // Handle blur events
      />
      <div className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
