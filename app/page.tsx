import TypingGame from "./ui/typing/TypingGame";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden  fixed top-0 left-0  bottom-0  z-10 flex-col items-center  w-1/5  h-full bg-gray-700">
        <div className="mt-20">LeaderBoard</div>
      </div>

      <TypingGame />

      <div className="hidden  flex-col  fixed right-0 bottom-0 top-0 z-10 justify-between items-center w-1/5  bg-gray-700 h-full ">
        <div className="mt-20">Profile</div>
      </div>
    </div>
  );
};

export default Home;
