import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";

export default function TopCarousel({ movies }) {
    const carouselRef = useRef(null);
    const [autoMove, setAutoMove] = useState(true);
    const [position, setPosition] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);

    // Card width changes with screen size
    const itemWidth = window.innerWidth < 640 ? 140 :
        window.innerWidth < 1024 ? 160 : 200;
    const gap = window.innerWidth < 640 ? 10 : 20;
    const totalWidth = (itemWidth + gap) * movies.length;

    // 🎞️ Auto move effect
    useEffect(() => {
        if (!autoMove) return;
        const interval = setInterval(() => {
            setPosition((prev) => {
                const next = prev - 1.5;
                return next < -totalWidth ? 0 : next;
            });
        }, 16);
        return () => clearInterval(interval);
    }, [autoMove, totalWidth]);

    // 📱 Touch controls
    const handleTouchStart = (e) => {
        setAutoMove(false);
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (touchStartX === null) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - touchStartX;
        setPosition((prev) => prev + diff * 0.3);
        setTouchStartX(currentX);
    };

    const handleTouchEnd = () => {
        setTouchStartX(null);
        setAutoMove(true);
    };

    // 🖱️ Mouse hover controls (for desktop)
    const handleMouseEnter = () => setAutoMove(false);
    const handleMouseLeave = () => setAutoMove(true);

    return (
        <div
            ref={carouselRef}
            className="overflow-hidden relative select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="flex justify-start gap-5 sm:gap-6 md:gap-8 lg:gap-10"
                animate={{ x: position }}
                transition={{ type: "tween", duration: 0.1 }}
                style={{ width: totalWidth * 2 }}
            >
                {[...movies, ...movies].map((movie, index) => (
                    <div
                        key={index}
                        className="shrink-0 w-[140px] sm:w-40 md:w-[180px] lg:w-[200px]"
                    >
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
