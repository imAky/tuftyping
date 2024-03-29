import SideNav from "../ui/dashboard/sidenav";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideNav />
      <div>{children}</div>
    </div>
  );
}
