import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useVoting } from '../../context/VotingContext';
import { submitVotes } from '../../services/web3forms';
import { categories, getCategoryById } from '../../data/nominations';

interface SubmissionFormData {
    name: string;
    email: string;
}

interface SubmissionFormProps {
    onSuccess: () => void;
}

export default function SubmissionForm({ onSuccess }: SubmissionFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const { votes } = useVoting();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubmissionFormData>();

    // Format votes for display
    const formatVotes = () => {
        const formatted: Record<string, string> = {};

        Object.entries(votes).forEach(([categoryId, nomineeId]) => {
            if (nomineeId) {
                const category = getCategoryById(categoryId);
                if (category) {
                    const nominee = category.nominees.find(n => n.id === nomineeId);
                    if (nominee) {
                        formatted[category.name] = `${nominee.name} - ${nominee.film}`;
                    }
                }
            }
        });

        return formatted;
    };

    const onSubmit = async (data: SubmissionFormData) => {
        setIsSubmitting(true);
        setSubmitError('');

        const formattedVotes = formatVotes();

        const result = await submitVotes({
            name: data.name,
            email: data.email,
            predictions: formattedVotes,
        });

        setIsSubmitting(false);

        if (result.success) {
            onSuccess();
        } else {
            setSubmitError(result.message);
        }
    };

    // Count completed categories
    const aboveTheLineCount = categories
        .filter(c => c.isAboveTheLine)
        .filter(c => votes[c.id as keyof typeof votes])
        .length;

    const belowTheLineCount = categories
        .filter(c => !c.isAboveTheLine)
        .filter(c => votes[c.id as keyof typeof votes])
        .length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
        >
            <div className="text-center mb-8">
                <span className="inline-block text-4xl mb-4">📋</span>
                <h2 className="font-heading text-3xl text-text mb-2">
                    Review & Submit
                </h2>
                <p className="text-text-light">
                    Enter your details to submit your predictions
                </p>
            </div>

            {/* Summary */}
            <div className="bg-background-elevated rounded-xl p-6 border border-accent-light mb-6">
                <h3 className="font-heading text-lg text-text mb-4">Your Predictions</h3>

                <div className="flex gap-4 mb-4">
                    <div className="flex-1 bg-primary-light rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{aboveTheLineCount}/8</p>
                        <p className="text-sm text-text-light">Above the Line</p>
                    </div>
                    <div className="flex-1 bg-accent-light rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-accent">{belowTheLineCount}/16</p>
                        <p className="text-sm text-text-light">Below the Line</p>
                    </div>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {Object.entries(formatVotes()).map(([category, selection]) => (
                        <div key={category} className="flex justify-between text-sm py-1 border-b border-accent-light last:border-0">
                            <span className="text-text-light">{category}</span>
                            <span className="text-text font-medium text-right">{selection}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit form */}
            <div className="bg-background-elevated rounded-xl p-6 border border-accent-light">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                            Your Name <span className="text-secondary">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="input"
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <p className="text-secondary text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                            Email <span className="text-secondary">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            className="input"
                            placeholder="your@email.com"
                        />
                        {errors.email && (
                            <p className="text-secondary text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {submitError && (
                        <p className="text-secondary text-sm text-center">{submitError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="animate-spin">⏳</span>
                                Submitting...
                            </span>
                        ) : (
                            <>
                                Submit Predictions 🏆
                            </>
                        )}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
