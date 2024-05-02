import type { Metadata } from "next";

import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchUserDetail } from "../lib/action";
import DashNav from "../ui/dashboard/DashNav";
import DashCardWrapper from "../ui/dashboard/DashCardWrapper";
import DashLink from "../ui/dashboard/DashLinks";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: any = await getServerSession(options);
  let userDetails;
  if (session) {
    userDetails = await fetchUserDetail();
  } else {
    redirect("/");
  }

  return (
    <div className="flex flex-col  min-h-screen md:mx-48 mx-4">
      <DashNav
        image={session?.user?.image}
        name={session?.user?.name}
        username={session?.user?.username}
        email={session?.user?.email}
        totalDuration={userDetails?.totalDuration}
        registrationDate={userDetails?.registrationDate}
      />

      <div className="flex justify-evenly flex-wrap mt-8 mb-8 gap-2 gap-y-6 bg-gradient-to-r from-indigo-800 to-blue-900 p-8 drop-shadow-2xl rounded-md">
        {userDetails && (
          <DashCardWrapper
            totalPoints={userDetails.totalPoints}
            todayPoints={userDetails.todayPoints}
            maxWpm={userDetails.maxWpm}
            totalMatches={userDetails.totalMatches}
            totalEarning={userDetails.totalEarning}
          />
        )}
      </div>
      <DashLink />

      <main>{children}</main>
    </div>
  );
}
