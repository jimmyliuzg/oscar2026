import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AccessLevel = 'guest' | 'public' | 'none';

interface AuthContextType {
    accessLevel: AccessLevel;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'oscar_access_level';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessLevel, setAccessLevel] = useState<AccessLevel>('none');
    const [isLoading, setIsLoading] = useState(true);

    // Restore session from sessionStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem(STORAGE_KEY) as AccessLevel;
            if (stored === 'guest' || stored === 'public') {
                setAccessLevel(stored);
            }
            setIsLoading(false);
        }
    }, []);

    // Sync state changes to storage
    useEffect(() => {
        if (typeof window !== 'undefined' && !isLoading) {
            if (accessLevel === 'none') {
                sessionStorage.removeItem(STORAGE_KEY);
            } else {
                sessionStorage.setItem(STORAGE_KEY, accessLevel);
            }
        }
    }, [accessLevel, isLoading]);

    const login = async (password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.success && data.accessLevel) {
                setAccessLevel(data.accessLevel);
                return { success: true };
            }

            return { success: false, error: data.error || 'Invalid password' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'An error occurred. Please try again.' };
        }
    };

    const logout = () => {
        setAccessLevel('none');
    };

    return (
        <AuthContext.Provider
            value={{
                accessLevel,
                isAuthenticated: accessLevel !== 'none',
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
