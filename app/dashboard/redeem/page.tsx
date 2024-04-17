import { fetchUsertotalPoints } from "@/app/lib/action";
import ReedemCard from "@/app/ui/dashboard/ReedemCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRupeeSign } from "react-icons/fa";

export default async function Reedem() {
  const { totalPoints } = await fetchUsertotalPoints();
  return (
    <div className="flex flex-wrap items-start justify-center mx-4">
      <Link href="/dashboard/redeem/PayPal/50/cashout">
        <ReedemCard points={totalPoints} totalPoints={10000} prize={50} />
      </Link>
      <Link href="/dashboard/redeem/PayPal/100/cashout">
        <ReedemCard points={totalPoints} totalPoints={20000} prize={100} />
      </Link>
      <Link href="/dashboard/redeem/PayPal/200/cashout">
        <ReedemCard points={totalPoints} totalPoints={30000} prize={250} />
      </Link>
      <Link href="/dashboard/redeem/PayPal/500/cashout">
        <ReedemCard points={totalPoints} totalPoints={50000} prize={500} />
      </Link>
    </div>
  );
}
