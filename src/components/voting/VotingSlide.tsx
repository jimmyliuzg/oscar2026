import { motion } from 'framer-motion';
import { Category, Nominee } from '../../data/nominations';
import NomineeCard from '../nominations/NomineeCard';

interface VotingSlideProps {
    category: Category;
    selectedId?: string;
    onSelect: (nominee: Nominee) => void;
    currentStep: number;
    totalSteps: number;
}

export default function VotingSlide({
    category,
    selectedId,
    onSelect,
    currentStep,
    totalSteps,
}: VotingSlideProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-200px)] flex flex-col"
        >
            {/* Progress indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-muted">
                        Category {currentStep} of {totalSteps}
                    </span>
                    <span className="text-sm font-medium text-primary">
                        {Math.round((currentStep / totalSteps) * 100)}%
                    </span>
                </div>
                <div className="h-2 bg-accent-light rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                    />
                </div>
            </div>

            {/* Category title */}
            <div className="text-center mb-8">
                <span className="inline-block text-4xl mb-4">🏆</span>
                <h2 className="font-heading text-3xl sm:text-4xl text-text mb-2">
                    {category.name}
                </h2>
                <p className="text-text-light">
                    Select your prediction for this category
                </p>
            </div>

            {/* Nominees grid */}
            <div className="flex-1">
                <div className={`grid gap-4 ${category.nominees.length <= 5
                    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 max-w-4xl mx-auto'
                    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                    }`}>
                    {category.nominees.map((nominee) => (
                        <NomineeCard
                            key={nominee.id}
                            nominee={nominee}
                            categoryId={category.id}
                            isSelected={selectedId === nominee.id}
                            onSelect={() => onSelect(nominee)}
                            showPoster={true}
                        />
                    ))}
                </div>
            </div>

            {/* Selection feedback */}
            {selectedId && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                >
                    <p className="text-primary font-medium">
                        ✓ Selection saved! Click "Next" to continue.
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
