import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMoviePoster } from '../services/omdb';

interface FeaturedFilm {
    title: string;
    nominations: number;
    year?: number;
}

interface FeaturedCarouselProps {
    films: FeaturedFilm[];
}

export default function FeaturedCarousel({ films }: FeaturedCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(2); // Center card by default
    const [posters, setPosters] = useState<Record<string, string | null>>({});

    // Fetch posters
    useEffect(() => {
        films.forEach(async (film) => {
            try {
                const url = await getMoviePoster(film.title, film.year);
                setPosters(prev => ({ ...prev, [film.title]: url }));
            } catch {
                setPosters(prev => ({ ...prev, [film.title]: null }));
            }
        });
    }, [films]);

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % films.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [films.length]);

    return (
        <div className="relative w-full overflow-hidden">
            <div className="flex items-center justify-center gap-4 py-8">
                {films.map((film, index) => {
                    const isActive = index === activeIndex;
                    const offset = index - activeIndex;

                    return (
                        <motion.button
                            key={film.title}
                            onClick={() => setActiveIndex(index)}
                            initial={false}
                            animate={{
                                width: isActive ? '400px' : '150px',
                                height: isActive ? '500px' : '400px',
                                opacity: Math.abs(offset) > 2 ? 0 : 1,
                                scale: Math.abs(offset) > 2 ? 0 : 1,
                                x: offset * 10,
                            }}
                            transition={{
                                duration: 0.6,
                                ease: [0.32, 0.72, 0, 1],
                            }}
                            className="relative rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
                            style={{
                                transformOrigin: 'center center',
                            }}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                {posters[film.title] ? (
                                    <img
                                        src={posters[film.title]!}
                                        alt={film.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/60 to-secondary/60 flex items-center justify-center p-8">
                                        <span className="font-heading text-white text-center text-2xl drop-shadow-lg">
                                            {film.title}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Content - Only show on active card */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                        className="absolute bottom-0 left-0 right-0 p-6 text-left"
                                    >
                                        <h3 className="font-heading text-3xl text-white mb-2">
                                            {film.title}
                                        </h3>
                                        <p className="text-primary text-sm font-medium mb-4">
                                            🏆 {film.nominations} nominations
                                        </p>
                                        <div className="inline-flex items-center gap-2 text-white text-sm font-medium">
                                            Learn more
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Title for inactive cards */}
                            {!isActive && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                                    <h4 className="font-heading text-white text-lg line-clamp-2">
                                        {film.title}
                                    </h4>
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-4">
                {films.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                ? 'bg-primary w-8'
                                : 'bg-accent-light hover:bg-accent'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
