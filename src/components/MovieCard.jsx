import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    return (
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-200 relative w-[180px]">
            {/* Poster */}
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[270px] object-cover"
                />
                {/* Overlay with favorite button */}
                <button
                    onClick={onFavoriteClick}
                    className={`absolute top-2 right-2 text-2xl transition-colors ${favorite
                            ? "text-red-500 hover:text-red-400"
                            : "text-white hover:text-red-400"
                        }`}
                >
                    ♥
                </button>
            </div>

            {/* Movie info */}
            <div className="p-3 text-center">
                <h3 className="text-sm font-semibold line-clamp-1">{movie.title}</h3>
                <p className="text-gray-400 text-xs mt-1">
                    {movie.release_date?.split("-")[0] || "N/A"}
                </p>
            </div>
        </div>
    );
}

export default MovieCard;
