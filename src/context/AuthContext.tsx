import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AccessLevel = 'guest' | 'public' | 'none';

interface AuthContextType {
    accessLevel: AccessLevel;
    isAuthenticated: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// SHA-256 hash function
async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Pre-computed hashes for comparison
const GUEST_PASSWORD_HASH = import.meta.env.VITE_GUEST_PASSWORD_HASH;
const PUBLIC_PASSWORD_HASH = import.meta.env.VITE_PUBLIC_PASSWORD_HASH;

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessLevel, setAccessLevel] = useState<AccessLevel>('none');

    // Check for existing session on mount
    useEffect(() => {
        const storedLevel = sessionStorage.getItem('accessLevel') as AccessLevel;
        if (storedLevel === 'guest' || storedLevel === 'public') {
            setAccessLevel(storedLevel);
        }
    }, []);

    const login = async (password: string): Promise<boolean> => {
        const inputHash = await sha256(password);

        if (inputHash === GUEST_PASSWORD_HASH) {
            setAccessLevel('guest');
            sessionStorage.setItem('accessLevel', 'guest');
            return true;
        } else if (inputHash === PUBLIC_PASSWORD_HASH) {
            setAccessLevel('public');
            sessionStorage.setItem('accessLevel', 'public');
            return true;
        }

        return false;
    };

    const logout = () => {
        setAccessLevel('none');
        sessionStorage.removeItem('accessLevel');
    };

    return (
        <AuthContext.Provider
            value={{
                accessLevel,
                isAuthenticated: accessLevel !== 'none',
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
