import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { accessLevel, logout } = useAuth();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const navItems = [
        { path: '/', label: 'Home', guestOnly: false },
        { path: '/nominations', label: 'Nominations', guestOnly: false },
        { path: '/vote', label: 'Vote', guestOnly: false },
    ];

    const filteredNavItems = navItems.filter(item => {
        if (item.guestOnly && accessLevel !== 'guest') return false;
        return true;
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="sticky top-0 z-50 glass border-b border-accent-light"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl group-hover:animate-bounce">🏆</span>
                        <span className="font-heading text-xl text-text hidden sm:block">
                            Oscars 2026
                        </span>
                    </a>

                    {/* Navigation */}
                    <nav className="flex items-center gap-1 sm:gap-2">
                        {filteredNavItems.map((item) => {
                            // Simple check for active state
                            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
                            return (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                        ? 'text-primary'
                                        : 'text-text-light hover:text-text hover:bg-accent-light'
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* User actions */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-text-muted hidden sm:block">
                            {accessLevel === 'guest' ? '🎟️ Guest' : '👤 Public'}
                        </span>
                        <button
                            onClick={logout}
                            className="text-sm text-text-light hover:text-secondary transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
