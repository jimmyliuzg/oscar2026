import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import InviteDetails from '../party/InviteDetails';
import RSVPForm from '../party/RSVPForm';
import FeaturedCarousel from '../FeaturedCarousel';

export default function HomePage() {
    const { accessLevel } = useAuth();
    const isGuest = accessLevel === 'guest';

    // Calculate countdown to March 15, 2026
    const eventDate = new Date('2026-03-15T18:00:00-08:00');
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return (
        <div className="page-transition">
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
                            {diffDays > 0 ? `${diffDays} days until Oscar night!` : 'Oscar night is here!'}
                        </div>

                        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-text mb-6">
                            <span className="text-gradient-gold">2026 Oscars</span>
                            <br />
                            Watch Party
                        </h1>

                        <p className="text-lg sm:text-xl text-text-light mb-8 font-accent italic">
                            {isGuest
                                ? "You're invited to an evening of glamour, predictions, and cinema celebration."
                                : "Browse the nominations and submit your predictions for Oscar night."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/vote" className="btn-primary">
                                Make Your Predictions 🏆
                            </a>
                            <a href="/nominations" className="btn-outline">
                                View Nominations
                            </a>
                        </div>
                    </motion.div>

                    {/* Countdown cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
                    >
                        {[
                            { label: 'Best Picture', value: '10', icon: '🎬' },
                            { label: 'Categories', value: '24', icon: '🏆' },
                            { label: 'Nominees', value: '100+', icon: '⭐' },
                            { label: 'Party Date', value: 'Mar 15', icon: '📅' },
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

            {/* Guest-only Party Details Section */}
            {isGuest && (
                <section className="section">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid lg:grid-cols-2 gap-8"
                    >
                        <InviteDetails />
                        <RSVPForm />
                    </motion.div>
                </section>
            )}

            {/* Public: Teaser Section */}
            {!isGuest && (
                <section className="section">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-background-elevated rounded-xl p-8 border border-accent-light text-center max-w-2xl mx-auto"
                    >
                        <span className="text-4xl block mb-4">🎥</span>
                        <h2 className="font-heading text-2xl text-text mb-4">
                            2026 Academy Awards
                        </h2>
                        <p className="text-text-light mb-6">
                            The 98th Academy Awards ceremony will honor the best films of 2025.
                            Browse all 24 categories and submit your predictions before Oscar night!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/nominations" className="btn-secondary">
                                Browse Nominations
                            </a>
                            <a href="/vote" className="btn-primary">
                                Submit Predictions
                            </a>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Featured Films Section */}
            <section className="section pt-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <h2 className="font-heading text-2xl text-center text-text mb-8">
                        Featured Nominees
                    </h2>

                    <FeaturedCarousel
                        films={[
                            { title: 'Sinners', nominations: 16, year: 2025 },
                            { title: 'One Battle after Another', nominations: 12, year: 2025 },
                            { title: 'Hamnet', nominations: 10, year: 2025 },
                            { title: 'Marty Supreme', nominations: 9, year: 2025 },
                            { title: 'Frankenstein', nominations: 8, year: 2025 },
                        ]}
                    />
                </motion.div>
            </section>
        </div>
    );
}
