import MainDashBoard from "../ui/dashboard/MainDashboard";
import SideNav from "../ui/dashboard/sidenav";

export default async function DashBoard() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <div className="flex  min-h-screen">
      <SideNav />
      <MainDashBoard />
    </div>
  );
}
