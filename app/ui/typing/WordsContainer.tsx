import { useRef } from "react";

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleFocus = () => {
    containerRef.current?.focus();
  };

  return (
    <div
      className="bg-secondary-2 text-stone-400 p-8 w-11/12 rounded-lg shadow-md  border-gray-300 "
      tabIndex={0}
      contentEditable
      onClick={handleFocus}
    >
      <div className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all   ">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
