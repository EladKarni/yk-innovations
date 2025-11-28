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
      <div className="w-12 h-6 bg-base-300 rounded-full animate-pulse" />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 bg-base-300 rounded-full transition-colors duration-300 hover:bg-base-content/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
      aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
    >
      <span
        className={`absolute left-1 w-4 h-4 bg-base-content rounded-full transition-transform duration-300 ${
          currentTheme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      />
      <span className="sr-only">
        {currentTheme === "light" ? "Light" : "Dark"} mode
      </span>
    </button>
  );
}
