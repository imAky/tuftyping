import TypingGame from "../ui/typing/TypingGame";

export default function Contest() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-col   items-center   xl:w-1/6  lg:w-1/5 md:w-1/4  bg-gray-700 mr-4">
        <div className="">ContestInfo</div>
      </div>

      <TypingGame />

      <div className="hidden md:flex flex-col justify-between items-center  xl:w-1/6  lg:w-1/5 md:w-1/4 bg-gray-700  ml-4">
        <div className="">Leaderboard</div>
      </div>
    </div>
  );
}
