"use client";
import { DeleteUserAccount } from "@/app/lib/action";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

export default function Page() {
  const [user, setUser] = useState("");
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username = user.trim();
    setIsLoading(true);
    const { message } = await DeleteUserAccount(username);
    alert(message);
    setIsLoading(false);
    setUser("");
  };
  return (
    <div className="flex flex-col  my-16 mx-32 gap-8 border-4 p-4 border-emerald-400 items-start">
      <span className="bg-green-700 w-40 text-slate-200 text-center py-2">
        Manage User
      </span>
      <div>
        <form
          onSubmit={!loading ? handleSubmit : undefined}
          className="flex flex-col gap-4 sm:flex-row items-start"
        >
          <input
            className="h-12 w-64 bg-emerald-400 text-gray-900 text-2xl "
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <button
            className="mx-8 h-12 bg-green-700 px-4 text-slate-300 text-center  items-center text-xl"
            type="submit"
          >
            {loading ? (
              <ImSpinner8 className="animate-spin mx-auto h-6 w-6 text-slate-200" />
            ) : (
              "Delete"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
