import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboveTheLineCategories } from '../../data/nominations';
import { useVoting } from '../../context/VotingContext';
import VotingSlide from '../voting/VotingSlide';
import BelowTheLineForm from '../voting/BelowTheLineForm';
import SubmissionForm from '../voting/SubmissionForm';
import SubmissionConfirmation from '../voting/SubmissionConfirmation';

type VotingPhase = 'intro' | 'aboveTheLine' | 'belowTheLine' | 'submission' | 'confirmation';

export default function VotingPage() {
    const [phase, setPhase] = useState<VotingPhase>('intro');
    const { votes, setVote, currentStep, setCurrentStep } = useVoting();

    const totalAboveTheLineSteps = aboveTheLineCategories.length;
    const currentCategory = aboveTheLineCategories[currentStep];

    const handleNext = () => {
        if (currentStep < totalAboveTheLineSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setPhase('belowTheLine');
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStartVoting = () => {
        setCurrentStep(0);
        setPhase('aboveTheLine');
    };

    return (
        <div className="page-transition min-h-[calc(100vh-200px)]">
            <div className="section">
                <AnimatePresence mode="wait">
                    {/* Intro */}
                    {phase === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-2xl mx-auto text-center py-12"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-golden">
                                <span className="text-4xl">🏆</span>
                            </div>

                            <h1 className="font-heading text-4xl text-text mb-4">
                                Oscar Predictions
                            </h1>
                            <p className="text-text-light mb-8 text-lg">
                                Make your picks for the 2026 Academy Awards! Start with the 8 major
                                "above the line" categories, then optionally fill out the remaining 16
                                technical categories.
                            </p>

                            <div className="bg-background-elevated rounded-xl p-6 border border-accent-light mb-8">
                                <h3 className="font-heading text-lg text-text mb-4">How it works</h3>
                                <div className="grid sm:grid-cols-3 gap-4 text-left">
                                    <div className="flex items-start gap-3">
                                        <span className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold">1</span>
                                        <p className="text-sm text-text-light">Pick your winners for 8 major categories</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold">2</span>
                                        <p className="text-sm text-text-light">Optionally fill out 16 technical categories</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold">3</span>
                                        <p className="text-sm text-text-light">Submit your predictions and see how you do!</p>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleStartVoting} className="btn-primary text-lg px-12">
                                Start Voting ✨
                            </button>
                        </motion.div>
                    )}

                    {/* Above the Line voting */}
                    {phase === 'aboveTheLine' && currentCategory && (
                        <motion.div
                            key={`voting-${currentStep}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <VotingSlide
                                category={currentCategory}
                                selectedId={votes[currentCategory.id as keyof typeof votes]}
                                onSelect={(nominee) => setVote(currentCategory.id as keyof typeof votes, nominee.id)}
                                currentStep={currentStep + 1}
                                totalSteps={totalAboveTheLineSteps}
                            />

                            {/* Navigation */}
                            <div className="flex justify-between items-center mt-8 pt-8 border-t border-accent-light">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentStep === 0}
                                    className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ← Previous
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={!votes[currentCategory.id as keyof typeof votes]}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {currentStep === totalAboveTheLineSteps - 1 ? 'Continue →' : 'Next →'}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Below the Line form */}
                    {phase === 'belowTheLine' && (
                        <motion.div
                            key="belowTheLine"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <BelowTheLineForm
                                onComplete={() => setPhase('submission')}
                                onSkip={() => setPhase('submission')}
                            />
                        </motion.div>
                    )}

                    {/* Submission form */}
                    {phase === 'submission' && (
                        <motion.div
                            key="submission"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <SubmissionForm onSuccess={() => setPhase('confirmation')} />
                        </motion.div>
                    )}

                    {/* Confirmation */}
                    {phase === 'confirmation' && (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <SubmissionConfirmation />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
