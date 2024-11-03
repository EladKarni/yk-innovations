import Logo from "../../public/logo.png";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-base-300 flex flex-col justify-center items-center py-8">
      <Link
        href="/"
        className="text-white font-bold text-2xl max-w-[250px]"
        aria-label="Navigate to Home Page of BrontoSource.dev"
      >
        <Image src={Logo} alt="logo" className="invert" />
      </Link>
      <div className="text-center">
        <p className="italic mt-4">&copy; 2024 YK Innovations</p>
      </div>
    </footer>
  );
};

export default Footer;
