import { signIn } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { LiaSignInAltSolid } from "react-icons/lia";
// import SignInPage from "./sign_in";

export default function SignInButton() {
  const handleSignIn = (e: any) => {
    e.preventDefault();
    signIn("google");
  };
  return (
    <button
      onClick={handleSignIn}
      className="flex text-slate-50 items-center   bg-sky-600 hover:bg-sky-700 p-2  rounded-md gap-1"
    >
      <LiaSignInAltSolid className="sm:h-5 sm:w-5 h-4 w-4 hover:text-slate-200 " />
      <span className="sm:text-sm text-xs font-light ">Sign In</span>
    </button>
  );
}
