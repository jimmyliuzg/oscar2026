import { createContext, useContext, useState, ReactNode } from 'react';

interface Votes {
    bestPicture?: string;
    directing?: string;
    actorLeading?: string;
    actressLeading?: string;
    actorSupporting?: string;
    actressSupporting?: string;
    originalScreenplay?: string;
    adaptedScreenplay?: string;
    // Below the line
    cinematography?: string;
    costumeDesign?: string;
    filmEditing?: string;
    makeupHairstyling?: string;
    originalScore?: string;
    originalSong?: string;
    productionDesign?: string;
    sound?: string;
    visualEffects?: string;
    animatedFeature?: string;
    animatedShort?: string;
    casting?: string;
    documentaryFeature?: string;
    documentaryShort?: string;
    internationalFeature?: string;
    liveActionShort?: string;
}

interface VotingContextType {
    votes: Votes;
    setVote: (category: keyof Votes, value: string) => void;
    clearVotes: () => void;
    currentStep: number;
    setCurrentStep: (step: number) => void;
    isVotingComplete: boolean;
    aboveTheLineComplete: boolean;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

const ABOVE_THE_LINE_CATEGORIES: (keyof Votes)[] = [
    'bestPicture',
    'directing',
    'actorLeading',
    'actressLeading',
    'actorSupporting',
    'actressSupporting',
    'originalScreenplay',
    'adaptedScreenplay',
];

export function VotingProvider({ children }: { children: ReactNode }) {
    const [votes, setVotes] = useState<Votes>({});
    const [currentStep, setCurrentStep] = useState(0);

    const setVote = (category: keyof Votes, value: string) => {
        setVotes(prev => ({ ...prev, [category]: value }));
    };

    const clearVotes = () => {
        setVotes({});
        setCurrentStep(0);
    };

    const aboveTheLineComplete = ABOVE_THE_LINE_CATEGORIES.every(
        cat => votes[cat] !== undefined
    );

    const isVotingComplete = aboveTheLineComplete;

    return (
        <VotingContext.Provider
            value={{
                votes,
                setVote,
                clearVotes,
                currentStep,
                setCurrentStep,
                isVotingComplete,
                aboveTheLineComplete,
            }}
        >
            {children}
        </VotingContext.Provider>
    );
}

export function useVoting() {
    const context = useContext(VotingContext);
    if (context === undefined) {
        throw new Error('useVoting must be used within a VotingProvider');
    }
    return context;
}
