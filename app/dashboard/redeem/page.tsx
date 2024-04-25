import { fetchUsertotalPoints } from "@/app/lib/action";
import ReedemCard from "@/app/ui/dashboard/ReedemCard";
import Link from "next/link";
import React from "react";
import { requiredPointsMap } from "@/app/utils/helpers";

export default async function Reedem() {
  const { totalPoints } = await fetchUsertotalPoints();

  return (
    <div className="flex flex-wrap items-start justify-center mx-4">
      {Object.entries(requiredPointsMap).map(([prize, requiredPoints]) => (
        <Link key={prize} href={`/dashboard/redeem/PayPal/${prize}/cashout`}>
          <ReedemCard
            points={totalPoints}
            totalPoints={requiredPoints}
            prize={parseInt(prize)}
          />
        </Link>
      ))}
    </div>
  );
}
