import AppShell from './AppShell';
import HomePage from './pages/HomePage';
import NominationsPage from './pages/NominationsPage';
import VotingPage from './pages/VotingPage';

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
