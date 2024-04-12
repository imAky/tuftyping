"use client";
import { fetchLeaderBoard } from "@/app/lib/action";
import { useEffect, useState } from "react";

export default function LeaderBox() {
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const newLeaderboard: any = await fetchLeaderBoard(pageNumber);
        if (initialLoad) {
          setLeaderboard(newLeaderboard); // Set leaderboard directly on initial load
          setInitialLoad(false); // Update initialLoad state to false after initial load
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

    loadLeaderboard();
  }, [pageNumber]);

  function handleScroll() {
    const bottomOfWindow = window.innerHeight + window.pageYOffset;
    const bottomOfDocument = document.documentElement.scrollHeight;

    // Check if the user has scrolled within 100 pixels of the bottom of the page
    if (bottomOfDocument - bottomOfWindow <= 100) {
      console.log("fetching start");
      setLoading(true);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((user: any, index: any) => (
          <li key={index}>
            <img src={user.image} alt={user.name} />
            <div>
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>Total Points: {user.totalPoints}</p>
              <p>Max WPM: {user.maxWpm}</p>
            </div>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}{" "}
      {/* Display loading indicator while data is being fetched */}
    </div>
  );
}
