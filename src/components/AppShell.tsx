import { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { VotingProvider } from '../context/VotingContext';
import Header from './layout/Header';
import Footer from './layout/Footer';

function ShellContent({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
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
