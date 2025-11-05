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
        <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-white px-6 py-8 transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-500">
                ⭐ Top IMDb Movies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-8 ml-15 ">
                {topMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}
