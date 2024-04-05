import { FaUserCircle } from "react-icons/fa";

export default function SideNav() {
  return (
    <div className="flex flex-col items-center  min-h-full w-64 bg-[#33394be8] py-4 drop-shadow-2xl">
      <div>
        <FaUserCircle className="h-24 w-24" />
      </div>
      <div className="flex flex-col items-center space-y-2 text-slate-200 ">
        <span className="mt-4 text-left">Amit Kumar Yadav</span>
        <span className="text-sm text-left">AKY123@gmail.com</span>
      </div>
    </div>
  );
}
