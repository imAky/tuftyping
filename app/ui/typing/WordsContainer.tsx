import { useRef } from "react";

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="bg-secondary-2 text-stone-400 p-8 w-11/12 rounded-lg shadow-md border-gray-300 outline-none focus:ring-0"
      tabIndex={0}
      onClick={handleFocus}
    >
      <input
        className="w-full h-full absolute inset-0 opacity-0 cursor-text"
        ref={inputRef}
      />
      <div className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
