import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import MovieCard from "./MovieCard";

export default function TopCarousel({ movies }) {
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();
    const positionRef = useRef(0); // Track current x position

    // Function to start smooth infinite scroll
    const startAnimation = async (from = "0%") => {
        await controls.start({
            x: [from, "-100%"],
            transition: {
                ease: "linear",
                duration: 30,
                repeat: Infinity,
            },
        });
    };

    // Function to stop animation and store current position
    const stopAnimation = async () => {
        const latest = await controls.stop(); // stop returns nothing, so we manually use positionRef
    };

    // Watch the animation progress using onUpdate
    const handleUpdate = (latest) => {
        if (latest.x) {
            positionRef.current = latest.x; // store current position
        }
    };

    // Start on mount
    useEffect(() => {
        startAnimation("0%");
    }, []);

    return (
        <section className="mb-12">
            <div
                className="overflow-hidden relative"
                onMouseEnter={() => {
                    setIsHovered(true);
                    controls.stop();
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    // Resume from current position smoothly
                    startAnimation(positionRef.current + "%");
                }}
            >
                <motion.div
                    className="flex gap-8 py-2"
                    animate={controls}
                    initial={{ x: "0%" }}
                    onUpdate={handleUpdate} // track current position
                >
                    {[...movies, ...movies].map((movie, index) => (
                        <div key={index} className="w-40 shrink-0">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
