const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;

interface RSVPData {
    name: string;
    email: string;
    attending: 'yes' | 'no';
    dietaryRestrictions?: string;
    guestCount?: number;
}

interface VotingData {
    name: string;
    email: string;
    predictions: Record<string, string>;
}

interface Web3FormsResponse {
    success: boolean;
    message: string;
}

/**
 * Submit RSVP form to Web3Forms
 */
export async function submitRSVP(data: RSVPData): Promise<Web3FormsResponse> {
    try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                subject: `🎬 Oscar Party RSVP: ${data.name}`,
                from_name: 'Oscar Party 2026',
                ...data,
                submitted_at: new Date().toISOString(),
            }),
        });

        return await response.json();
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        return { success: false, message: 'Failed to submit RSVP. Please try again.' };
    }
}

/**
 * Submit voting predictions to Web3Forms
 */
export async function submitVotes(data: VotingData): Promise<Web3FormsResponse> {
    try {
        // Format predictions for readability in email
        const formattedPredictions = Object.entries(data.predictions)
            .map(([category, choice]) => `${category}: ${choice}`)
            .join('\n');

        const response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                subject: `🏆 Oscar Predictions: ${data.name}`,
                from_name: 'Oscar Party 2026',
                name: data.name,
                email: data.email,
                predictions: formattedPredictions,
                predictions_json: JSON.stringify(data.predictions),
                submitted_at: new Date().toISOString(),
            }),
        });

        return await response.json();
    } catch (error) {
        console.error('Error submitting votes:', error);
        return { success: false, message: 'Failed to submit predictions. Please try again.' };
    }
}
