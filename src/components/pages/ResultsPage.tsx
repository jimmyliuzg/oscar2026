import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { participants } from '../../data/predictions';
import {
    officialResults,
    ABOVE_THE_LINE_CATEGORIES,
    BELOW_THE_LINE_CATEGORIES,
    ALL_CATEGORIES,
    isCorrect,
    scoreParticipant,
} from '../../data/results';

type ViewMode = 'leaderboard' | 'category';

const CATEGORY_EMOJIS: Record<string, string> = {
    "Best Picture": "🎬",
    "Directing": "🎥",
    "Actor in a Leading Role": "🎭",
    "Actress in a Leading Role": "🎭",
    "Actor in a Supporting Role": "🌟",
    "Actress in a Supporting Role": "🌟",
    "Writing (Original Screenplay)": "✍️",
    "Writing (Adapted Screenplay)": "📖",
    "Animated Feature Film": "✨",
    "International Feature Film": "🌐",
    "Cinematography": "📷",
    "Costume Design": "👗",
    "Film Editing": "✂️",
    "Makeup and Hairstyling": "💄",
    "Music (Original Score)": "🎵",
    "Music (Original Song)": "🎶",
    "Production Design": "🏛️",
    "Sound": "🔊",
    "Visual Effects": "💥",
    "Casting": "🎪",
    "Animated Short Film": "🎨",
    "Documentary Feature Film": "📽️",
    "Documentary Short Film": "📹",
    "Live Action Short Film": "🎞️",
};



function getMedalColor(rank: number): string {
    if (rank === 1) return 'text-primary';
    if (rank === 2) return 'text-[#C0C0C0]';
    if (rank === 3) return 'text-[#CD7F32]';
    return 'text-text-muted';
}

function getScoreBadgeClass(correct: number, total: number): string {
    if (total === 0) return 'bg-accent-light text-text-muted';
    const pct = correct / total;
    if (pct >= 0.75) return 'bg-green-100 text-green-700';
    if (pct >= 0.5) return 'bg-yellow-100 text-yellow-700';
    if (pct > 0) return 'bg-orange-100 text-orange-700';
    return 'bg-accent-light text-text-muted';
}

export default function ResultsPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('leaderboard');
    const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES[0]);
    const [categorySection, setCategorySection] = useState<'above' | 'below'>('above');

    const announcedCount = useMemo(
        () => Object.values(officialResults).filter(Boolean).length,
        []
    );
    const totalCategories = ALL_CATEGORIES.length;

    // Scored participants sorted by score
    const scoredParticipants = useMemo(() => {
        return participants
            .map((p) => ({ ...p, score: scoreParticipant(p.predictions) }))
            .sort((a, b) => b.score.total - a.score.total || b.score.aboveTheLine - a.score.aboveTheLine);
    }, []);

    // Assign ranks (handle ties)
    const rankedParticipants = useMemo(() => {
        let rank = 1;
        return scoredParticipants.map((p, i) => {
            if (i > 0 && scoredParticipants[i].score.total < scoredParticipants[i - 1].score.total) {
                rank = i + 1;
            }
            return { ...p, rank };
        });
    }, [scoredParticipants]);

    const currentCategoryWinner = officialResults[selectedCategory];
    const currentCategoryParticipants = participants.map((p) => ({
        name: p.name,
        prediction: p.predictions[selectedCategory],
        correct: isCorrect(p.predictions[selectedCategory], currentCategoryWinner),
    }));


    return (
        <div className="page-transition min-h-[calc(100vh-200px)]">
            <div className="section">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-golden animate-golden-glow">
                        <span className="text-3xl">🏆</span>
                    </div>
                    <h1 className="font-heading text-4xl md:text-5xl text-text mb-3">
                        Oscar Night Results
                    </h1>
                    <p className="text-text-light text-lg mb-4">
                        98th Academy Awards — Party Scorecard
                    </p>

                    {/* Progress indicator */}
                    <div className="inline-flex items-center gap-3 bg-background-elevated border border-accent-light rounded-full px-5 py-2 shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${announcedCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-accent-light'}`} />
                            <span className="text-sm font-medium text-text">
                                {announcedCount === 0
                                    ? 'Awaiting results…'
                                    : announcedCount === totalCategories
                                        ? '🎉 All winners announced!'
                                        : `${announcedCount} of ${totalCategories} announced`}
                            </span>
                        </div>
                        <div className="w-24 bg-accent-light rounded-full h-1.5">
                            <div
                                className="bg-primary h-1.5 rounded-full transition-all duration-700"
                                style={{ width: `${(announcedCount / totalCategories) * 100}%` }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* View toggle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex bg-background-elevated border border-accent-light rounded-lg p-1 shadow-sm">
                        <button
                            id="leaderboard-tab"
                            onClick={() => setViewMode('leaderboard')}
                            className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === 'leaderboard'
                                ? 'bg-primary text-text shadow-golden'
                                : 'text-text-light hover:text-text'
                                }`}
                        >
                            🏆 Leaderboard
                        </button>
                        <button
                            id="category-tab"
                            onClick={() => setViewMode('category')}
                            className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === 'category'
                                ? 'bg-primary text-text shadow-golden'
                                : 'text-text-light hover:text-text'
                                }`}
                        >
                            📋 By Category
                        </button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {/* ==================== LEADERBOARD VIEW ==================== */}
                    {viewMode === 'leaderboard' && (
                        <motion.div
                            key="leaderboard"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {/* Top 3 Podium (only when scores are non-zero) */}
                            {announcedCount > 0 && rankedParticipants.slice(0, 3).some(p => p.score.total > 0) && (
                                <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg mx-auto">
                                    {/* 2nd place */}
                                    {rankedParticipants[1] && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex flex-col items-center pt-6"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-[rgba(192,192,192,0.15)] border-2 border-[#C0C0C0] flex items-center justify-center mb-2 shadow-md">
                                                <span className="font-heading font-bold text-xl text-[#C0C0C0]">2</span>
                                            </div>
                                            <div className="bg-background-elevated border border-accent-light rounded-lg px-3 py-2 text-center w-full">
                                                <p className="font-heading text-xs text-text truncate">{rankedParticipants[1].name}</p>
                                                <p className="text-lg font-bold text-[#C0C0C0]">{rankedParticipants[1].score.total}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                    {/* 1st place */}
                                    {rankedParticipants[0] && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col items-center"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-primary-light border-2 border-primary flex items-center justify-center mb-2 shadow-golden animate-golden-glow">
                                                <span className="text-2xl">🏆</span>
                                            </div>
                                            <div className="bg-background-elevated border-2 border-primary rounded-lg px-3 py-2 text-center w-full shadow-golden">
                                                <p className="font-heading text-xs text-text truncate">{rankedParticipants[0].name}</p>
                                                <p className="text-xl font-bold text-primary">{rankedParticipants[0].score.total}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                    {/* 3rd place */}
                                    {rankedParticipants[2] && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="flex flex-col items-center pt-8"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-[rgba(205,127,50,0.15)] border-2 border-[#CD7F32] flex items-center justify-center mb-2 shadow-md">
                                                <span className="font-heading font-bold text-lg text-[#CD7F32]">3</span>
                                            </div>
                                            <div className="bg-background-elevated border border-accent-light rounded-lg px-3 py-2 text-center w-full">
                                                <p className="font-heading text-xs text-text truncate">{rankedParticipants[2].name}</p>
                                                <p className="text-lg font-bold text-[#CD7F32]">{rankedParticipants[2].score.total}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {/* Full Table */}
                            <div className="bg-background-elevated rounded-xl border border-accent-light shadow-md overflow-hidden">
                                {/* Table header */}
                                <div className="grid grid-cols-[2rem_1fr_repeat(3,_auto)] sm:grid-cols-[2.5rem_1fr_repeat(3,_auto)] gap-x-4 px-4 sm:px-6 py-3 bg-accent-light/30 border-b border-accent-light text-xs font-semibold text-text-muted uppercase tracking-wider">
                                    <div>#</div>
                                    <div>Participant</div>
                                    <div className="text-right hidden sm:block">Above</div>
                                    <div className="text-right hidden sm:block">Below</div>
                                    <div className="text-right">Score</div>
                                </div>

                                {rankedParticipants.map((participant, idx) => {
                                    const { score, rank } = participant;
                                    const possible = score.possible;
                                    const isTop = rank === 1 && score.total > 0;
                                    return (
                                        <motion.div
                                            key={participant.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.04 }}
                                            className={`grid grid-cols-[2rem_1fr_repeat(3,_auto)] sm:grid-cols-[2.5rem_1fr_repeat(3,_auto)] gap-x-4 items-center px-4 sm:px-6 py-4 border-b border-accent-light last:border-0 transition-colors hover:bg-primary-light/30 ${isTop ? 'bg-primary-light/20' : ''}`}
                                        >
                                            {/* Rank */}
                                            <div className={`font-heading font-bold text-sm ${getMedalColor(rank)}`}>
                                                {rank}
                                            </div>

                                            {/* Name + mini bar */}
                                            <div className="min-w-0">
                                                <p className="font-heading font-semibold text-text text-sm sm:text-base truncate">
                                                    {participant.name}
                                                    {isTop && <span className="ml-1.5 text-xs text-primary">👑</span>}
                                                </p>
                                                {possible > 0 && (
                                                    <div className="mt-1 flex items-center gap-1.5">
                                                        <div className="flex-1 h-1 bg-accent-light rounded-full max-w-[80px] sm:max-w-[120px]">
                                                            <div
                                                                className="h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500"
                                                                style={{ width: `${(score.total / possible) * 100}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-text-muted">{possible > 0 ? `${Math.round((score.total / possible) * 100)}%` : '-'}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Above the line */}
                                            <div className="text-right hidden sm:block">
                                                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${getScoreBadgeClass(score.aboveTheLine, ABOVE_THE_LINE_CATEGORIES.filter(c => officialResults[c]).length)}`}>
                                                    {score.aboveTheLine}/{ABOVE_THE_LINE_CATEGORIES.filter(c => officialResults[c]).length}
                                                </span>
                                            </div>

                                            {/* Below the line */}
                                            <div className="text-right hidden sm:block">
                                                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${getScoreBadgeClass(score.belowTheLine, BELOW_THE_LINE_CATEGORIES.filter(c => officialResults[c]).length)}`}>
                                                    {score.belowTheLine}/{BELOW_THE_LINE_CATEGORIES.filter(c => officialResults[c]).length}
                                                </span>
                                            </div>

                                            {/* Total */}
                                            <div className="text-right">
                                                <span className={`font-heading font-bold text-lg ${score.total > 0 ? 'text-primary' : 'text-text-muted'}`}>
                                                    {score.total}
                                                </span>
                                                {possible > 0 && (
                                                    <span className="text-text-muted text-xs">/{possible}</span>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Category-by-category breakdown table */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-10"
                            >
                                <h2 className="font-heading text-2xl text-text mb-6 flex items-center gap-2">
                                    <span className="text-primary">✦</span> Category Breakdown
                                </h2>

                                <div className="overflow-x-auto rounded-xl border border-accent-light shadow-md">
                                    <table className="w-full min-w-[640px]">
                                        <thead>
                                            <tr className="bg-accent-light/30 border-b border-accent-light">
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider sticky left-0 bg-accent-light/30 min-w-[160px]">Category</th>
                                                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider min-w-[160px] border-l border-accent-light">
                                                    🏅 Official Winner
                                                </th>
                                                {participants.map((p) => (
                                                    <th key={p.name} className="text-center px-3 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider min-w-[90px] border-l border-accent-light">
                                                        {p.name.split(' ')[0]}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Above-the-line section header */}
                                            <tr>
                                                <td colSpan={2 + participants.length} className="px-4 py-2 bg-primary-light/30 text-xs font-bold text-primary uppercase tracking-widest">
                                                    ⭐ Above the Line
                                                </td>
                                            </tr>
                                            {ABOVE_THE_LINE_CATEGORIES.map((cat, catIdx) => {
                                                const winner = officialResults[cat];
                                                return (
                                                    <tr key={cat} className={`border-b border-accent-light transition-colors hover:bg-primary-light/10 ${catIdx % 2 === 0 ? '' : 'bg-background/40'}`}>
                                                        <td className="px-4 py-3 sticky left-0 bg-background-elevated">
                                                            <div className="flex items-center gap-2 min-w-[150px]">
                                                                <span className="text-base">{CATEGORY_EMOJIS[cat] ?? '🏆'}</span>
                                                                <span className="text-xs font-medium text-text leading-tight">{cat}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 border-l border-accent-light">
                                                            {winner ? (
                                                                <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                                                                    {winner}
                                                                </span>
                                                            ) : (
                                                                <span className="text-xs text-text-muted italic">Not yet announced</span>
                                                            )}
                                                        </td>
                                                        {participants.map((p) => {
                                                            const pred = p.predictions[cat];
                                                            const correct = isCorrect(pred, winner);
                                                            return (
                                                                <td key={p.name} className="px-3 py-3 border-l border-accent-light text-center">
                                                                    {pred ? (
                                                                        <div className="flex flex-col items-center gap-1">
                                                                            <span className={`text-xs leading-tight text-center max-w-[80px] ${winner ? (correct ? 'text-green-700 font-medium' : 'text-text-muted line-through') : 'text-text'}`}>
                                                                                {pred.split(' - ')[0]}
                                                                            </span>
                                                                            {winner && (
                                                                                <span className={`text-sm ${correct ? '✅' : '❌'}`}>
                                                                                    {correct ? '✅' : '❌'}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-text-muted text-sm">–</span>
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}

                                            {/* Below-the-line section header */}
                                            <tr>
                                                <td colSpan={2 + participants.length} className="px-4 py-2 bg-accent-light/50 text-xs font-bold text-text-muted uppercase tracking-widest">
                                                    🎬 Below the Line
                                                </td>
                                            </tr>
                                            {BELOW_THE_LINE_CATEGORIES.map((cat, catIdx) => {
                                                const winner = officialResults[cat];
                                                return (
                                                    <tr key={cat} className={`border-b border-accent-light transition-colors hover:bg-primary-light/10 ${catIdx % 2 === 0 ? '' : 'bg-background/40'}`}>
                                                        <td className="px-4 py-3 sticky left-0 bg-background-elevated">
                                                            <div className="flex items-center gap-2 min-w-[150px]">
                                                                <span className="text-base">{CATEGORY_EMOJIS[cat] ?? '🎬'}</span>
                                                                <span className="text-xs font-medium text-text leading-tight">{cat}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 border-l border-accent-light">
                                                            {winner ? (
                                                                <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                                                                    {winner}
                                                                </span>
                                                            ) : (
                                                                <span className="text-xs text-text-muted italic">Not yet announced</span>
                                                            )}
                                                        </td>
                                                        {participants.map((p) => {
                                                            const pred = p.predictions[cat];
                                                            const correct = isCorrect(pred, winner);
                                                            return (
                                                                <td key={p.name} className="px-3 py-3 border-l border-accent-light text-center">
                                                                    {pred ? (
                                                                        <div className="flex flex-col items-center gap-1">
                                                                            <span className={`text-xs leading-tight text-center max-w-[80px] ${winner ? (correct ? 'text-green-700 font-medium' : 'text-text-muted line-through') : 'text-text'}`}>
                                                                                {pred.split(' - ')[0]}
                                                                            </span>
                                                                            {winner && (
                                                                                <span className="text-sm">
                                                                                    {correct ? '✅' : '❌'}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-text-muted text-sm">–</span>
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ==================== CATEGORY VIEW ==================== */}
                    {viewMode === 'category' && (
                        <motion.div
                            key="category"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid lg:grid-cols-[280px_1fr] gap-6"
                        >
                            {/* Category sidebar */}
                            <div className="bg-background-elevated rounded-xl border border-accent-light shadow-md overflow-hidden h-fit">
                                {/* Above the line */}
                                <div className="px-4 py-2.5 bg-primary-light/40 border-b border-accent-light">
                                    <button
                                        id="section-above"
                                        onClick={() => setCategorySection('above')}
                                        className={`text-xs font-bold uppercase tracking-widest w-full text-left transition-colors ${categorySection === 'above' ? 'text-primary' : 'text-text-muted'}`}
                                    >
                                        ⭐ Above the Line
                                    </button>
                                </div>
                                {ABOVE_THE_LINE_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                                        onClick={() => { setSelectedCategory(cat); setCategorySection('above'); }}
                                        className={`w-full flex items-center gap-2 px-4 py-3 text-left text-sm transition-colors border-b border-accent-light last:border-0 ${selectedCategory === cat ? 'bg-primary-light text-primary font-semibold' : 'text-text-light hover:bg-accent-light/30 hover:text-text'}`}
                                    >
                                        <span>{CATEGORY_EMOJIS[cat]}</span>
                                        <span className="leading-tight">{cat}</span>
                                        {officialResults[cat] && <span className="ml-auto text-green-500 text-xs">✓</span>}
                                    </button>
                                ))}

                                {/* Below the line */}
                                <div className="px-4 py-2.5 bg-accent-light/40 border-t border-b border-accent-light">
                                    <button
                                        id="section-below"
                                        onClick={() => setCategorySection('below')}
                                        className={`text-xs font-bold uppercase tracking-widest w-full text-left transition-colors ${categorySection === 'below' ? 'text-text' : 'text-text-muted'}`}
                                    >
                                        🎬 Below the Line
                                    </button>
                                </div>
                                {BELOW_THE_LINE_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                                        onClick={() => { setSelectedCategory(cat); setCategorySection('below'); }}
                                        className={`w-full flex items-center gap-2 px-4 py-3 text-left text-sm transition-colors border-b border-accent-light last:border-0 ${selectedCategory === cat ? 'bg-primary-light text-primary font-semibold' : 'text-text-light hover:bg-accent-light/30 hover:text-text'}`}
                                    >
                                        <span>{CATEGORY_EMOJIS[cat]}</span>
                                        <span className="leading-tight">{cat}</span>
                                        {officialResults[cat] && <span className="ml-auto text-green-500 text-xs">✓</span>}
                                    </button>
                                ))}
                            </div>

                            {/* Category detail panel */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedCategory}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Category header */}
                                    <div className="bg-background-elevated rounded-xl border border-accent-light shadow-md p-6 mb-4">
                                        <div className="flex items-start gap-4">
                                            <span className="text-4xl">{CATEGORY_EMOJIS[selectedCategory]}</span>
                                            <div className="flex-1">
                                                <h2 className="font-heading text-2xl text-text mb-1">{selectedCategory}</h2>

                                                {currentCategoryWinner ? (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-text-muted uppercase tracking-widest mb-1.5">🏅 Official Winner</p>
                                                        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 px-4 py-2 rounded-lg font-semibold text-sm">
                                                            <span>🏆</span>
                                                            <span>{currentCategoryWinner}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="mt-2 inline-flex items-center gap-2 bg-accent-light/50 text-text-muted px-4 py-2 rounded-lg text-sm">
                                                        <span>⏳</span>
                                                        <span>Not yet announced</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Participants predictions */}
                                    <div className="space-y-2">
                                        {currentCategoryParticipants.map((p, i) => (
                                            <motion.div
                                                key={p.name}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                className={`flex items-center gap-4 bg-background-elevated rounded-lg px-5 py-4 border transition-all ${currentCategoryWinner && p.correct
                                                    ? 'border-green-300 bg-green-50/50 shadow-sm'
                                                    : currentCategoryWinner && p.prediction
                                                        ? 'border-accent-light opacity-80'
                                                        : 'border-accent-light'
                                                    }`}
                                            >
                                                {/* Status icon */}
                                                <div className="w-7 h-7 shrink-0 flex items-center justify-center">
                                                    {currentCategoryWinner ? (
                                                        p.prediction ? (
                                                            <span className="text-xl">{p.correct ? '✅' : '❌'}</span>
                                                        ) : (
                                                            <span className="text-xl text-text-muted">–</span>
                                                        )
                                                    ) : (
                                                        <span className="text-xl">⏳</span>
                                                    )}
                                                </div>

                                                {/* Name */}
                                                <div className="w-28 shrink-0">
                                                    <p className="font-heading font-semibold text-text text-sm truncate">{p.name}</p>
                                                </div>

                                                {/* Prediction */}
                                                <div className="flex-1 min-w-0">
                                                    {p.prediction ? (
                                                        <p className={`text-sm truncate ${currentCategoryWinner
                                                            ? p.correct
                                                                ? 'text-green-700 font-medium'
                                                                : 'text-text-muted'
                                                            : 'text-text'
                                                            }`}>
                                                            {p.prediction}
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm text-text-muted italic">No prediction</p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Stats for this category */}
                                    {currentCategoryWinner && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-4 bg-background-elevated border border-accent-light rounded-lg px-5 py-4 flex items-center justify-between"
                                        >
                                            <span className="text-sm text-text-muted">
                                                Correct predictions
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-2 w-32 bg-accent-light rounded-full overflow-hidden">
                                                    <div
                                                        className="h-2 bg-primary rounded-full transition-all duration-700"
                                                        style={{
                                                            width: `${(currentCategoryParticipants.filter(p => p.correct).length / currentCategoryParticipants.filter(p => p.prediction).length || 0) * 100}%`
                                                        }}
                                                    />
                                                </div>
                                                <span className="font-heading font-bold text-primary">
                                                    {currentCategoryParticipants.filter(p => p.correct).length}
                                                    <span className="text-text-muted font-normal text-sm">/{currentCategoryParticipants.filter(p => p.prediction).length}</span>
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
