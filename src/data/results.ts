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
    "Actor in a Supporting Role": "Sean Penn - One Battle after Another",
    "Actress in a Supporting Role": "Amy Madigan - Weapons",
    "Writing (Original Screenplay)": "Ryan Coogler - Sinners",
    "Writing (Adapted Screenplay)": "Paul Thomas Anderson - One Battle after Another",
    "Animated Feature Film": "KPop Demon Hunters - KPop Demon Hunters",
    "International Feature Film": "Sentimental Value - Sentimental Value",
    "Cinematography": "Autumn Durald Arkapaw - Sinners",
    "Costume Design": "Kate Hawley - Frankenstein",
    "Film Editing": "Andy Jurgensen - One Battle after Another",
    "Makeup and Hairstyling": "Frankenstein - Frankenstein",
    "Music (Original Score)": "Ludwig Goransson - Sinners",
    "Music (Original Song)": "\"Golden\" - KPop Demon Hunters",
    "Production Design": "Frankenstein - Frankenstein",
    "Sound": "F1 - F1",
    "Visual Effects": "Avatar: Fire and Ash - Avatar: Fire and Ash",
    "Casting": "Cassandra Kulukundis - One Battle after Another",
    "Animated Short Film": "The Girl Who Cried Pearls - The Girl Who Cried Pearls",
    "Documentary Feature Film": "Mr. Nobody Against Putin - Mr. Nobody Against Putin",
    "Documentary Short Film": "All the Empty Rooms - All the Empty Rooms",
    "Live Action Short Film": "The Singers - The Singers | Two People Exchanging Saliva - Two People Exchanging Saliva",
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

/** Point values */
export const POINTS_ABOVE_THE_LINE = 3;
export const POINTS_BELOW_THE_LINE = 1;

/** Get point value for a category */
export function getPointValue(category: string): number {
    return ABOVE_THE_LINE_CATEGORIES.includes(category)
        ? POINTS_ABOVE_THE_LINE
        : POINTS_BELOW_THE_LINE;
}

/** Check if a prediction matches the official result */
export function isCorrect(prediction: string | undefined, official: string): boolean {
    if (!prediction || !official) return false;
    // Normalize: lowercase, trim
    const predNormalized = prediction.trim().toLowerCase();
    // Handle ties separated by |
    const officials = official.split('|').map(s => s.trim().toLowerCase());
    return officials.includes(predNormalized);
}

/** Score a participant's predictions (weighted: 5pts above-the-line, 1pt below-the-line) */
export function scoreParticipant(predictions: Record<string, string>): {
    total: number;
    aboveTheLine: number;
    belowTheLine: number;
    possiblePoints: number;
    correctAbove: number;
    correctBelow: number;
    announcedAbove: number;
    announcedBelow: number;
} {
    let aboveTheLine = 0;
    let belowTheLine = 0;
    let correctAbove = 0;
    let correctBelow = 0;
    let announcedAbove = 0;
    let announcedBelow = 0;

    for (const [cat, official] of Object.entries(officialResults)) {
        if (!official) continue; // Not yet announced
        const pts = getPointValue(cat);
        const correct = isCorrect(predictions[cat], official);
        if (ABOVE_THE_LINE_CATEGORIES.includes(cat)) {
            announcedAbove++;
            if (correct) { aboveTheLine += pts; correctAbove++; }
        } else {
            announcedBelow++;
            if (correct) { belowTheLine += pts; correctBelow++; }
        }
    }

    const possiblePoints =
        announcedAbove * POINTS_ABOVE_THE_LINE +
        announcedBelow * POINTS_BELOW_THE_LINE;

    return {
        total: aboveTheLine + belowTheLine,
        aboveTheLine,
        belowTheLine,
        possiblePoints,
        correctAbove,
        correctBelow,
        announcedAbove,
        announcedBelow,
    };
}
