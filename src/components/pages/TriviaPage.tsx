import { motion } from 'framer-motion';
import { triviaQuestions } from '../../data/trivia';
import TriviaCard from '../party/TriviaCard';

export default function TriviaPage() {
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
                        <span className="text-3xl">🧠</span>
                    </div>
                    <h1 className="font-heading text-4xl md:text-5xl text-text mb-3">
                        Oscar Night Trivia
                    </h1>
                    <p className="text-text-light text-lg mb-8">
                        Test your Academy Awards knowledge
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {triviaQuestions.map((trivia, index) => (
                        <TriviaCard key={index} trivia={trivia} index={index + 1} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
