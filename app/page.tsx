import { getServerSession } from "next-auth";
import TypingGame from "./ui/typing/TypingGame";
import { options } from "./api/auth/[...nextauth]/options";
import dynamic from "next/dynamic";
import { Spinner2 } from "./ui/component/Spinner";
// const NoSSRTyping = dynamic(() => import("@/app/ui/typing/TypingGame"), {
//   ssr: false,
//   loading: () => <Spinner2 />,
// });

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-grow justify-between overflow-y-hidden">
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
}
