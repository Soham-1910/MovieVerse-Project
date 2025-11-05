import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const DarkMode = () => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }, []);

    return (
        <button
            onClick={toggleTheme}
            className={`
        relative w-10 h-10 flex items-center justify-center rounded-full
        transition-all duration-300 ease-in-out
        bg-gray-200 text-gray-800 hover:bg-gray-300 
        dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700 
        shadow-md hover:shadow-lg
      `}
            aria-label="Toggle dark mode"
        >
            <span
                className={`absolute transition-transform duration-300 ${theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
            >
                <Moon size={20} />
            </span>

            <span
                className={`absolute transition-transform duration-300 ${theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                    }`}
            >
                <Sun size={20} />
            </span>
        </button>
    );
};

export default DarkMode;
