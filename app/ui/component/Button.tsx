import React from "react";

interface ButtonProps {
  title: string;
  handleRestart?: () => void;
}

export const ButtonInline = ({ title, handleRestart }: ButtonProps) => {
  return (
    <button
      className="w-[200px] h-[50px] bg-red-800 px-8 py-2 m-2 rounded-full text-2xl shadow-md text-yellow-500 hover:bg-red-700 tracking-wide"
      onClick={handleRestart}
    >
      {title}
    </button>
  );
};
