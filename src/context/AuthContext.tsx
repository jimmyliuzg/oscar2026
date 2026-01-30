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
    const [accessLevel, setAccessLevel] = useState<AccessLevel>(() => {
        if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem('accessLevel') as AccessLevel;
            return (stored === 'guest' || stored === 'public') ? stored : 'none';
        }
        return 'none';
    });

    // Sync state changes to storage (though login/logout helpers do this, it keeps it safe)
    useEffect(() => {
        if (accessLevel === 'none') {
            sessionStorage.removeItem('accessLevel');
        } else {
            sessionStorage.setItem('accessLevel', accessLevel);
        }
    }, [accessLevel]);

    const login = async (password: string): Promise<boolean> => {
        const inputHash = await sha256(password);

        if (inputHash === GUEST_PASSWORD_HASH) {
            setAccessLevel('guest');
            return true;
        } else if (inputHash === PUBLIC_PASSWORD_HASH) {
            setAccessLevel('public');
            return true;
        }

        return false;
    };

    const logout = () => {
        setAccessLevel('none');
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
