import { FaBolt, FaLightbulb, FaPercent } from "react-icons/fa";
import DashCard from "./DashCard";
import { BiSolidCoinStack } from "react-icons/bi";
import LineChart from "@/app/ui/dashboard/LineChart";
import { Suspense } from "react";
import ChartWrapper from "./ChartWrapper";
import { Spinner, Spinner2 } from "../component/Spinner";
import DashCardWrapper from "./DashCardWrapper";
import Dashskeleton from "./Dashskeleton";
import LineChartSkeleton from "./LineChartSkeleton";
import { Session } from "next-auth";
import Link from "next/link";

interface MainDashProps {
  userDetails: {
    maxWpm: number;
    totalPoints: number;
    totalMatches: number;
    todayPoints: number;
  };
  session: any;
}

export default function MainDashBoard({ userDetails, session }: MainDashProps) {
  console.log(session);
  return (
    <div className="flex flex-col min-h-screen items-center flex-grow bg-[#a0e4ed]">
      <div className=" my-6  items-center w-11/12">
        <div className="flex items-center gap-4 mb-10">
          <span className="text-black  text-xl font-semibold tracking-wide underline decoration-4 decoration-yellow-600 underline-offset-8 capitalize">
            Hi {session?.user?.name}
          </span>
          <Link href="/dashboard/redeem">Reedem Points</Link>
          <span className="text-black  text-xl font-semibold tracking-wide underline decoration-4 decoration-yellow-600 underline-offset-8 capitalize"></span>
        </div>

        <div className="flex justify-center gap-4  flex-wrap mb-16 ">
          <DashCardWrapper userDetails={userDetails} />
        </div>

        <Suspense fallback={<LineChartSkeleton />}>
          <div className="">
            <ChartWrapper />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
