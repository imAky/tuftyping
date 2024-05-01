import NavLinks from "../component/NavLinks";

export default async function Navbar() {
  return (
    <nav className="relative  flex justify-between item-center  w-full  h-14 py-2  sm:px-8 px-4 shadow-2xl rounded-b-md z-20 drop-shadow-2xl">
      <NavLinks />
    </nav>
  );
}
