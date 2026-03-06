"use client";
import { FC } from "react";
import clsx from "clsx";
import { useWindowScroll } from "react-use";
import Link from "next/link";
import MobileNavMenu from "./MobileMenu";
import { useMounted } from "@/hooks/useMounter";
import { Logo } from "@/ui/icons/logo";
import type { NavBarProps } from "@/types";

const NavBar: FC<NavBarProps> = ({ children }) => {
  const { y } = useWindowScroll();
  const isMounted = useMounted();

  const isScrolled = isMounted && y > 50;

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 h-[100px] py-5 duration-200 min-w-[290px]",
        isScrolled
          ? "bg-base-200/60 backdrop-blur-md shadow-primary-900 shadow-md"
          : "bg-transparent text-white"
      )}
    >
      <div className="h-full flex flex-col justify-center max-w-[1024px] lg:mx-auto mx-4">
        <div className="flex justify-between items-center relative">
          <div className="max-w-[183px] lg:max-w-[163px]">
            <Link href="/">
              <Logo width={183} height={50} priority forceWhite={!isScrolled} />
            </Link>
          </div>
          {children}
          <MobileNavMenu hasScrolled={isScrolled} />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
