import { getServerSession } from "next-auth";
import LeaderBox from "../ui/Leaderboard/LeaderBox";
import { options } from "../api/auth/[...nextauth]/options";

export default function LeaderBoard() {
  return (
    <div className="flex min-h-screen flex-grow justify-between overflow-y-hidden">
      <div className="hidden md:flex flex-col   items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4  bg-gray-700 mr-4">
        <div className="">Advertisement 1</div>
      </div>
      <div className=" max-w-4xl flex-grow bg-gray-700   h-[800px] overflow-y-auto">
        <LeaderBox />
      </div>

      <div className="hidden md:flex flex-col justify-between items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4 bg-gray-700  ml-4">
        <div className="">Advertisement 2</div>
      </div>
    </div>
  );
}
