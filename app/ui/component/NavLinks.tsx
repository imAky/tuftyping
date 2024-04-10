"use client";
import { useSound } from "@/app/context/typing/SoundContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { FaCrown, FaKeyboard } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { IoLogoGameControllerB } from "react-icons/io";
import { Spinner, Spinner2 } from "./Spinner";
import Profile from "./Profile";
import SignInButton from "./SignInButton";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import ProfileWrapper from "./ProfileWrapper";

export default function NavLinks() {
  const { isMuted, toggleMenu } = useSound();
  const pathname = usePathname();
  const soundRef = useRef<HTMLButtonElement>(null);

  const hadleSoundClick = () => {
    soundRef.current?.blur();
    toggleMenu();
  };

  return (
    <>
      <div className="flex items-center sm:space-x-8 space-x-4">
        <Link
          href="/"
          className="text-yellow-500 sm:text-4xl text-sm  font-bold tracking-wider"
        >
          <span className="sm:hidden flex flex-col  ">
            <span className="text-yellow-500">type</span>
            <span className="text-red-400">champ</span>
          </span>
          <span className="hidden sm:flex">
            <span className="text-yellow-500">type</span>
            <span className="text-red-500">champ</span>
          </span>
        </Link>
        <Link
          href="/"
          className={`${
            pathname === "/" && "border-b-2 sm:border-b-4 border-yellow-400"
          } p-1`}
        >
          <FaKeyboard className="sm:h-5 sm:w-5 h-4 w-4 hover:text-slate-200" />
        </Link>
        <Link
          href="/contest"
          className={`${
            pathname.startsWith("/contest") &&
            "border-b-2 sm:border-b-4 border-yellow-400"
          } p-1`}
        >
          <IoLogoGameControllerB className="sm:h-5 sm:w-5 h-4 w-4 hover:text-slate-200" />
        </Link>
        <Link
          href="/leaderboard"
          className={`${
            pathname.startsWith("/leaderboard") &&
            "border-b-2 sm:border-b-4 border-yellow-400"
          } p-1`}
        >
          <FaCrown className="sm:h-5 sm:w-5 h-4 w-4 hover:text-slate-200" />
        </Link>
      </div>
      <div className="flex items-center sm:space-x-8 space-x-4">
        <button ref={soundRef} className="" onClick={hadleSoundClick}>
          {isMuted ? (
            <HiSpeakerXMark className="sm:h-5 sm:w-5 h-4 w-4 hover:text-slate-200" />
          ) : (
            <HiSpeakerWave className="sm:h-5 sm:w-5 h-4 w-4 text-slate-200" />
          )}
        </button>

        <ProfileWrapper pathname={pathname} />
      </div>
    </>
  );
}
