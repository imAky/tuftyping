import Link from "next/link";
import { signOut } from "next-auth/react";
import { MdDashboardCustomize, MdOutlineLogout } from "react-icons/md";
import { useRouter } from "next/navigation";

const NavList = ({ name, username }: { name: string; username: string }) => {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
    signOut({ redirect: false });
    router.push("/");
  };
  return (
    <div className="absolute top-14 right-6 flex flex-col max-w-72 py-4 text-center   bg-[#292c36] text-gray-400 rounded-lg drop-shadow-2xl  overflow-clip  ">
      <div className="flex flex-col px-8  text-sm  text-center">
        <span className="my-1 overflow-wrap break-word px-8">{name}</span>
        <span className="my-1 mb-2 overflow-wrap break-word">@{username}</span>
      </div>
      <hr className="my-2 border-[#240a0aac]" />
      <Link
        href="/dashboard"
        className="flex items-center px-6 my-1 gap-2 hover:bg-[#343942] py-2"
      >
        <MdDashboardCustomize />
        Dashboard
      </Link>
      <button
        onClick={handleClick}
        className="flex items-center px-6 my-1 gap-2 hover:bg-[#343942] py-2"
      >
        <MdOutlineLogout />
        Logout
      </button>
    </div>
  );
};

export default NavList;
