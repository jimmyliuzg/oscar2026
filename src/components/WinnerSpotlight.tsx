import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMoviePoster, getPersonImageFromMovie, getMovieTmdbUrl, getPersonTmdbUrl } from '../services/tmdb';

interface WinnerCard {
    label: string;            // "Best Picture", "Best Actor", etc.
    name: string;             // Winner name or film title
    film: string;             // The film
    year: number;
    type: 'movie' | 'person';
    icon: string;
}

const WINNERS: WinnerCard[] = [
    {
        label: 'Best Picture',
        name: 'One Battle after Another',
        film: 'One Battle after Another',
        year: 2025,
        type: 'movie',
        icon: '🎬',
    },
    {
        label: 'Best Actor',
        name: 'Michael B. Jordan',
        film: 'Sinners',
        year: 2025,
        type: 'person',
        icon: '🎭',
    },
    {
        label: 'Best Actress',
        name: 'Jessie Buckley',
        film: 'Hamnet',
        year: 2025,
        type: 'person',
        icon: '🌟',
    },
];

export default function WinnerSpotlight() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState<Record<string, string | null>>({});
    const [tmdbUrls, setTmdbUrls] = useState<Record<string, string | null>>({});

    useEffect(() => {
        WINNERS.forEach(async (winner) => {
            const key = winner.name;
            try {
                let url: string | null = null;
                if (winner.type === 'movie') {
                    url = await getMoviePoster(winner.film, winner.year, 'large');
                } else {
                    url = await getPersonImageFromMovie(winner.name, winner.film, winner.year, 'large');
                }
                setImages(prev => ({ ...prev, [key]: url }));
            } catch {
                setImages(prev => ({ ...prev, [key]: null }));
            }

            try {
                let tmdbUrl: string | null = null;
                if (winner.type === 'movie') {
                    tmdbUrl = await getMovieTmdbUrl(winner.film, winner.year);
                } else {
                    tmdbUrl = await getPersonTmdbUrl(winner.name);
                }
                setTmdbUrls(prev => ({ ...prev, [key]: tmdbUrl }));
            } catch {
                setTmdbUrls(prev => ({ ...prev, [key]: null }));
            }
        });
    }, []);

    // Auto-rotate
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % WINNERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full">
            <div className="flex items-end justify-center gap-4 py-6">
                {WINNERS.map((winner, index) => {
                    const isActive = index === activeIndex;
                    const imageUrl = images[winner.name];
                    const tmdbUrl = tmdbUrls[winner.name];
                    const offset = index - activeIndex;

                    return (
                        <motion.div
                            key={winner.name}
                            animate={{
                                width: isActive ? '280px' : '160px',
                                height: isActive ? '420px' : '320px',
                                opacity: Math.abs(offset) > 1 ? 0.5 : 1,
                            }}
                            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                            className="relative rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
                            onClick={() => {
                                if (isActive && tmdbUrl) {
                                    window.open(tmdbUrl, '_blank', 'noopener,noreferrer');
                                } else {
                                    setActiveIndex(index);
                                }
                            }}
                        >
                            {/* Poster / Image */}
                            <div className="absolute inset-0">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={winner.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/60 to-secondary/60 flex items-center justify-center p-4">
                                        <span className="text-5xl">{winner.icon}</span>
                                    </div>
                                )}
                            </div>

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                            {/* Winner badge — always visible */}
                            <div className="absolute top-3 left-3">
                                <span className="inline-flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-text text-xs font-bold px-2.5 py-1 rounded-full shadow-golden">
                                    🏆 {winner.label}
                                </span>
                            </div>

                            {/* Active card: name + film + TMDB link */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 12 }}
                                        transition={{ duration: 0.35, delay: 0.15 }}
                                        className="absolute bottom-0 left-0 right-0 p-5"
                                    >
                                        <p className="font-heading text-white text-xl leading-tight mb-1">
                                            {winner.name}
                                        </p>
                                        {winner.type === 'person' && (
                                            <p className="text-primary text-sm font-medium mb-3">
                                                {winner.film}
                                            </p>
                                        )}
                                        {tmdbUrl && (
                                            <div className="inline-flex items-center gap-1.5 text-white/80 text-xs font-medium hover:text-white transition-colors">
                                                View on TMDB
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Inactive: just the name */}
                            {!isActive && (
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="font-heading text-white text-sm line-clamp-2 leading-tight">
                                        {winner.name}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-2">
                {WINNERS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary w-8 h-2' : 'bg-accent-light hover:bg-accent w-2 h-2'}`}
                        aria-label={`View ${WINNERS[index].label}`}
                    />
                ))}
            </div>
        </div>
    );
}
