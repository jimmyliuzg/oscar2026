import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMoviePoster } from '../../services/omdb';
import { getUniqueFilms } from '../../data/nominations';

interface PosterCarouselProps {
    highlightedFilm?: string;
}

export default function PosterCarousel({ highlightedFilm }: PosterCarouselProps) {
    const [currentFilm, setCurrentFilm] = useState<string>('');
    const [posterUrl, setPosterUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [autoPlayTimer, setAutoPlayTimer] = useState<NodeJS.Timeout | null>(null);

    const films = getUniqueFilms();

    const loadPoster = useCallback(async (film: string) => {
        setIsLoading(true);
        const url = await getMoviePoster(film);
        setPosterUrl(url);
        setIsLoading(false);
    }, []);

    const getRandomFilm = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * films.length);
        return films[randomIndex];
    }, [films]);

    const startAutoPlay = useCallback(() => {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
        }

        const timer = setInterval(() => {
            const nextFilm = getRandomFilm();
            setCurrentFilm(nextFilm);
            loadPoster(nextFilm);
        }, 4000);

        setAutoPlayTimer(timer);
    }, [autoPlayTimer, getRandomFilm, loadPoster]);

    // Initialize
    useEffect(() => {
        const initialFilm = getRandomFilm();
        setCurrentFilm(initialFilm);
        loadPoster(initialFilm);
        startAutoPlay();

        return () => {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle highlighted film from parent
    useEffect(() => {
        if (highlightedFilm && highlightedFilm !== currentFilm) {
            // Pause auto-play
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                setAutoPlayTimer(null);
            }

            setCurrentFilm(highlightedFilm);
            loadPoster(highlightedFilm);

            // Resume auto-play after 5 seconds
            const resumeTimer = setTimeout(() => {
                startAutoPlay();
            }, 5000);

            return () => clearTimeout(resumeTimer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlightedFilm]);

    // Generate fallback gradient
    const gradientColors = [
        ['from-primary', 'to-secondary'],
        ['from-secondary', 'to-accent'],
        ['from-accent', 'to-primary'],
    ];
    const gradientIndex = currentFilm.length % gradientColors.length;
    const [fromColor, toColor] = gradientColors[gradientIndex];

    return (
        <div className="sticky top-20 hidden lg:block">
            <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-xl border border-accent-light relative">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-accent-light animate-pulse"
                        />
                    ) : posterUrl ? (
                        <motion.img
                            key={currentFilm + '-img'}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            src={posterUrl}
                            alt={currentFilm}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <motion.div
                            key={currentFilm + '-gradient'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 bg-gradient-to-br ${fromColor} ${toColor} flex items-center justify-center p-6`}
                        >
                            <span className="font-heading text-2xl text-white text-center drop-shadow-lg">
                                {currentFilm}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Film title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="font-heading text-white text-lg truncate">{currentFilm}</p>
                </div>
            </div>

            <p className="text-center text-text-muted text-sm mt-4">
                Hover over nominees to preview posters
            </p>
        </div>
    );
}
