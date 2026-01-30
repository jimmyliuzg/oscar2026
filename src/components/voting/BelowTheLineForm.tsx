import { motion } from 'framer-motion';
import { belowTheLineCategories } from '../../data/nominations';
import { useVoting } from '../../context/VotingContext';

interface BelowTheLineFormProps {
    onComplete: () => void;
    onSkip: () => void;
}

export default function BelowTheLineForm({ onComplete, onSkip }: BelowTheLineFormProps) {
    const { votes, setVote } = useVoting();

    // Check if any below the line votes are set
    const hasAnyVotes = belowTheLineCategories.some(
        cat => votes[cat.id as keyof typeof votes]
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
        >
            <div className="text-center mb-8">
                <span className="inline-block text-4xl mb-4">🎬</span>
                <h2 className="font-heading text-3xl text-text mb-2">
                    Below the Line Categories
                </h2>
                <p className="text-text-light">
                    These are optional but earn you extra points!
                </p>
            </div>

            <div className="bg-background-elevated rounded-xl p-6 border border-accent-light mb-6">
                <div className="space-y-6">
                    {belowTheLineCategories.map((category) => (
                        <div key={category.id}>
                            <label
                                htmlFor={category.id}
                                className="block text-sm font-medium text-text mb-2"
                            >
                                {category.name}
                            </label>
                            <select
                                id={category.id}
                                value={votes[category.id as keyof typeof votes] || ''}
                                onChange={(e) =>
                                    setVote(category.id as keyof typeof votes, e.target.value)
                                }
                                className="input"
                            >
                                <option value="">Select your pick...</option>
                                {category.nominees.map((nominee) => (
                                    <option key={nominee.id} value={nominee.id}>
                                        {nominee.name} - {nominee.film}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={onSkip} className="btn-outline">
                    Skip This Section
                </button>
                <button
                    onClick={onComplete}
                    className="btn-primary"
                    disabled={!hasAnyVotes}
                >
                    {hasAnyVotes ? 'Save & Continue' : 'Select at least one'}
                </button>
            </div>
        </motion.div>
    );
}
