"use client";

import { DeleteUserAccount } from "@/app/lib/action";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

export default function DeleteButton() {
  const [loading, setIsLoadig] = useState(false);
  const router = useRouter();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    const res = prompt(
      "Are you sure you want to do this ? If yes then, type delete my account below:"
    );
    const isConform = res?.trim() === "delete my account";

    if (isConform) {
      setIsLoadig(true);
      const { message } = await DeleteUserAccount();
      alert(message);
      signOut({ redirect: false });
      router.push("/");
    }

    setIsLoadig(false);
  };
  return (
    <div>
      <button
        className={`bg-gray-800 text-red-600 p-3 w-64 font-semibold rounded-xl  tracking-wider mt-4 mb-8 hover:bg-red-600 hover:text-slate-200 ${
          loading ? "cursor-not-allowed" : ""
        }`}
        onClick={!loading ? handleDelete : undefined}
      >
        {loading ? (
          <ImSpinner8 className="animate-spin mx-auto h-6 w-6 text-slate-200" />
        ) : (
          "Delete your account"
        )}
      </button>
    </div>
  );
}
