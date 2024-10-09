"use client";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import LoginForm from "./components/LoginForm";

export default function Home() {
  const [isDarkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Set default theme to local storage if not set
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme);

    // Apply dark mode styles
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Apply dark mode styles based on local storage or system preference
  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode("light");
    }
  }, []);

  // Return the DarkModeSwitch component
  return (
    <div className="transition duration-500 bg-white dark:bg-black">
      <div className="flex items-center justify-center h-screen">
        <DarkModeSwitch
          style={{ marginBottom: "2rem" }}
          checked={isDarkMode === "dark"}
          onChange={toggleDarkMode}
          size={120}
        />
      </div>
      <LoginForm />
    </div>
  );
}
