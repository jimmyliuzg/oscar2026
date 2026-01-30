import { ReactNode } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { VotingProvider } from '../context/VotingContext';
import PasswordGate from './auth/PasswordGate';
import Header from './layout/Header';
import Footer from './layout/Footer';


// Inner component to handle the Gate logic
function ShellContent({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <PasswordGate />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header needs Router context because it uses Link */}
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}

// Main Wrapper
export default function AppShell({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <VotingProvider>
                <ShellContent>
                    {children}
                </ShellContent>
            </VotingProvider>
        </AuthProvider>
    );
}
