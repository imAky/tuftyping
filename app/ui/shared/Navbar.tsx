import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession, Session } from "next-auth";
import NavLinks from "../component/NavLinks";

export default async function Navbar() {
  const session = await getServerSession(options);
  return (
    <nav className="relative  flex justify-between item-center  w-full  py-2 sm:py-4 sm:px-8 px-4 shadow-xl rounded-b-md z-20 bg-primary-1">
      <NavLinks />
    </nav>
  );
}
