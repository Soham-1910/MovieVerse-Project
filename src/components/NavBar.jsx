import { Link, useLocation } from "react-router-dom";
import DarkMode from "./DarkMode";

export default function Navbar() {
    const location = useLocation();

    const active = (path) =>
        location.pathname === path
            ? "text-red-600 dark:text-red-400 font-semibold"
            : "text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400";

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-950/70 text-gray-900 dark:text-white shadow-sm transition-all duration-300 border-b border-gray-200/50 dark:border-gray-800/50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* 🎬 Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-red-600 dark:text-red-500 hover:opacity-90 transition-opacity"
                >
                    MovieVerse
                </Link>

                {/* 🧭 Navigation Links */}
                <div className="flex items-center gap-8 text-base font-medium">
                    <Link to="/" className={active("/")}>
                        Home
                    </Link>
                    <Link to="/top-imdb" className={active("/top-imdb")}>
                        Top IMDb
                    </Link>
                    <Link to="/favorites" className={active("/favorites")}>
                        Favorites
                    </Link>

                    {/* 🌙 Dark Mode Toggle */}
                    <div className="ml-4">
                        <DarkMode />
                    </div>
                </div>
            </div>
        </nav>
    );
}
