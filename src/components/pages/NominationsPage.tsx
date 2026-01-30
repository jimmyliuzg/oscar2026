import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories, aboveTheLineCategories, belowTheLineCategories } from '../../data/nominations';
import CategoryList from '../nominations/CategoryList';
import PosterCarousel from '../nominations/PosterCarousel';

type FilterType = 'all' | 'aboveTheLine' | 'belowTheLine';

export default function NominationsPage() {
    const [filter, setFilter] = useState<FilterType>('all');
    const [highlightedFilm, setHighlightedFilm] = useState<string | undefined>();

    const filteredCategories =
        filter === 'aboveTheLine' ? aboveTheLineCategories :
            filter === 'belowTheLine' ? belowTheLineCategories :
                categories;

    return (
        <div className="page-transition">
            <div className="section">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="font-heading text-4xl text-text mb-4">
                        2026 Oscar Nominations
                    </h1>
                    <p className="text-text-light max-w-2xl mx-auto">
                        Explore all 24 categories and learn about the nominees competing for Hollywood's highest honor.
                    </p>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-8"
                >
                    {[
                        { id: 'all', label: 'All Categories', count: categories.length },
                        { id: 'aboveTheLine', label: 'Above the Line', count: aboveTheLineCategories.length },
                        { id: 'belowTheLine', label: 'Below the Line', count: belowTheLineCategories.length },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id as FilterType)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === tab.id
                                ? 'bg-primary text-text shadow-golden'
                                : 'bg-accent-light text-text-light hover:bg-accent-light/80'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </motion.div>

                {/* Main content */}
                <div className="grid lg:grid-cols-[1fr_300px] gap-8">
                    {/* Categories list */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <CategoryList
                            categories={filteredCategories}
                            onNomineeHover={setHighlightedFilm}
                        />
                    </motion.div>

                    {/* Poster carousel (desktop only) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <PosterCarousel highlightedFilm={highlightedFilm} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
