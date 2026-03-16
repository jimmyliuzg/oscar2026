import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WinnerSpotlight from '../WinnerSpotlight';

export default function HomePage() {
    const [showThankYou, setShowThankYou] = useState(false);

    useEffect(() => {
        // Show thank-you popup once per session
        const dismissed = sessionStorage.getItem('thankyou_dismissed');
        if (!dismissed) {
            setShowThankYou(true);
        }
    }, []);

    const dismissThankYou = () => {
        sessionStorage.setItem('thankyou_dismissed', '1');
        setShowThankYou(false);
    };

    return (
        <div className="page-transition">

            {/* Thank-You Modal */}
            <AnimatePresence>
                {showThankYou && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={dismissThankYou}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 10 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="bg-background-elevated border border-accent-light rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-5 shadow-golden animate-golden-glow">
                                <span className="text-4xl">🏆</span>
                            </div>
                            <h2 className="font-heading text-3xl text-text mb-3">
                                Thank You!
                            </h2>
                            <p className="text-text-light text-lg font-accent italic mb-2">
                                We loved hosting and are so thankful for all of you for coming.
                            </p>
                            <p className="text-text-muted text-sm mb-7">
                                Hope everyone had a great time celebrating cinema together. Here's to more great movies! 🎬✨
                            </p>
                            <button
                                onClick={dismissThankYou}
                                className="btn-primary w-full"
                            >
                                View the Results 🏆
                            </button>
                            <p className="text-text-muted text-xs mt-4 cursor-pointer hover:text-text transition-colors" onClick={dismissThankYou}>
                                Close
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-12 sm:py-16">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
                </div>

                <div className="section relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span className="text-lg">🎬</span>
                            98th Academy Awards — March 2026
                        </div>

                        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text mb-6">
                            <span className="text-gradient-gold">2026 Oscars</span>
                            <br />
                            Watch Party
                        </h1>

                        <p className="text-lg sm:text-xl text-text-light mb-8 font-accent italic">
                            Browse all 24 categories, explore the nominees, and see how the night unfolded.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/results" className="btn-primary">
                                See the Results 🏆
                            </a>
                            <a href="/nominations" className="btn-outline">
                                View Nominations
                            </a>
                        </div>
                    </motion.div>

                    {/* Stats cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto"
                    >
                        {[
                            { label: 'Best Picture Nominees', value: '10', icon: '🎬' },
                            { label: 'Total Categories', value: '24', icon: '🏆' },
                            { label: 'Total Nominees', value: '100+', icon: '⭐' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                className="bg-background-elevated rounded-xl p-4 text-center border border-accent-light shadow-sm"
                            >
                                <span className="text-2xl block mb-1">{stat.icon}</span>
                                <p className="font-heading text-2xl text-primary">{stat.value}</p>
                                <p className="text-xs text-text-muted">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Winner Spotlight */}
            <section className="section pt-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="font-heading text-2xl text-center text-text mb-2">
                        🏆 2026 Oscar Winners
                    </h2>
                    <p className="text-center text-sm text-text-muted mb-6">Click a card to view on TMDB</p>

                    <WinnerSpotlight />
                </motion.div>
            </section>
        </div>
    );
}
