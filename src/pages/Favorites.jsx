import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-white px-6 py-8 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600 dark:text-red-500">
          Your Favorites ❤️
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-center">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-white flex flex-col items-center justify-center px-6 text-center transition-colors duration-300">
      <h2 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-4">
        No Favorite Movies Yet
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">
        Start adding movies to your favorites and they’ll appear here!
      </p>
    </div>
  );
}

export default Favorites;
