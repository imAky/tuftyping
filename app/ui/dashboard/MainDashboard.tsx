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

export default function MainDashBoard() {
  return (
    <div className="flex flex-col min-h-screen items-center flex-grow bg-[#a0e4ed]">
      <div className=" my-6  items-center w-11/12">
        <div className="mb-10">
          <span className="text-black  text-xl font-semibold tracking-wide underline decoration-4 decoration-yellow-600 underline-offset-8 capitalize">
            dashboard User
          </span>
        </div>
        <Suspense fallback={<Dashskeleton />}>
          <div className="flex justify-between flex-wrap mb-16 ">
            <DashCardWrapper />
          </div>
        </Suspense>

        <Suspense fallback={<LineChartSkeleton />}>
          <div className="">
            <ChartWrapper />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
