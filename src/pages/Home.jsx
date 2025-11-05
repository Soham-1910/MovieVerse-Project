import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { searchMovies, getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import TopCarousel from "../components/TopCarousel";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  const location = useLocation();

  // 🧠 Load movies on mount
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const popular = await getPopularMovies();
        setMovies(popular);
        setPopularMovies(popular);

        // Randomize top 10 for carousel
        const top = [...popular].sort(() => Math.random() - 0.5).slice(0, 10);
        setTopMovies(top);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  // 🔍 Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setSearched(true);

    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Reset when returning to home
  useEffect(() => {
    if (location.pathname === "/") {
      setMovies(popularMovies);
      setSearchQuery("");
      setSearched(false);
      setError(null);
    }
  }, [location, popularMovies]);

  return (
    <motion.div
      className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-white px-6 py-5 pt-24 transition-colors duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* 🔍 Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-red-500
                     dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-300"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 transition-colors px-4 py-2 rounded-lg font-semibold text-white"
        >
          Search
        </button>
      </form>

      {/* ⚠️ Error */}
      {error && (
        <div className="text-center text-red-600 dark:text-red-400 font-medium mb-6">
          {error}
        </div>
      )}

      {/* ⏳ Loading */}
      {loading ? (
        <div className="text-center text-gray-600 dark:text-gray-400 text-lg">
          Loading...
        </div>
      ) : (
        <>
          {/* 🎞️ Carousel */}
          {!searched && topMovies.length > 0 && (
            <TopCarousel movies={topMovies} />
          )}

          {/* 🎬 Movies */}
          {searched && movies.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl mb-2">
                Movie "<span className="text-red-500 dark:text-red-400">{searchQuery}</span>" not found 😞
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                But here are some popular movies you might enjoy:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-6 justify-center">
                {popularMovies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
            </div>
          ) : (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-500">
                🎬 {searched ? "Search Results" : "Popular Movies"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-8 ml-15 justify-center">
                {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </motion.div>
  );
}

export default Home;
