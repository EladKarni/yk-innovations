"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { LogoProps } from "@/types/ui";

const Logo = ({
  width = 183,
  height = 50,
  priority = false,
  className = "",
}: LogoProps) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent flash by using CSS to hide until mounted
  if (!mounted) {
    return (
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        className="bg-transparent"
      />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const shouldInvert = currentTheme === "dark";

  return (
    <Image
      src="/logo.png"
      alt="YK Innovations Logo"
      className={`${shouldInvert ? "invert" : ""} ${className}`}
      width={width}
      height={height}
      priority={priority}
    />
  );
};

export { Logo };
