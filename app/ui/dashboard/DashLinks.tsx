"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashLink = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center gap-4 mt-2 mb-4">
      <Link
        href="/dashboard"
        className={`${
          pathname === "/dashboard" ? "bg-red-700" : ""
        } w-32 text-center text-yellow-400 p-2 text-xl rounded-md tracking-wide hover:bg-red-800`}
        scroll={false}
      >
        Score
      </Link>
      <Link
        href="/dashboard/redeem"
        className={`${
          pathname === "/dashboard/redeem" ? "bg-red-700" : ""
        } w-32 text-center text-yellow-400 p-2 text-xl rounded-md tracking-wide hover:bg-red-800`}
        scroll={false}
      >
        Redeem
      </Link>
    </div>
  );
};

export default DashLink;
