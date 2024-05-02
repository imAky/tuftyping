import { Metadata } from "next";
import LeaderBox from "../ui/Leaderboard/LeaderBox";

export const metadata: Metadata = {
  title: "LeaderBoard",
};

export default async function LeaderBoard() {
  return (
    <div className="flex min-h-screen flex-grow justify-between overflow-y-hidden">
      <div className="hidden md:flex flex-col   items-center   xl:w-[200px]  lg:w-1/5 md:w-1/5 ">
        <div className=""></div>
      </div>

      <div className="max-w-4xl flex-grow h-[800px] overflow-y-auto sm:mx-4">
        <LeaderBox />
      </div>

      <div className="hidden md:flex flex-col  items-center   xl:w-[200px]  lg:w-1/5 md:w-1/5 ">
        <div className=""></div>
      </div>
    </div>
  );
}
