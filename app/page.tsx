import TypingGame from "./ui/typing/TypingGame";

const Home = () => {
  return (
    <div className="flex h-full flex-grow justify-center">
      <div className="hidden md:flex flex-col   items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4  bg-gray-700 mr-4">
        <div className="">Advertisement 1</div>
      </div>
      <div>
        <TypingGame />
      </div>

      <div className="hidden md:flex flex-col justify-between items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4 bg-gray-700  ml-4">
        <div className="">Advertisement 2</div>
      </div>
    </div>
  );
};

export default Home;
