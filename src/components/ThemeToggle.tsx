"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 bg-base-300 rounded-full animate-pulse" />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isLightOn = currentTheme === "light";

  const toggleTheme = () => {
    setTheme(isLightOn ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
      aria-label={`Switch to ${isLightOn ? "dark" : "light"} mode`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-7 h-7 transition-all duration-300 ${isLightOn ? "drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" : ""
          }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lightbulb glass */}
        <path
          d="M9 21h6M12 3a6 6 0 0 0-6 6c0 2.22 1.21 4.16 3 5.19V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.81c1.79-1.03 3-2.97 3-5.19a6 6 0 0 0-6-6z"
          className={`transition-all duration-300 ${isLightOn
              ? "fill-yellow-300 stroke-yellow-500"
              : "fill-base-300 stroke-base-content/50"
            }`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Lightbulb base/screw */}
        <path
          d="M10 17v1a2 2 0 0 0 4 0v-1"
          className="stroke-base-content/70"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Light rays - only visible when on */}
        {isLightOn && (
          <>
            <line x1="12" y1="1" x2="12" y2="0" className="stroke-yellow-400" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="4.22" x2="3.51" y2="3.51" className="stroke-yellow-400" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="12" x2="0" y2="12" className="stroke-yellow-400" strokeWidth="2" strokeLinecap="round" />
            <line x1="19.78" y1="4.22" x2="20.49" y2="3.51" className="stroke-yellow-400" strokeWidth="2" strokeLinecap="round" />
            <line x1="23" y1="12" x2="24" y2="12" className="stroke-yellow-400" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
      </svg>
      <span className="sr-only">
        {isLightOn ? "Light" : "Dark"} mode - click to turn {isLightOn ? "off" : "on"}
      </span>
    </button>
  );
}
