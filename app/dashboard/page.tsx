import SideNav from "../ui/dashboard/sidenav";

export default async function DashBoard() {
  return (
    <div className="flex  h-screen">
      <SideNav />
      <div className=" flex-grow bg-slate-50">Center</div>
    </div>
  );
}
