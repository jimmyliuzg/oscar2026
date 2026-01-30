import { motion } from 'framer-motion';

import { useVoting } from '../../context/VotingContext';

export default function SubmissionConfirmation() {
    const { clearVotes } = useVoting();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center py-12"
        >
            {/* Success animation */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-golden animate-golden-glow"
            >
                <span className="text-5xl">🏆</span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-heading text-3xl text-text mb-4"
            >
                Predictions Submitted!
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-text-light mb-8"
            >
                Your Oscar predictions have been recorded. We'll see how you did on March 15th!
                Check your email for a confirmation.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-background-elevated rounded-xl p-6 border border-accent-light mb-8"
            >
                <h3 className="font-heading text-lg text-text mb-3">What's Next?</h3>
                <ul className="text-text-light text-left space-y-2">
                    <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Browse the complete nominations
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Watch trailers for films you haven't seen
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        Join us at the party on March 15th!
                    </li>
                </ul>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <a href="/nominations" className="btn-outline">
                    View Nominations
                </a>
                <a
                    href="/vote"
                    onClick={() => clearVotes()}
                    className="btn-primary"
                >
                    Vote Again
                </a>
            </motion.div>
        </motion.div>
    );
}
