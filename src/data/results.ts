// ============================================================================
// 98th Academy Awards (2026) - Official Results
// Update this file as winners are announced on Oscar night.
// Format: Record<CategoryName, WinnerString> matching the prediction format.
// ============================================================================

/**
 * Official Oscar results.
 * Keys must match exactly the category names used in predictions.
 * Values should match the "Name/Film - Film" format from predictions.
 * Leave a category's value as empty string ("") if not yet announced.
 */
export const officialResults: Record<string, string> = {
    "Best Picture": "",
    "Directing": "",
    "Actor in a Leading Role": "",
    "Actress in a Leading Role": "",
    "Actor in a Supporting Role": "",
    "Actress in a Supporting Role": "",
    "Writing (Original Screenplay)": "",
    "Writing (Adapted Screenplay)": "",
    "Animated Feature Film": "",
    "International Feature Film": "",
    "Cinematography": "",
    "Costume Design": "",
    "Film Editing": "",
    "Makeup and Hairstyling": "",
    "Music (Original Score)": "",
    "Music (Original Song)": "",
    "Production Design": "",
    "Sound": "",
    "Visual Effects": "",
    "Casting": "",
    "Animated Short Film": "",
    "Documentary Feature Film": "",
    "Documentary Short Film": "",
    "Live Action Short Film": "",
};

/** The canonical ordered list of all categories */
export const ALL_CATEGORIES = Object.keys(officialResults);

/** Above-the-line category names */
export const ABOVE_THE_LINE_CATEGORIES = [
    "Best Picture",
    "Directing",
    "Actor in a Leading Role",
    "Actress in a Leading Role",
    "Actor in a Supporting Role",
    "Actress in a Supporting Role",
    "Writing (Original Screenplay)",
    "Writing (Adapted Screenplay)",
];

/** Below-the-line category names */
export const BELOW_THE_LINE_CATEGORIES = ALL_CATEGORIES.filter(
    (c) => !ABOVE_THE_LINE_CATEGORIES.includes(c)
);

/** Check if a prediction matches the official result */
export function isCorrect(prediction: string | undefined, official: string): boolean {
    if (!prediction || !official) return false;
    // Normalize: lowercase, trim
    return prediction.trim().toLowerCase() === official.trim().toLowerCase();
}

/** Score a participant's predictions */
export function scoreParticipant(predictions: Record<string, string>): {
    total: number;
    aboveTheLine: number;
    belowTheLine: number;
    possible: number;
} {
    let aboveTheLine = 0;
    let belowTheLine = 0;
    let possible = 0;

    for (const [cat, official] of Object.entries(officialResults)) {
        if (!official) continue; // Not yet announced
        possible++;
        const correct = isCorrect(predictions[cat], official);
        if (ABOVE_THE_LINE_CATEGORIES.includes(cat)) {
            if (correct) aboveTheLine++;
        } else {
            if (correct) belowTheLine++;
        }
    }

    return {
        total: aboveTheLine + belowTheLine,
        aboveTheLine,
        belowTheLine,
        possible,
    };
}
