import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies } from "../services/api";

export default function TopIMDbPage() {
    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await getPopularMovies();
            const sorted = [...data].sort(() => Math.random() - 0.5).slice(0, 10);
            setTopMovies(sorted);
        };
        load();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-white px-4 sm:px-6 py-18 transition-colors duration-300">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-red-600 dark:text-red-500 text-center sm:text-left">
                ⭐ Top IMDb Movies
            </h2>

            {/* Grid layout optimized for all screens */}
            <div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 justify-center"
            >
                {topMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}
