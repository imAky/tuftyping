import {
  fetchUserByUsername,
  fetchUserScoreByUsername,
} from "@/app/lib/action";
import ChartWrapper from "@/app/ui/dashboard/ChartWrapper";
import DashCardWrapper from "@/app/ui/dashboard/DashCardWrapper";
import DashNav from "@/app/ui/dashboard/DashNav";
import LineChartSkeleton from "@/app/ui/dashboard/LineChartSkeleton";
import ProfileChartWrapper from "@/app/ui/dashboard/ProfileChartWrapper";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const userDetails: any = await fetchUserByUsername(params.username);

  return (
    <div className="flex flex-col  min-h-screen md:mx-48 mx-4">
      <DashNav
        image={userDetails.image}
        name={userDetails.name}
        username={params.username}
        totalMatches={userDetails?.totalMatches}
        totalDuration={userDetails?.totalDuration}
        registrationDate={userDetails?.registrationDate}
      />
      <div className="flex justify-evenly flex-wrap my-16 gap-8 bg-gradient-to-r from-indigo-800 to-blue-900 p-8 drop-shadow-2xl rounded-md">
        {userDetails && (
          <DashCardWrapper
            totalPoints={userDetails.totalPoints}
            todayPoints={userDetails.todayPoints}
            maxWpm={userDetails.maxWpm}
            totalMatches={userDetails.totalMatches}
          />
        )}
      </div>

      <Suspense fallback={<LineChartSkeleton />}>
        <div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-4 my-8 drop-shadow-2xl rounded-md ">
          <ProfileChartWrapper username={params.username} />
        </div>
      </Suspense>
    </div>
  );
}
