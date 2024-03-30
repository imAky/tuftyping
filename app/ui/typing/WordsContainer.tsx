import React, { KeyboardEventHandler, useRef, useEffect } from "react";

// Define the isMobile function outside of the component
const isMobile = () => {
  const userAgent = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
};

const WordsContainer = ({
  children,
  keydownHandler,
}: {
  children: React.ReactNode;
  keydownHandler: KeyboardEventHandler<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input element on mobile devices using autoFocus
  // This is generally the recommended approach.
  useEffect(() => {
    if (isMobile() && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobile]);

  // Function to handle click on the container
  // Prevent default behavior to allow focus on the input field (fallback)
  const handleContainerClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile() && inputRef.current) {
      event.preventDefault();
    }
  };

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    keydownHandler(event);
  };

  // Function to handle blur event on the input
  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Maintain focus on input
    }
  };

  return (
    <div
      className="relative bg-secondary-2 text-stone-400 p-8 w-11/12 rounded-lg shadow-md border-gray-300 outline-none focus:ring-0"
      tabIndex={0} // Allow keyboard navigation
      onClick={handleContainerClick}
    >
      <input
        className="w-full h-full absolute inset-0 opacity-0 cursor-text"
        ref={inputRef}
        onKeyDown={handleKeydown}
        onBlur={handleBlur}
        autoFocus // Add autoFocus for mobile focus handling
      />
      <div className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
