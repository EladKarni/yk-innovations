"use client";

import { navLinkList } from "@/constants/navLinks";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import CTAButton from "@/ui/CTAButton";
import { useWindowScroll } from "react-use";
import { useMounted } from "@/hooks/useMounter";

const NavLinks = () => {
    const { y } = useWindowScroll();
    const isMounted = useMounted();
    const isScrolled = isMounted && y > 50;

    return (
        <nav className="flex items-center gap-6 max-lg:hidden">
            <ul className="flex items-center gap-6">
                {navLinkList.map((navLink) => (
                    <li key={navLink.url}>
                        <Link
                            className={`relative font-semibold text-md w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center ${isScrolled ? "text-base-content" : "text-white"}`}
                            href={navLink.url}
                        >
                            {navLink.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <ThemeToggle />
            <CTAButton href="/#contact" size="sm">
                Get in Touch
            </CTAButton>
        </nav>
    );
};

export default NavLinks;