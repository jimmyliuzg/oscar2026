import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function PasswordGate() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const success = await login(password);

        if (!success) {
            setError('Invalid password. Please try again.');
            setPassword('');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative w-full max-w-md"
            >
                <div className="bg-background-elevated/90 backdrop-blur-md rounded-xl p-8 shadow-xl border border-accent-light">
                    {/* Oscar statuette icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-golden">
                            <span className="text-4xl">🏆</span>
                        </div>
                    </div>

                    <h1 className="font-heading text-3xl text-center text-text mb-2">
                        2026 Oscars Party
                    </h1>
                    <p className="text-text-light text-center mb-8 font-accent italic">
                        Enter your password to continue
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="input text-center"
                                autoFocus
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-secondary text-center text-sm"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin">⌛</span>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Enter the Party
                                    <span>✨</span>
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-text-muted text-xs text-center mt-6">
                        Don't have a password? Contact the host.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
