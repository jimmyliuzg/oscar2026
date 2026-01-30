import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VotingProvider } from './context/VotingContext';
import PasswordGate from './components/auth/PasswordGate';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NominationsPage from './pages/NominationsPage';
import VotingPage from './pages/VotingPage';

function AppContent() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <PasswordGate />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/nominations" element={<NominationsPage />} />
                    <Route path="/vote" element={<VotingPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <VotingProvider>
                    <AppContent />
                </VotingProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
