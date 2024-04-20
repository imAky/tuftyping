import Image from "next/image";
import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { ReProgress } from "./ReCom/ReCom";

const ReedemCard = ({
  points,
  totalPoints,
  prize,
}: {
  points: number;
  totalPoints: number;
  prize: number;
}) => {
  const progressPercentage = (points / totalPoints) * 100;
  return (
    <div className="flex w-80 h-96 flex-col mx-8 my-8 bg-slate-100 items-center  rounded-lg  drop-shadow-md hover:drop-shadow-2xl transition duration-300 ">
      <div className="bg-slate-300  inline-block p-16 rounded-lg">
        <Image
          src="/img/paypal.svg"
          alt="paypal-logo"
          width={198}
          height={128}
        />
      </div>

      <div className="flex gap-2 items-center mt-4 mb-8 text-xl font-medium text-black tracking-wider">
        PayPal{" "}
        <span className="flex items-center">
          <FaRupeeSign className="h-4 w-4" />
          <span>{prize}</span>
        </span>
      </div>

      <div className="my-4 text-blue-900 font-medium">
        {points} of {totalPoints} points
      </div>

      <ReProgress progressPercentage={progressPercentage} />
    </div>
  );
};

export default ReedemCard;
