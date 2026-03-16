import AppShell from './AppShell';
import HomePage from './pages/HomePage';
import NominationsPage from './pages/NominationsPage';
import VotingPage from './pages/VotingPage';
import ResultsPage from './pages/ResultsPage';
import TriviaPage from './pages/TriviaPage';

export const ConnectedHome = () => (
    <AppShell>
        <HomePage />
    </AppShell>
);

export const ConnectedNominations = () => (
    <AppShell>
        <NominationsPage />
    </AppShell>
);

export const ConnectedVoting = () => (
    <AppShell>
        <VotingPage />
    </AppShell>
);

export const ConnectedResults = () => (
    <AppShell>
        <ResultsPage />
    </AppShell>
);

export const ConnectedTrivia = () => (
    <AppShell>
        <TriviaPage />
    </AppShell>
);
