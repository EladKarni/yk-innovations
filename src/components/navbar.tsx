"use client";
import { FC, ReactNode } from "react";
import clsx from "clsx";
import { useWindowScroll } from "react-use";
import Link from "next/link";
import MobileNavMenu from "./MobileMenu";
import { useMounted } from "@/hooks/useMounter";
import Logo from "../../public/logo.png";
import Image from "next/image";

interface NavBarProps {
  children?: ReactNode;
}

const NavBar: FC<NavBarProps> = ({ children }) => {
  const { y } = useWindowScroll();
  const isMounted = useMounted();
  return (
    <header
      className={clsx(
        "py-5 bg-base-200 h-[100px] sticky top-0 left-0 w-full z-50 duration-200 min-w-[290px]",
        isMounted && y > 50 && "shadow-primary-900 shadow-md"
      )}
    >
      <div className="h-full flex flex-col justify-center max-w-[1024px] lg:mx-auto mx-4">
        <div className="flex justify-between items-center relative">
          <div className="max-w-[200px]">
            <Link href="/">
              <Image src={Logo} alt="logo" />
            </Link>
          </div>
          {children}
          <MobileNavMenu />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
