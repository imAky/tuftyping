import { GameResult, ResponseType } from "@/app/lib/definition";
import { useSession, signIn } from "next-auth/react";
import { Spinner } from "./Spinner";
import { saveResult } from "@/app/lib/action";
import React, { useState } from "react";
import Tooltip from "./Tooltip";

const ResultButton = ({ gameResults }: { gameResults: GameResult }) => {
  const { data: session, status } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [feedback, setFeedBack] = useState<ResponseType | null>(null);

  const handleSaveResult = async () => {
    // Set isSaving to true immediately
    if (!session) {
      await signIn("google");
      return;
    }
    if (feedback?.status) {
      return;
    }
    try {
      if (session) {
        if (session.user?.email) {
          setIsSaving(true);
          const response = await saveResult(gameResults);
          if (response) {
            setFeedBack(response);
          }
        }
      }
    } catch (error) {
      console.error("Error while saving result", error);
    } finally {
      setIsSaving(false); // Set isSaving back to false after the asynchronous operation
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <button
      onClick={handleSaveResult}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-48 h-[50px] bg-red-800 px-8 py-2 m-2 rounded-full text-2xl shadow-md text-yellow-500 hover:bg-red-700 tracking-wide flex justify-center items-center"
    >
      {status === "loading" || isSaving ? (
        <Spinner />
      ) : session ? (
        <React.Fragment>
          {(feedback?.status && "Saved!") ||
            (feedback?.status === false && "Retry") ||
            "Save"}
          {showTooltip && (
            <Tooltip
              toolText={`${
                (feedback?.status && feedback?.message) ||
                (feedback?.status === false && feedback?.message) ||
                "Save Result"
              }`}
              topPosition="-top-16"
            />
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          Log In
          {showTooltip && <Tooltip toolText="Log In" topPosition="-top-12" />}
        </React.Fragment>
      )}
    </button>
  );
};

export default ResultButton;
