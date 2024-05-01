import { Suspense } from "react";
import ChartWrapper from "../ui/dashboard/ChartWrapper";
import DeleteButton from "../ui/dashboard/DeleteButton";
import LineChartSkeleton from "../ui/dashboard/LineChartSkeleton";

export default async function DashBoard() {
  return (
    <div>
      <Suspense fallback={<LineChartSkeleton />}>
        <div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-4 my-8 drop-shadow-2xl rounded-md ">
          <ChartWrapper />
        </div>
      </Suspense>
      <DeleteButton />
    </div>
  );
}
