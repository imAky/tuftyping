"use client";
import { fetchLeaderBoard } from "@/app/lib/action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
export default function LeaderBox() {
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const session: any = useSession();
  const router = useRouter();

  const currentUser = session?.data?.user?.username;

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const newLeaderboard: any = await fetchLeaderBoard(pageNumber);
        if (newLeaderboard.length === 0) {
          setAllDataFetched(true);
        }
        if (initialLoad) {
          setLeaderboard(newLeaderboard);
          setInitialLoad(false);
        } else {
          setLeaderboard((prevLeaderboard: any) => [
            ...prevLeaderboard,
            ...newLeaderboard,
          ]);
        }
      } catch (err: any) {
        alert(err.message);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }

    if (!allDataFetched) {
      loadLeaderboard();
    }
  }, [pageNumber, allDataFetched]);

  function handleScroll() {
    const container = containerRef.current;
    if (!container) return;
    const bottomOfWindow = container.scrollTop + container.clientHeight;
    const bottomOfDocument = container.scrollHeight;

    if (
      bottomOfDocument - bottomOfWindow <= 100 &&
      !loading &&
      !allDataFetched
    ) {
      setLoading(true);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="overflow-x-auto h-full rounded-3xl drop-shadow-2xl"
      ref={containerRef}
    >
      <table className="w-full border-collapse text-xl rounded-lg">
        <thead className="text-left sticky top-0 table-auto">
          <tr className="bg-gray-900 text-slate-50 ">
            <th className="p-4 font-light text-2xl  tracking-wider ">#</th>
            <th className="p-4 font-light text-2xl tracking-wider ">users</th>
            <th className="p-4 font-light text-2xl  tracking-wider">wpm</th>
            <th className="p-4  font-light text-2xl tracking-wider">points</th>
          </tr>
        </thead>
        <tbody className="text-left ">
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-14 "
                  : index % 2 === 0
                  ? "bg-gray-700/50 text-slate-300 text-lg rounded-3xl"
                  : "bg-gray-800/65 text-slate-300 text-lg"
              } py-4 w-full`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-4">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={42}
                      height={42}
                    />
                  ) : (
                    <FaUserCircle className="h-10 w-10" />
                  )}
                  <Link href={`/profile/${user.username}`}>
                    <span className="tracking-wider text-lg">
                      {user.username}
                    </span>
                  </Link>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {loading && (
            <tr className="w-full">
              <td className="text-center py-4" colSpan={4}>
                <div className="flex justify-center items-center">
                  <ImSpinner8 className="animate-spin h-6 w-6 text-slate-100" />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
