"use client";
import { RedeemUserPoints } from "@/app/lib/action";
import { ReProgress } from "../ReCom/ReCom";
import { useState } from "react";

export default function RedeemButton({
  isRedeem,
  prize,
}: {
  isRedeem: boolean;
  prize: string;
}) {
  const [redeeming, setRedeeming] = useState(false);

  const handleRedeem = async (e: any) => {
    e.preventDefault();
    console.log("clcikable");
    setRedeeming(true);

    await RedeemUserPoints(prize);
    setRedeeming(false);
  };
  console.log("isRedeem:", isRedeem);
  return (
    <button
      type="button"
      className={`bg-blue-700  w-48 p-2 rounded-lg text-slate-50 ${
        redeeming || !isRedeem ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={isRedeem ? handleRedeem : undefined}
      disabled={!isRedeem || redeeming}
    >
      {redeeming ? "Redeeming..." : "Redeem"}
    </button>
  );
}
