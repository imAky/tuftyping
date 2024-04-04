import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { MdDashboardCustomize, MdOutlineLogout } from "react-icons/md";

const NavList = ({ name, email }: { name: string; email: string }) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    signOut({ redirect: false });
  };
  return (
    <div className="absolute top-14 right-6 flex flex-col w-52 py-2  text-center   bg-[#292c36] text-gray-400 rounded-lg drop-shadow-2xl  ">
      <div className="flex flex-col px-4 text-center">
        <span className="my-1">Amit Kumar Yadav</span>
        <span className="my-1 mb-2 ">{email}</span>
      </div>
      <hr className="my-2 border-[#240a0aac]" />
      <Link
        href="/dashboard"
        className="flex items-center px-4 my-1 gap-2 hover:bg-[#343942] py-1"
      >
        <MdDashboardCustomize />
        Dashboard
      </Link>
      <button
        onClick={handleClick}
        className="flex items-center px-4 my-1 gap-2 hover:bg-[#343942] py-1"
      >
        <MdOutlineLogout />
        Logout
      </button>
    </div>
  );
};

export default NavList;
