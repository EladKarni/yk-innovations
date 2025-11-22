"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) {
    return (
      <div className="w-12 h-6 bg-base-300 rounded-full animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 bg-base-300 rounded-full transition-colors duration-300 hover:bg-base-content/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span
        className={`absolute left-1 w-4 h-4 bg-base-content rounded-full transition-transform duration-300 ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      />
      <span className="sr-only">
        {theme === "light" ? "Light" : "Dark"} mode
      </span>
    </button>
  );
}
