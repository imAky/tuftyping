import Link from "next/link";
import { FaFileContract, FaEnvelope, FaLock } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="flex gap-24 p-4 items-center justify-center ">
      <a target="_blank" href="mailto:akycode20@gmail.com">
        <div className="flex items-center gap-2">
          <FaEnvelope />
          <span>contact</span>
        </div>
      </a>
      <Link href="/terms-of-service">
        <div className="flex items-center gap-2">
          <FaFileContract />
          <span>terms</span>
        </div>
      </Link>
      <Link href="/privacy-policy">
        <div className="flex items-center gap-2">
          <FaLock />
          <span>privacy</span>
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
