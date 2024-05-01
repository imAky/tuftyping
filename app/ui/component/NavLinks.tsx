"use client";
import { useSound } from "@/app/context/typing/SoundContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { FaCrown, FaKeyboard } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { FaInfo } from "react-icons/fa";
import ProfileWrapper from "./ProfileWrapper";
import Logo from "@/app/icons/Logo";

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
        <Link href="/">
          <div className="flex space-x-1">
            <div
              style={{ width: 80, height: 28 }}
              className="md:py-2 -mr-4 -ml-4 -pt-1"
            >
              <Logo width={80} height={38} />
            </div>

            <div className="text-2xl gap-1  text-slate-300  py-1 tracking-wider hidden md:flex ">
              <span className="tracking-widest font-extrabold">TYPING</span>
              <span className="font-thin tracking-widest">BATTLE</span>
            </div>
          </div>
        </Link>
        <Link
          href="/"
          className={`${
            pathname === "/" &&
            "border-b-2 text-slate-200 sm:border-b-4 border-yellow-400"
          } p-1`}
        >
          <FaKeyboard className="sm:h-5 sm:w-5 h-4 w-4 hover:text-slate-200" />
        </Link>

        <Link
          href="/leaderboard"
          className={`${
            pathname.startsWith("/leaderboard") &&
            "border-b-2 text-slate-200 sm:border-b-4 border-yellow-400"
          } p-1`}
        >
          <FaCrown className="sm:h-5 sm:w-5 h-4 w-4 hover:text-slate-200" />
        </Link>
        <Link
          href="/about"
          className={`${
            pathname.startsWith("/about") &&
            "border-b-2 text-slate-200 sm:border-b-4 border-yellow-400"
          } p-1`}
        >
          <FaInfo className="sm:h-5 sm:w-5 h-4 w-4 hover:text-slate-200" />
        </Link>
      </div>
      <div className="flex items-center sm:space-x-8 space-x-4">
        {pathname === "/" && (
          <button ref={soundRef} className="" onClick={hadleSoundClick}>
            {isMuted ? (
              <HiSpeakerXMark className="sm:h-5 sm:w-5 h-4 w-4 hover:text-slate-200" />
            ) : (
              <HiSpeakerWave className="sm:h-5 sm:w-5 h-4 w-4 text-slate-200" />
            )}
          </button>
        )}

        <ProfileWrapper pathname={pathname} />
      </div>
    </>
  );
}
