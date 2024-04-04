import { signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";
export default function SignOutButton() {
  return <button onClick={() => signOut()}>out</button>;
}
