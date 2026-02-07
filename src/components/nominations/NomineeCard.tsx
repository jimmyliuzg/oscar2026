import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getNomineeImage, getNomineeTmdbUrl } from '../../services/tmdb';
import { Nominee } from '../../data/nominations';
import TrailerModal from '../common/TrailerModal';

// Category types that determine how cards are displayed
type DisplayMode =
    | 'film-focused'      // Best Picture, Animated Feature, etc. - film is primary
    | 'person-focused'    // Director, Actor, Writer, etc. - person is primary
    | 'song-focused'      // Original Song - song title is primary
    | 'film-only';        // Shorts, Docs - just the title

interface CardContent {
    heading: string;
    subheading?: string;
    tertiaryInfo?: string;
}

/** Determine display mode based on category ID */
function getDisplayMode(categoryId?: string): DisplayMode {
    if (!categoryId) return 'film-focused';

    // Person-focused categories (name is the main content)
    const personFocused = [
        'directing',
        'actorLeading',
        'actressLeading',
        'actorSupporting',
        'actressSupporting',
        'originalScreenplay',
        'adaptedScreenplay',
        'cinematography',
        'costumeDesign',
        'filmEditing',
        'originalScore',
        'casting',
    ];

    // Film-focused categories use the default case: bestPicture, animatedFeature,
    // internationalFeature, productionDesign, sound, visualEffects, makeupHairstyling

    // Song-focused (song title is primary)
    const songFocused = ['originalSong'];

    // Film-only categories (shorts, docs - just show title)
    const filmOnly = [
        'animatedShort',
        'documentaryFeature',
        'documentaryShort',
        'liveActionShort',
    ];

    if (personFocused.includes(categoryId)) return 'person-focused';
    if (songFocused.includes(categoryId)) return 'song-focused';
    if (filmOnly.includes(categoryId)) return 'film-only';
    return 'film-focused';
}

/** Get appropriate card content based on category and nominee */
function getCardContent(nominee: Nominee, categoryId?: string): CardContent {
    const mode = getDisplayMode(categoryId);

    switch (mode) {
        case 'person-focused':
            // Person's name as heading, film as subheading
            return {
                heading: nominee.name,
                subheading: nominee.film,
            };

        case 'song-focused':
            // Song title as heading, film as subheading
            return {
                heading: nominee.name, // e.g., "Dear Me"
                subheading: nominee.film,
            };

        case 'film-only':
            // Just the film/short title
            return {
                heading: nominee.film,
            };

        case 'film-focused':
        default:
            // Film as heading, with additional info as subheading
            if (categoryId === 'bestPicture' && nominee.producers) {
                return {
                    heading: nominee.film,
                    subheading: nominee.producers,
                };
            }
            if (categoryId === 'internationalFeature' && nominee.description) {
                return {
                    heading: nominee.film,
                    subheading: nominee.description, // Country
                };
            }
            if (categoryId === 'animatedFeature' && nominee.description) {
                return {
                    heading: nominee.film,
                    subheading: nominee.description, // Producers/Directors
                };
            }
            return {
                heading: nominee.film,
                subheading: nominee.director,
            };
    }
}

interface NomineeCardProps {
    nominee: Nominee;
    categoryId?: string; // Category ID to determine display format
    isSelected?: boolean;
    onSelect?: () => void;
    onHover?: () => void;
    showPoster?: boolean;
    compact?: boolean;
}

export default function NomineeCard({
    nominee,
    categoryId,
    isSelected = false,
    onSelect,
    onHover,
    showPoster = true,
    compact = false,
}: NomineeCardProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [tmdbUrl, setTmdbUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);

    // Get display content based on category
    const content = getCardContent(nominee, categoryId);
    const displayMode = getDisplayMode(categoryId);

    useEffect(() => {
        if (showPoster) {
            setIsLoading(true);
            // Use TMDB to get appropriate image based on category type
            // Person-focused categories get person images, film-focused get posters
            // Use 'large' size for better quality - profile images will be h632
            getNomineeImage(nominee.name, nominee.film, nominee.year, categoryId, 'large')
                .then(url => {
                    setImageUrl(url);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [nominee.name, nominee.film, nominee.year, categoryId, showPoster]);

    // Fetch TMDB URL for linking
    useEffect(() => {
        getNomineeTmdbUrl(nominee.name, nominee.film, nominee.year, categoryId)
            .then(url => setTmdbUrl(url))
            .catch(() => setTmdbUrl(null));
    }, [nominee.name, nominee.film, nominee.year, categoryId]);

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
                <p className="font-medium text-text">{content.heading}</p>
                {content.subheading && (
                    <p className="text-sm text-text-light line-clamp-1">{content.subheading}</p>
                )}
            </motion.button>
        );
    }

    const handlePlayTrailer = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card selection
        setShowTrailer(true);
    };

    const handleCardClick = () => {
        // If there's a TMDB URL and this is not a selection context (voting), open TMDB
        if (tmdbUrl && !onSelect) {
            window.open(tmdbUrl, '_blank', 'noopener,noreferrer');
        } else if (onSelect) {
            // Otherwise use the normal selection handler for voting
            onSelect();
        }
    };

    return (
        <>
            <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCardClick}
                onMouseEnter={onHover}
                className={`nominee-card w-full text-left ${isSelected ? 'selected' : ''}`}
            >
                {/* Poster */}
                {showPoster && (
                    <div className="aspect-[2/3] relative overflow-hidden bg-neutral-200">
                        {isLoading ? (
                            <div className="absolute inset-0 bg-accent-light animate-pulse" />
                        ) : imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={displayMode === 'person-focused' ? nominee.name : nominee.film}
                                className="absolute inset-0 w-full h-full object-cover"
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

                        {/* Play button for trailers - only show for Best Picture */}
                        {categoryId === 'bestPicture' && nominee.trailerUrl && (
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

                {/* Content - Dynamic based on category */}
                <div className="p-4">
                    <h4 className="font-medium text-text mb-1 line-clamp-2">{content.heading}</h4>
                    {content.subheading && (
                        <p className="text-sm text-text-light line-clamp-2">{content.subheading}</p>
                    )}
                    {content.tertiaryInfo && (
                        <p className="text-xs text-text-muted mt-1 line-clamp-1">{content.tertiaryInfo}</p>
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
