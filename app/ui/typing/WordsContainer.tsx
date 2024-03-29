const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="bg-secondary-2 text-stone-400 p-8 w-11/12 rounded-lg shadow-md  border-gray-300 "
      tabIndex={0}
    >
      <div className="relative text-2xl tracking-wider max-w-5xl leading-relaxed break-all   ">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
