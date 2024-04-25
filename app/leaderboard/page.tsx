import { getServerSession } from "next-auth";
import LeaderBox from "../ui/Leaderboard/LeaderBox";
import { options } from "../api/auth/[...nextauth]/options";

export default async function LeaderBoard() {
  return (
    <div className="flex min-h-screen flex-grow justify-between overflow-y-hidden">
      <div className="hidden md:flex flex-col   items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4 ">
        <div className=""></div>
      </div>
      <div className="max-w-4xl flex-grow    h-[800px] overflow-y-auto mx-4">
        <LeaderBox />
      </div>

      <div className="hidden md:flex flex-col  items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4 ">
        <div className=""></div>
      </div>
    </div>
  );
}
