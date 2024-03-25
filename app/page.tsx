import TypingGame from "./ui/typing/TypingGame";

const Home = () => {
  return (
    <div className="flex h-screen ">
      <div className="hidden sm:flex flex-col   items-center  w-1/5  h-full bg-gray-700 mr-4">
        <div className="">Leaderboard</div>
      </div>

      <TypingGame />

      <div className="hidden sm:flex flex-col justify-between items-center w-1/5 h-full bg-gray-700  ml-4">
        <div className="">Profile</div>
      </div>
    </div>
  );
};

export default Home;
