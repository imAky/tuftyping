"use client";
import Link from "next/link";
import { FaKeyboard, FaCrown } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { useParams, usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between item-center  w-full  py-4 px-8   shadow-xl rounded-b-md z-20 bg-primary">
      <div className="flex items-center space-x-8 ">
        <Link
          href="/"
          className="text-yellow-500 sm:text-4xl text-2xl font-bold tracking-wide"
        >
          typechamp
        </Link>
        <Link
          href="/"
          className={`${
            pathname === "/" && "border-b-4 border-yellow-400"
          } p-1`}
        >
          <FaKeyboard className="h-5 w-5" />
        </Link>
        <Link
          href="/contest"
          className={`${
            pathname.startsWith("/contest") && "border-b-4 border-yellow-400"
          } p-1`}
        >
          <IoLogoGameControllerB className="h-5 w-5" />
        </Link>
        <Link
          href="/leaderboard"
          className={`${
            pathname.startsWith("/leaderboard") &&
            "border-b-4 border-yellow-400"
          } p-1`}
        >
          <FaCrown className="h-5 w-5" />
        </Link>
      </div>
      <div className="flex items-center space-x-8 ">
        <div className="">
          <HiSpeakerWave className="h-5 w-5" />
        </div>
        <div>
          <Link href="/dashboard" className="">
            <CgProfile className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
