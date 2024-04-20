import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa";
import { FaFileContract, FaEnvelope, FaLock } from "react-icons/fa6";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex md:flex-row  flex-col gap-4 p-4 pb-8 mx-8 items-center justify-between ">
      <div className="flex gap-12">
        <Link target="_blank" href="mailto:akycode20@gmail.com">
          <div className="flex items-center gap-2  text-slate-500 hover:text-slate-300">
            <FaEnvelope />
            <span className="tracking-wider">contact</span>
          </div>
        </Link>
        <Link href="/terms-of-service">
          <div className="flex items-center gap-2 text-slate-500 hover:text-slate-300">
            <FaFileContract />
            <span className="tracking-wider">terms</span>
          </div>
        </Link>
        <Link href="/privacy-policy">
          <div className="flex items-center gap-2 text-slate-500 hover:text-slate-300">
            <FaLock />
            <span className="tracking-wider">privacy</span>
          </div>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-1 text-slate-500">
          <FaRegCopyright />
          <h3>Typechamp</h3>
          <p>{currentYear}</p>
        </div>
        <p>v1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;
