export interface Nominee {
    id: string;
    name: string;
    film: string;
    year?: number;
    posterUrl?: string;
    trailerUrl?: string;
    description?: string;
    producers?: string; // For Best Picture nominees
    director?: string; // Film director
}

export interface Category {
    id: string;
    name: string;
    shortName: string;
    nominees: Nominee[];
    isAboveTheLine: boolean;
}

export const categories: Category[] = [
    // ABOVE THE LINE CATEGORIES
    {
        id: 'bestPicture',
        name: 'Best Picture',
        shortName: 'Picture',
        isAboveTheLine: true,
        nominees: [
            { id: 'bp-1', name: 'Bugonia', film: 'Bugonia', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=bd_5HcTujfc', director: 'Yorgos Lanthimos' },
            { id: 'bp-2', name: 'F1', film: 'F1', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=8yh9BPUBbbQ', director: 'Joseph Kosinski' },
            { id: 'bp-3', name: 'Frankenstein', film: 'Frankenstein', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=8aulMPhE12g', director: 'Guillermo del Toro' },
            { id: 'bp-4', name: 'Hamnet', film: 'Hamnet', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=xYcgQMxQwmk', director: 'Chloé Zhao' },
            { id: 'bp-5', name: 'Marty Supreme', film: 'Marty Supreme', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=s9gSuKaKcqM', director: 'Josh Safdie' },
            { id: 'bp-6', name: 'One Battle after Another', film: 'One Battle after Another', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=feOQFKv2Lw4', director: 'Paul Thomas Anderson' },
            { id: 'bp-7', name: 'The Secret Agent', film: 'The Secret Agent', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=9UfrzDKrhEc', director: 'Christopher Nolan' },
            { id: 'bp-8', name: 'Sentimental Value', film: 'Sentimental Value', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=lKbcKQN5Yrw', director: 'Joachim Trier' },
            { id: 'bp-9', name: 'Sinners', film: 'Sinners', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=bKGxHflevuk', director: 'Ryan Coogler' },
            { id: 'bp-10', name: 'Train Dreams', film: 'Train Dreams', year: 2025, trailerUrl: 'https://www.youtube.com/watch?v=_Nk8TrBHOrA', director: 'Clint Bentley' },
        ],
    },
    {
        id: 'directing',
        name: 'Best Director',
        shortName: 'Director',
        isAboveTheLine: true,
        nominees: [
            { id: 'dir-1', name: 'Chloé Zhao', film: 'Hamnet', trailerUrl: 'https://www.youtube.com/watch?v=xYcgQMxQwmk' },
            { id: 'dir-2', name: 'Josh Safdie', film: 'Marty Supreme', trailerUrl: 'https://www.youtube.com/watch?v=s9gSuKaKcqM' },
            { id: 'dir-3', name: 'Paul Thomas Anderson', film: 'One Battle after Another', trailerUrl: 'https://www.youtube.com/watch?v=feOQFKv2Lw4' },
            { id: 'dir-4', name: 'Joachim Trier', film: 'Sentimental Value', trailerUrl: 'https://www.youtube.com/watch?v=lKbcKQN5Yrw' },
            { id: 'dir-5', name: 'Ryan Coogler', film: 'Sinners', trailerUrl: 'https://www.youtube.com/watch?v=bKGxHflevuk' },
        ],
    },
    {
        id: 'actorLeading',
        name: 'Best Actor in a Leading Role',
        shortName: 'Lead Actor',
        isAboveTheLine: true,
        nominees: [
            { id: 'al-1', name: 'Timothée Chalamet', film: 'Marty Supreme', trailerUrl: 'https://www.youtube.com/watch?v=s9gSuKaKcqM' },
            { id: 'al-2', name: 'Leonardo DiCaprio', film: 'One Battle after Another', trailerUrl: 'https://www.youtube.com/watch?v=feOQFKv2Lw4' },
            { id: 'al-3', name: 'Ethan Hawke', film: 'Blue Moon' },
            { id: 'al-4', name: 'Michael B. Jordan', film: 'Sinners', trailerUrl: 'https://www.youtube.com/watch?v=bKGxHflevuk' },
            { id: 'al-5', name: 'Wagner Moura', film: 'The Secret Agent', trailerUrl: 'https://www.youtube.com/watch?v=9UfrzDKrhEc' },
        ],
    },
    {
        id: 'actressLeading',
        name: 'Best Actress in a Leading Role',
        shortName: 'Lead Actress',
        isAboveTheLine: true,
        nominees: [
            { id: 'all-1', name: 'Jessie Buckley', film: 'Hamnet', trailerUrl: 'https://www.youtube.com/watch?v=xYcgQMxQwmk' },
            { id: 'all-2', name: 'Rose Byrne', film: 'If I Had Legs I\'d Kick You' },
            { id: 'all-3', name: 'Kate Hudson', film: 'Song Sung Blue' },
            { id: 'all-4', name: 'Renate Reinsve', film: 'Sentimental Value', trailerUrl: 'https://www.youtube.com/watch?v=lKbcKQN5Yrw' },
            { id: 'all-5', name: 'Emma Stone', film: 'Bugonia', trailerUrl: 'https://www.youtube.com/watch?v=bd_5HcTujfc' },
        ],
    },
    {
        id: 'actorSupporting',
        name: 'Best Actor in a Supporting Role',
        shortName: 'Supporting Actor',
        isAboveTheLine: true,
        nominees: [
            { id: 'as-1', name: 'Benicio Del Toro', film: 'One Battle after Another', trailerUrl: 'https://www.youtube.com/watch?v=feOQFKv2Lw4' },
            { id: 'as-2', name: 'Jacob Elordi', film: 'Frankenstein', trailerUrl: 'https://www.youtube.com/watch?v=8aulMPhE12g' },
            { id: 'as-3', name: 'Delroy Lindo', film: 'Sinners', trailerUrl: 'https://www.youtube.com/watch?v=bKGxHflevuk' },
            { id: 'as-4', name: 'Sean Penn', film: 'One Battle after Another', trailerUrl: 'https://www.youtube.com/watch?v=feOQFKv2Lw4' },
            { id: 'as-5', name: 'Stellan Skarsgård', film: 'Sentimental Value', trailerUrl: 'https://www.youtube.com/watch?v=lKbcKQN5Yrw' },
        ],
    },
    {
        id: 'actressSupporting',
        name: 'Best Actress in a Supporting Role',
        shortName: 'Supporting Actress',
        isAboveTheLine: true,
        nominees: [
            { id: 'ass-1', name: 'Elle Fanning', film: 'Sentimental Value', trailerUrl: 'https://www.youtube.com/watch?v=lKbcKQN5Yrw' },
            { id: 'ass-2', name: 'Inga Ibsdotter Lilleaas', film: 'Sentimental Value', trailerUrl: 'https://www.youtube.com/watch?v=lKbcKQN5Yrw' },
            { id: 'ass-3', name: 'Amy Madigan', film: 'Weapons' },
            { id: 'ass-4', name: 'Wunmi Mosaku', film: 'Sinners', trailerUrl: 'https://www.youtube.com/watch?v=bKGxHflevuk' },
            { id: 'ass-5', name: 'Teyana Taylor', film: 'One Battle after Another', trailerUrl: 'https://www.youtube.com/watch?v=feOQFKv2Lw4' },
        ],
    },
    {
        id: 'originalScreenplay',
        name: 'Best Original Screenplay',
        shortName: 'Original Screenplay',
        isAboveTheLine: true,
        nominees: [
            { id: 'os-1', name: 'Robert Kaplow', film: 'Blue Moon' },
            { id: 'os-2', name: 'Jafar Panahi', film: 'It Was Just an Accident' },
            { id: 'os-3', name: 'Ronald Bronstein & Josh Safdie', film: 'Marty Supreme', trailerUrl: 'https://www.youtube.com/watch?v=s9gSuKaKcqM' },
            { id: 'os-4', name: 'Eskil Vogt & Joachim Trier', film: 'Sentimental Value', trailerUrl: 'https://www.youtube.com/watch?v=lKbcKQN5Yrw' },
            { id: 'os-5', name: 'Ryan Coogler', film: 'Sinners', trailerUrl: 'https://www.youtube.com/watch?v=bKGxHflevuk' },
        ],
    },
    {
        id: 'adaptedScreenplay',
        name: 'Best Adapted Screenplay',
        shortName: 'Adapted Screenplay',
        isAboveTheLine: true,
        nominees: [
            { id: 'ads-1', name: 'Will Tracy', film: 'Bugonia', trailerUrl: 'https://www.youtube.com/watch?v=bd_5HcTujfc' },
            { id: 'ads-2', name: 'Guillermo del Toro', film: 'Frankenstein', trailerUrl: 'https://www.youtube.com/watch?v=8aulMPhE12g' },
            { id: 'ads-3', name: 'Chloé Zhao & Maggie O\'Farrell', film: 'Hamnet', trailerUrl: 'https://www.youtube.com/watch?v=xYcgQMxQwmk' },
            { id: 'ads-4', name: 'Paul Thomas Anderson', film: 'One Battle after Another', trailerUrl: 'https://www.youtube.com/watch?v=feOQFKv2Lw4' },
            { id: 'ads-5', name: 'Clint Bentley & Greg Kwedar', film: 'Train Dreams', trailerUrl: 'https://www.youtube.com/watch?v=_Nk8TrBHOrA' },
        ],
    },

    // BELOW THE LINE CATEGORIES
    {
        id: 'cinematography',
        name: 'Best Cinematography',
        shortName: 'Cinematography',
        isAboveTheLine: false,
        nominees: [
            { id: 'cin-1', name: 'Autumn Durald Arkapaw', film: 'Sinners' },
            { id: 'cin-2', name: 'Darius Khondji', film: 'One Battle after Another' },
            { id: 'cin-3', name: 'Linus Sandgren', film: 'Marty Supreme' },
            { id: 'cin-4', name: 'Joshua James Richards', film: 'Hamnet' },
            { id: 'cin-5', name: 'Dan Laustsen', film: 'Frankenstein' },
        ],
    },
    {
        id: 'costumeDesign',
        name: 'Best Costume Design',
        shortName: 'Costumes',
        isAboveTheLine: false,
        nominees: [
            { id: 'cos-1', name: 'Jacqueline Durran', film: 'Hamnet' },
            { id: 'cos-2', name: 'Ruth E. Carter', film: 'Sinners' },
            { id: 'cos-3', name: 'Luis Sequeira', film: 'Frankenstein' },
            { id: 'cos-4', name: 'Mark Bridges', film: 'One Battle after Another' },
            { id: 'cos-5', name: 'Sandy Powell', film: 'Marty Supreme' },
        ],
    },
    {
        id: 'filmEditing',
        name: 'Best Film Editing',
        shortName: 'Editing',
        isAboveTheLine: false,
        nominees: [
            { id: 'edit-1', name: 'Benny Safdie', film: 'Marty Supreme' },
            { id: 'edit-2', name: 'Dylan Tichenor', film: 'One Battle after Another' },
            { id: 'edit-3', name: 'Tom Cross', film: 'Hamnet' },
            { id: 'edit-4', name: 'Harry Yoon', film: 'Sinners' },
            { id: 'edit-5', name: 'Sandra Adair', film: 'Frankenstein' },
        ],
    },
    {
        id: 'makeupHairstyling',
        name: 'Best Makeup and Hairstyling',
        shortName: 'Makeup',
        isAboveTheLine: false,
        nominees: [
            { id: 'mh-1', name: 'Team Frankenstein', film: 'Frankenstein' },
            { id: 'mh-2', name: 'Team Sinners', film: 'Sinners' },
            { id: 'mh-3', name: 'Team Hamnet', film: 'Hamnet' },
            { id: 'mh-4', name: 'Team One Battle', film: 'One Battle after Another' },
            { id: 'mh-5', name: 'Team Marty Supreme', film: 'Marty Supreme' },
        ],
    },
    {
        id: 'originalScore',
        name: 'Best Original Score',
        shortName: 'Score',
        isAboveTheLine: false,
        nominees: [
            { id: 'score-1', name: 'Ludwig Göransson', film: 'Sinners' },
            { id: 'score-2', name: 'Jonny Greenwood', film: 'One Battle after Another' },
            { id: 'score-3', name: 'Alexandre Desplat', film: 'Frankenstein' },
            { id: 'score-4', name: 'Daniel Lopatin', film: 'Marty Supreme' },
            { id: 'score-5', name: 'Mica Levi', film: 'Hamnet' },
        ],
    },
    {
        id: 'originalSong',
        name: 'Best Original Song',
        shortName: 'Song',
        isAboveTheLine: false,
        nominees: [
            { id: 'song-1', name: '"Sinners Rise"', film: 'Sinners' },
            { id: 'song-2', name: '"Song Sung Blue"', film: 'Song Sung Blue' },
            { id: 'song-3', name: '"Racing Heart"', film: 'F1' },
            { id: 'song-4', name: '"Monster\'s Lament"', film: 'Frankenstein' },
            { id: 'song-5', name: '"Dreams of Steel"', film: 'Train Dreams' },
        ],
    },
    {
        id: 'productionDesign',
        name: 'Best Production Design',
        shortName: 'Production Design',
        isAboveTheLine: false,
        nominees: [
            { id: 'pd-1', name: 'Adam Stockhausen', film: 'Hamnet' },
            { id: 'pd-2', name: 'Hannah Beachler', film: 'Sinners' },
            { id: 'pd-3', name: 'Tamara Deverell', film: 'Frankenstein' },
            { id: 'pd-4', name: 'Florencia Martin', film: 'One Battle after Another' },
            { id: 'pd-5', name: 'Jack Fisk', film: 'Marty Supreme' },
        ],
    },
    {
        id: 'sound',
        name: 'Best Sound',
        shortName: 'Sound',
        isAboveTheLine: false,
        nominees: [
            { id: 'snd-1', name: 'Team Sinners', film: 'Sinners' },
            { id: 'snd-2', name: 'Team F1', film: 'F1' },
            { id: 'snd-3', name: 'Team One Battle', film: 'One Battle after Another' },
            { id: 'snd-4', name: 'Team Frankenstein', film: 'Frankenstein' },
            { id: 'snd-5', name: 'Team Marty Supreme', film: 'Marty Supreme' },
        ],
    },
    {
        id: 'visualEffects',
        name: 'Best Visual Effects',
        shortName: 'VFX',
        isAboveTheLine: false,
        nominees: [
            { id: 'vfx-1', name: 'Team Frankenstein', film: 'Frankenstein' },
            { id: 'vfx-2', name: 'Team F1', film: 'F1' },
            { id: 'vfx-3', name: 'Team Sinners', film: 'Sinners' },
            { id: 'vfx-4', name: 'Team Bugonia', film: 'Bugonia' },
            { id: 'vfx-5', name: 'Team Train Dreams', film: 'Train Dreams' },
        ],
    },
    {
        id: 'animatedFeature',
        name: 'Best Animated Feature Film',
        shortName: 'Animated Feature',
        isAboveTheLine: false,
        nominees: [
            { id: 'anim-1', name: 'Flow', film: 'Flow' },
            { id: 'anim-2', name: 'Inside Out 2', film: 'Inside Out 2' },
            { id: 'anim-3', name: 'Memoir of a Snail', film: 'Memoir of a Snail' },
            { id: 'anim-4', name: 'Wallace & Gromit: Vengeance Most Fowl', film: 'Wallace & Gromit: Vengeance Most Fowl' },
            { id: 'anim-5', name: 'The Wild Robot', film: 'The Wild Robot' },
        ],
    },
    {
        id: 'animatedShort',
        name: 'Best Animated Short Film',
        shortName: 'Animated Short',
        isAboveTheLine: false,
        nominees: [
            { id: 'anims-1', name: 'Beautiful Men', film: 'Beautiful Men' },
            { id: 'anims-2', name: 'In the Shadow of Cypress', film: 'In the Shadow of Cypress' },
            { id: 'anims-3', name: 'Magic Candies', film: 'Magic Candies' },
            { id: 'anims-4', name: 'Wander to Wonder', film: 'Wander to Wonder' },
            { id: 'anims-5', name: 'Yuck!', film: 'Yuck!' },
        ],
    },
    {
        id: 'casting',
        name: 'Best Casting',
        shortName: 'Casting',
        isAboveTheLine: false,
        nominees: [
            { id: 'cast-1', name: 'Francine Maisler', film: 'One Battle after Another' },
            { id: 'cast-2', name: 'Sarah Finn', film: 'Sinners' },
            { id: 'cast-3', name: 'Kate Dowd', film: 'Hamnet' },
            { id: 'cast-4', name: 'Jennifer Euston', film: 'Marty Supreme' },
            { id: 'cast-5', name: 'Jina Jay', film: 'Frankenstein' },
        ],
    },
    {
        id: 'documentaryFeature',
        name: 'Best Documentary Feature Film',
        shortName: 'Doc Feature',
        isAboveTheLine: false,
        nominees: [
            { id: 'doc-1', name: 'Black Box Diaries', film: 'Black Box Diaries' },
            { id: 'doc-2', name: 'No Other Land', film: 'No Other Land' },
            { id: 'doc-3', name: 'Porcelain War', film: 'Porcelain War' },
            { id: 'doc-4', name: 'Soundtrack to a Coup d\'Etat', film: 'Soundtrack to a Coup d\'Etat' },
            { id: 'doc-5', name: 'Sugarcane', film: 'Sugarcane' },
        ],
    },
    {
        id: 'documentaryShort',
        name: 'Best Documentary Short Film',
        shortName: 'Doc Short',
        isAboveTheLine: false,
        nominees: [
            { id: 'docs-1', name: 'Death by Numbers', film: 'Death by Numbers' },
            { id: 'docs-2', name: 'I Am Ready, Warden', film: 'I Am Ready, Warden' },
            { id: 'docs-3', name: 'Incident', film: 'Incident' },
            { id: 'docs-4', name: 'Instruments of a Beating Heart', film: 'Instruments of a Beating Heart' },
            { id: 'docs-5', name: 'The Only Girl in Orchestra', film: 'The Only Girl in Orchestra' },
        ],
    },
    {
        id: 'internationalFeature',
        name: 'Best International Feature Film',
        shortName: 'International',
        isAboveTheLine: false,
        nominees: [
            { id: 'int-1', name: 'I\'m Still Here (Brazil)', film: 'I\'m Still Here' },
            { id: 'int-2', name: 'The Girl with the Needle (Denmark)', film: 'The Girl with the Needle' },
            { id: 'int-3', name: 'Emilia Pérez (France)', film: 'Emilia Pérez' },
            { id: 'int-4', name: 'The Seed of the Sacred Fig (Germany)', film: 'The Seed of the Sacred Fig' },
            { id: 'int-5', name: 'Flow (Latvia)', film: 'Flow' },
        ],
    },
    {
        id: 'liveActionShort',
        name: 'Best Live Action Short Film',
        shortName: 'Live Action Short',
        isAboveTheLine: false,
        nominees: [
            { id: 'las-1', name: 'A Lien', film: 'A Lien' },
            { id: 'las-2', name: 'Anuja', film: 'Anuja' },
            { id: 'las-3', name: 'I\'m Not a Robot', film: 'I\'m Not a Robot' },
            { id: 'las-4', name: 'The Last Ranger', film: 'The Last Ranger' },
            { id: 'las-5', name: 'The Man Who Could Not Remain Silent', film: 'The Man Who Could Not Remain Silent' },
        ],
    },
];

// Helper to get above the line categories
export const aboveTheLineCategories = categories.filter(c => c.isAboveTheLine);

// Helper to get below the line categories
export const belowTheLineCategories = categories.filter(c => !c.isAboveTheLine);

// Get unique films for the carousel - only 2025 nominees
export function getUniqueFilms(): string[] {
    const films = new Set<string>();

    // Only include films from categories that are competing in 2025
    // Exclude documentary and short film categories as they may be from other years
    const excludedCategories = [
        'documentaryFeature',
        'documentaryShort',
        'animatedShort',
        'liveActionShort'
    ];

    categories.forEach(cat => {
        // Skip excluded categories
        if (excludedCategories.includes(cat.id)) {
            return;
        }

        cat.nominees.forEach(nom => {
            // Only add films that have a year of 2025, or don't have a year specified
            // (assuming films without year are current nominees)
            if (!nom.year || nom.year === 2025) {
                films.add(nom.film);
            }
        });
    });

    return Array.from(films);
}

// Get category by ID
export function getCategoryById(id: string): Category | undefined {
    return categories.find(c => c.id === id);
}
