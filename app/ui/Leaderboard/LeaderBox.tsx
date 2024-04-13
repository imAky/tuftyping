"use client";
import { fetchLeaderBoard } from "@/app/lib/action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LeaderBox() {
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const session: any = useSession();

  console.log("frontend", session);
  const currentUser = session?.data?.user?.username;
  console.log("currentuser", currentUser);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const newLeaderboard: any = await fetchLeaderBoard(pageNumber);
        if (newLeaderboard.length === 0) {
          setAllDataFetched(true); // All data fetched
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
      } catch (err) {
        console.error("Error loading leaderboard: ", err);
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
    //window.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="overflow-x-auto h-full" ref={containerRef}>
      <table className="w-full border-collapse text-xl">
        <thead className="text-left sticky top-0 ">
          <tr className="bg-gray-800">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">user</th>
            <th className="px-4 py-2">wpm</th>
            <th className="px-4 py-2">points</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
          {leaderboard.map((user: any, index: any) => (
            <tr
              key={index}
              className={` ${
                user.username === currentUser
                  ? "bg-sky-600 text-black sticky top-10 w-full"
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onClick={() => console.log(user.username === currentUser)}
            >
              <td className=" px-4 py-2">{index + 1}</td>
              <td className=" px-4 py-2">
                <div className="flex items-center gap-2">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className=" px-4 py-2">{user.maxWpm}</td>
              <td className=" px-4 py-2">{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
}
