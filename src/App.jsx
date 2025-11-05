import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TopIMDb from "./pages/TopIMDbPage";
import Favorites from "./pages/Favorites";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/top-imdb" element={<TopIMDb />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
