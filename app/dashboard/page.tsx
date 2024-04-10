import { getServerSession } from "next-auth";
import MainDashBoard from "../ui/dashboard/MainDashboard";
import SideNav from "../ui/dashboard/sidenav";
import { options } from "../api/auth/[...nextauth]/options";
import { fetchUserDetail } from "../lib/action";

export default async function DashBoard() {
  const session = await getServerSession(options);
  const userDetails = await fetchUserDetail();

  return (
    <div className="flex  min-h-screen">
      <SideNav user={session?.user} />
      <MainDashBoard userDetails={userDetails} />
    </div>
  );
}
