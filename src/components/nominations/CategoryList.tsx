import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../../data/nominations';
import { officialResults, isCorrect } from '../../data/results';
import NomineeCard from './NomineeCard';

interface CategoryListProps {
    categories: Category[];
    onNomineeHover?: (film: string) => void;
}

/** Check if a nominee matches the official winner for a given category name */
function checkIsWinner(nominee: { name: string; film: string }, categoryName: string): boolean {
    const official = officialResults[categoryName];
    if (!official) return false;
    // Build prediction-style string "Name - Film" to use existing isCorrect logic
    const predictionStyle = `${nominee.name} - ${nominee.film}`;
    if (isCorrect(predictionStyle, official)) return true;
    // Also check just the film (for film-only entries like Best Picture)
    const filmOnly = `${nominee.film} - ${nominee.film}`;
    return isCorrect(filmOnly, official);
}

export default function CategoryList({ categories, onNomineeHover }: CategoryListProps) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(
        categories[0]?.id || null
    );

    return (
        <div className="space-y-4">
            {categories.map((category) => {
                const isExpanded = expandedCategory === category.id;
                const hasResult = !!officialResults[category.name];

                return (
                    <div
                        key={category.id}
                        className="bg-background-elevated rounded-xl border border-accent-light overflow-hidden"
                    >
                        {/* Category header */}
                        <button
                            onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent-light/50 transition-colors"
                        >
                            <div className="text-left">
                                <h3 className="font-heading text-xl sm:text-2xl text-text mb-1">{category.name}</h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-sm text-text-muted">
                                        {category.nominees.length} nominees
                                    </p>
                                    {hasResult && (
                                        <span className="inline-flex items-center gap-1 bg-primary/15 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                                            🏆 Winner announced
                                        </span>
                                    )}
                                </div>
                            </div>
                            <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-text-light text-xl"
                            >
                                ▼
                            </motion.span>
                        </button>

                        {/* Nominees */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6 pt-2">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                            {category.nominees.map((nominee) => (
                                                <NomineeCard
                                                    key={nominee.id}
                                                    nominee={nominee}
                                                    categoryId={category.id}
                                                    onHover={() => onNomineeHover?.(nominee.film)}
                                                    showPoster={category.isAboveTheLine}
                                                    isWinner={checkIsWinner(nominee, category.name)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

