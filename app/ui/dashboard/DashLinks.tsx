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
          pathname === "/dashboard"
            ? "bg-gradient-to-r from-red-700 to-rose-800 text-slate-300  hover:to-rose-900"
            : "border-2 border-slate-300 text-slate-300 "
        } w-32 text-center p-2 text-2xl  font-medium tracking-widest rounded-lg drop-shadow-2xl  `}
        scroll={false}
      >
        Score
      </Link>
      <Link
        href="/dashboard/redeem"
        className={`${
          pathname.startsWith("/dashboard/redeem")
            ? "bg-gradient-to-r from-red-700 to-rose-800 text-slate-300  hover:to-rose-900"
            : "border-2 border-slate-300 text-slate-300 "
        } w-32 text-center p-2 text-2xl  font-medium tracking-widest rounded-lg drop-shadow-2xl `}
        scroll={false}
      >
        Redeem
      </Link>
    </div>
  );
};

export default DashLink;
