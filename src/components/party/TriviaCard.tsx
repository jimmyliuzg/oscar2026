import { useState } from 'react';
import { motion } from 'framer-motion';
import type { TriviaQuestion } from '../../data/trivia';

export default function TriviaCard({ trivia, index }: { trivia: TriviaQuestion; index: number }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const difficultyColor = 
        trivia.difficulty === 'Easy' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
        trivia.difficulty === 'Medium' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' :
        'text-red-500 bg-red-500/10 border-red-500/20';

    return (
        <div 
            className="perspective-1000 relative h-64 w-full cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full preserve-3d relative"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-background-elevated border border-accent-light rounded-xl p-6 shadow-md flex flex-col items-center justify-center text-center group-hover:border-primary/50 transition-colors">
                    <div className="absolute top-4 left-4 text-xs font-bold text-text-muted">#{index}</div>
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-semibold border ${difficultyColor}`}>
                        {trivia.difficulty}
                    </div>
                    <div className="text-4xl mb-4">🧠</div>
                    <h3 className="font-heading text-lg text-text font-medium px-2">{trivia.question}</h3>
                    <div className="absolute bottom-4 text-xs text-text-muted italic flex items-center gap-1">
                        Tap to reveal
                        <span className="text-primary group-hover:animate-bounce">↺</span>
                    </div>
                </div>

                {/* Back */}
                <div 
                    className="absolute inset-0 backface-hidden bg-primary-light/10 border-2 border-primary rounded-xl p-6 shadow-golden flex flex-col items-center justify-center text-center"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <div className="absolute top-4 right-4 text-2xl">✨</div>
                    <div className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Answer</div>
                    <h3 className="font-heading text-2xl font-bold text-text mb-4 px-2">{trivia.answer}</h3>
                    <div className="bg-background-elevated/80 rounded-lg p-3 w-full border border-accent-light">
                        <p className="text-sm text-text-light">{trivia.connection}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
