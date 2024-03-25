const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-md mx-4 border-gray-300">
      <div className="relative text-3xl tracking-wider max-w-3xl leading-relaxed break-all mt-3  ">
        {children}
      </div>
    </div>
  );
};

export default WordsContainer;
