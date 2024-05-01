"use client";

import { ProcessTransaction } from "@/app/lib/admin";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
interface TransButtonProps {
  transactionId: string;
  userId: string;
  prize: number;
}

export default function TransactionButton({
  transactionId,
  userId,
  prize,
}: TransButtonProps) {
  const [loading, setIsLoading] = useState(false);
  const handleTransaction = async () => {
    setIsLoading(true);
    const { message } = await ProcessTransaction(transactionId, userId, prize);
    setIsLoading(false);
    alert(message);
  };
  return (
    <button
      className="bg-blue-500 py-2 px-4  hover:bg-blue-400 text-3xl"
      onClick={handleTransaction}
    >
      {loading ? <ImSpinner8 className="h-10 w-6 animate-spin" /> : "+"}
    </button>
  );
}
