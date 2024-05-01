import TypingGame from "./ui/typing/TypingGame";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-grow justify-between overflow-y-hidden">
      <div className="hidden md:flex flex-col   items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4  ">
        <div className=""></div>
      </div>
      <div className="flex-grow mx-4 ">
        <TypingGame />
      </div>

      <div className="hidden md:flex flex-col  items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4 ">
        <div className=""></div>
      </div>
    </div>
  );
}
