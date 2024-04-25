"use client";
import { RedeemUserPoints } from "@/app/lib/action";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

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
    setRedeeming(true);
    const { message } = await RedeemUserPoints(prize);
    alert(message);
    setRedeeming(false);
  };

  return (
    <button
      type="button"
      className={`bg-blue-700  w-48 p-3 rounded-lg text-slate-50 hover:bg-blue-600 ${
        !isRedeem ? "opacity-50 cursor-not-allowed" : ""
      } ${redeeming ? "cursor-not-allowed" : ""}`}
      onClick={isRedeem ? handleRedeem : undefined}
      disabled={!isRedeem || redeeming}
    >
      {redeeming ? (
        <ImSpinner8 className="animate-spin mx-auto h-6 w-6 " />
      ) : (
        "Redeem"
      )}
    </button>
  );
}
