import { getServerSession } from "next-auth";
import MainDashBoard from "../ui/dashboard/MainDashboard";
import SideNav from "../ui/dashboard/sidenav";
import { options } from "../api/auth/[...nextauth]/options";
import { fetchUserDetail } from "../lib/action";
import Link from "next/link";
import { Suspense } from "react";
import LineChartSkeleton from "../ui/dashboard/LineChartSkeleton";
import ChartWrapper from "../ui/dashboard/ChartWrapper";

export default async function DashBoard() {
  const session = await getServerSession(options);
  const userDetails = await fetchUserDetail();

  return (
    <div>
      {" "}
      <Suspense fallback={<LineChartSkeleton />}>
        <div className="bg-gray-800 p-4 drop-shadow-2xl rounded-md my-4">
          <ChartWrapper />
        </div>
      </Suspense>
    </div>
  );
}
