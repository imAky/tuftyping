import { Suspense } from "react";
import LineChartSkeleton from "../ui/dashboard/LineChartSkeleton";
import ChartWrapper from "../ui/dashboard/ChartWrapper";
import { resolve } from "path";

export default async function DashBoard() {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-4 my-8 drop-shadow-2xl rounded-md ">
        <ChartWrapper />
      </div>
    </div>
  );
}
