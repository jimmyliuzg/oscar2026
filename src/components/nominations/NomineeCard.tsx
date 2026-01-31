import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMoviePoster } from '../../services/omdb';
import { Nominee } from '../../data/nominations';
import TrailerModal from '../common/TrailerModal';

interface NomineeCardProps {
    nominee: Nominee;
    isSelected?: boolean;
    onSelect?: () => void;
    onHover?: () => void;
    showPoster?: boolean;
    compact?: boolean;
}

export default function NomineeCard({
    nominee,
    isSelected = false,
    onSelect,
    onHover,
    showPoster = true,
    compact = false,
}: NomineeCardProps) {
    const [posterUrl, setPosterUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        if (showPoster) {
            setIsLoading(true);
            getMoviePoster(nominee.film, nominee.year)
                .then(url => {
                    setPosterUrl(url);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [nominee.film, nominee.year, showPoster]);

    // Generate a gradient based on film name for fallback
    const gradientColors = [
        ['from-primary/80', 'to-secondary/80'],
        ['from-secondary/80', 'to-accent/80'],
        ['from-accent/80', 'to-primary/80'],
        ['from-primary/60', 'to-accent/60'],
        ['from-secondary/60', 'to-primary/60'],
    ];
    const gradientIndex = nominee.film.length % gradientColors.length;
    const [fromColor, toColor] = gradientColors[gradientIndex];

    if (compact) {
        return (
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSelect}
                onMouseEnter={onHover}
                className={`w-full text-left p-4 rounded-lg transition-all ${isSelected
                    ? 'bg-primary-light border-2 border-primary shadow-golden'
                    : 'bg-background-elevated border border-accent-light hover:border-primary-light'
                    }`}
            >
                <p className="font-medium text-text">{nominee.name}</p>
                <p className="text-sm text-text-light">{nominee.film}</p>
            </motion.button>
        );
    }

    const handlePlayTrailer = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card selection
        setShowTrailer(true);
    };

    return (
        <>
            <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSelect}
                onMouseEnter={onHover}
                className={`nominee-card w-full text-left ${isSelected ? 'selected' : ''}`}
            >
                {/* Poster */}
                {showPoster && (
                    <div className="aspect-[2/3] relative overflow-hidden">
                        {isLoading ? (
                            <div className="absolute inset-0 bg-accent-light animate-pulse" />
                        ) : posterUrl ? (
                            <img
                                src={posterUrl}
                                alt={nominee.film}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${fromColor} ${toColor} flex items-center justify-center p-4`}
                            >
                                <span className="font-heading text-xl text-white text-center drop-shadow-lg">
                                    {nominee.film}
                                </span>
                            </div>
                        )}

                        {/* Selection indicator */}
                        {isSelected && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-golden"
                            >
                                <span className="text-text text-lg">✓</span>
                            </motion.div>
                        )}

                        {/* Play button for trailers */}
                        {nominee.trailerUrl && (
                            <motion.button
                                onClick={handlePlayTrailer}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-golden hover:bg-primary-dark transition-colors"
                                aria-label="Watch trailer"
                            >
                                <span className="text-text text-lg ml-0.5">▶</span>
                            </motion.button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-4">
                    <h4 className="font-medium text-text mb-1 line-clamp-1">{nominee.film}</h4>
                    {nominee.director && (
                        <p className="text-sm text-text-light line-clamp-1">Dir: {nominee.director}</p>
                    )}
                </div>
            </motion.button>

            {/* Trailer Modal */}
            {nominee.trailerUrl && (
                <TrailerModal
                    isOpen={showTrailer}
                    onClose={() => setShowTrailer(false)}
                    trailerUrl={nominee.trailerUrl}
                    filmName={nominee.film}
                />
            )}
        </>
    );
}
