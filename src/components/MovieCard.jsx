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
        <div
            className="
        bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl 
        transform hover:scale-105 transition-transform duration-200 
        relative w-full sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px]"
        >

            {/* Poster */}
            <div className="relative">
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/150x220?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full aspect-2/3 object-cover"
                />

                {/* ❤️ Favorite Button */}
                <button
                    onClick={onFavoriteClick}
                    className={`absolute top-2 right-2 text-lg sm:text-xl transition-colors ${favorite
                        ? "text-red-500 hover:text-red-400"
                        : "text-white hover:text-red-400"
                        }`}
                >
                    ♥
                </button>
            </div>

            {/* Movie Info */}
            <div className="p-2 sm:p-3 text-center">
                <h3 className="text-xs sm:text-sm font-semibold line-clamp-1">
                    {movie.title}
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
                    {movie.release_date?.split("-")[0] || "N/A"}
                </p>
            </div>
        </div>
    );
}

export default MovieCard;
