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
        <div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-4 my-8 drop-shadow-2xl rounded-md ">
          <ChartWrapper />
        </div>
      </Suspense>
    </div>
  );
}
