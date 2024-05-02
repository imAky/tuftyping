import Link from "next/link";
import { FaInfo, FaRegCopyright } from "react-icons/fa";
import { FaFileContract, FaEnvelope, FaLock } from "react-icons/fa6";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex md:flex-row max-w-full flex-col gap-4  py-4 px-8 pb-8  items-center justify-between ">
      <div className="flex sm:gap-12 gap-4 max-sm:flex-col">
        <Link target="_blank" href="mailto:typingbattle@gmail.com">
          <div className="flex items-center gap-2  text-slate-500 hover:text-slate-300">
            <FaEnvelope />
            <span className="tracking-wider">contact</span>
          </div>
        </Link>
        <Link href="/about">
          <div className="flex items-center gap-2 text-slate-500 hover:text-slate-300">
            <FaInfo />
            <span className="tracking-wider">about</span>
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
      <div className="flex gap-2">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FaRegCopyright />
          <span>Typingbattle</span>
          <p>{currentYear}</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
