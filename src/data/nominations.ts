// ============================================================================
// 98th Academy Awards (2026) - Official Nominations
// Source: https://www.oscars.org/oscars/ceremonies/2026
// ============================================================================

// =========================
// TYPE DEFINITIONS
// =========================

/** Film metadata - stored once, referenced by nominees */
interface FilmData {
    id: string;
    title: string;
    year: number;
    posterUrl?: string;
    trailerUrl?: string;
    director?: string;
    country?: string;
}

/** Internal nominee representation with film reference */
interface NomineeData {
    id: string;
    name: string;
    filmId: string;
    additionalInfo?: string;
}

/** Internal category representation */
interface CategoryData {
    id: string;
    name: string;
    shortName: string;
    nominees: NomineeData[];
    isAboveTheLine: boolean;
}

// =========================
// PUBLIC INTERFACES (Backward Compatible)
// =========================

export interface Nominee {
    id: string;
    name: string;
    film: string;
    year?: number;
    posterUrl?: string;
    trailerUrl?: string;
    description?: string;
    producers?: string;
    director?: string;
}

export interface Category {
    id: string;
    name: string;
    shortName: string;
    nominees: Nominee[];
    isAboveTheLine: boolean;
}

// =========================
// FILMS DATABASE (Normalized - Single Source of Truth)
// =========================

const filmsDb: Record<string, FilmData> = {
    // === BEST PICTURE CONTENDERS ===
    bugonia: {
        id: 'bugonia',
        title: 'Bugonia',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=bd_5HcTujfc',
        director: 'Yorgos Lanthimos',
    },
    f1: {
        id: 'f1',
        title: 'F1',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=8yh9BPUBbbQ',
        director: 'Joseph Kosinski',
    },
    frankenstein: {
        id: 'frankenstein',
        title: 'Frankenstein',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=8aulMPhE12g',
        director: 'Guillermo del Toro',
    },
    hamnet: {
        id: 'hamnet',
        title: 'Hamnet',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=xYcgQMxQwmk',
        director: 'Chloé Zhao',
    },
    martySupreme: {
        id: 'martySupreme',
        title: 'Marty Supreme',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=s9gSuKaKcqM',
        director: 'Josh Safdie',
    },
    oneBattleAfterAnother: {
        id: 'oneBattleAfterAnother',
        title: 'One Battle after Another',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=feOQFKv2Lw4',
        director: 'Paul Thomas Anderson',
    },
    theSecretAgent: {
        id: 'theSecretAgent',
        title: 'The Secret Agent',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=9UfrzDKrhEc',
        country: 'Brazil',
    },
    sentimentalValue: {
        id: 'sentimentalValue',
        title: 'Sentimental Value',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=lKbcKQN5Yrw',
        director: 'Joachim Trier',
        country: 'Norway',
    },
    sinners: {
        id: 'sinners',
        title: 'Sinners',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=bKGxHflevuk',
        director: 'Ryan Coogler',
    },
    trainDreams: {
        id: 'trainDreams',
        title: 'Train Dreams',
        year: 2025,
        trailerUrl: 'https://www.youtube.com/watch?v=_Nk8TrBHOrA',
        director: 'Clint Bentley',
    },

    // === OTHER FEATURE FILMS ===
    blueMoon: {
        id: 'blueMoon',
        title: 'Blue Moon',
        year: 2025,
    },
    ifIHadLegsIdKickYou: {
        id: 'ifIHadLegsIdKickYou',
        title: "If I Had Legs I'd Kick You",
        year: 2025,
    },
    songSungBlue: {
        id: 'songSungBlue',
        title: 'Song Sung Blue',
        year: 2025,
    },
    itWasJustAnAccident: {
        id: 'itWasJustAnAccident',
        title: 'It Was Just an Accident',
        year: 2025,
        country: 'France',
    },
    weapons: {
        id: 'weapons',
        title: 'Weapons',
        year: 2025,
    },
    avatarFireAndAsh: {
        id: 'avatarFireAndAsh',
        title: 'Avatar: Fire and Ash',
        year: 2025,
        director: 'James Cameron',
    },
    jurassicWorldRebirth: {
        id: 'jurassicWorldRebirth',
        title: 'Jurassic World Rebirth',
        year: 2025,
    },
    sirat: {
        id: 'sirat',
        title: 'Sirāt',
        year: 2025,
        country: 'Spain',
    },
    voiceOfHindRajab: {
        id: 'voiceOfHindRajab',
        title: 'The Voice of Hind Rajab',
        year: 2025,
        country: 'Tunisia',
    },
    kokuho: {
        id: 'kokuho',
        title: 'Kokuho',
        year: 2025,
    },
    theSmashingMachine: {
        id: 'theSmashingMachine',
        title: 'The Smashing Machine',
        year: 2025,
    },
    theUglyStepsister: {
        id: 'theUglyStepsister',
        title: 'The Ugly Stepsister',
        year: 2025,
    },
    theLostBus: {
        id: 'theLostBus',
        title: 'The Lost Bus',
        year: 2025,
    },
    dianeWarrenRelentless: {
        id: 'dianeWarrenRelentless',
        title: 'Diane Warren: Relentless',
        year: 2025,
    },
    vivaVerdi: {
        id: 'vivaVerdi',
        title: 'Viva Verdi!',
        year: 2025,
    },

    // === ANIMATED FEATURES ===
    arco: {
        id: 'arco',
        title: 'Arco',
        year: 2025,
    },
    elio: {
        id: 'elio',
        title: 'Elio',
        year: 2025,
    },
    kpopDemonHunters: {
        id: 'kpopDemonHunters',
        title: 'KPop Demon Hunters',
        year: 2025,
    },
    littleAmelie: {
        id: 'littleAmelie',
        title: 'Little Amélie or the Character of Rain',
        year: 2025,
    },
    zootopia2: {
        id: 'zootopia2',
        title: 'Zootopia 2',
        year: 2025,
    },

    // === ANIMATED SHORTS ===
    butterfly: {
        id: 'butterfly',
        title: 'Butterfly',
        year: 2025,
    },
    forevergreen: {
        id: 'forevergreen',
        title: 'Forevergreen',
        year: 2025,
    },
    theGirlWhoCriedPearls: {
        id: 'theGirlWhoCriedPearls',
        title: 'The Girl Who Cried Pearls',
        year: 2025,
    },
    retirementPlan: {
        id: 'retirementPlan',
        title: 'Retirement Plan',
        year: 2025,
    },
    theThreeSisters: {
        id: 'theThreeSisters',
        title: 'The Three Sisters',
        year: 2025,
    },

    // === DOCUMENTARY FEATURES ===
    theAlabamaSolution: {
        id: 'theAlabamaSolution',
        title: 'The Alabama Solution',
        year: 2025,
    },
    comeSeeMeInTheGoodLight: {
        id: 'comeSeeMeInTheGoodLight',
        title: 'Come See Me in the Good Light',
        year: 2025,
    },
    cuttingThroughRocks: {
        id: 'cuttingThroughRocks',
        title: 'Cutting Through Rocks',
        year: 2025,
    },
    mrNobodyAgainstPutin: {
        id: 'mrNobodyAgainstPutin',
        title: 'Mr. Nobody Against Putin',
        year: 2025,
    },
    thePerfectNeighbor: {
        id: 'thePerfectNeighbor',
        title: 'The Perfect Neighbor',
        year: 2025,
    },

    // === DOCUMENTARY SHORTS ===
    allTheEmptyRooms: {
        id: 'allTheEmptyRooms',
        title: 'All the Empty Rooms',
        year: 2025,
    },
    armedOnlyWithACamera: {
        id: 'armedOnlyWithACamera',
        title: 'Armed Only with a Camera',
        year: 2025,
    },
    childrenNoMore: {
        id: 'childrenNoMore',
        title: 'Children No More',
        year: 2025,
    },
    theDevilIsBusy: {
        id: 'theDevilIsBusy',
        title: 'The Devil is Busy',
        year: 2025,
    },
    perfectlyAStrangeness: {
        id: 'perfectlyAStrangeness',
        title: 'Perfectly a Strangeness',
        year: 2025,
    },

    // === LIVE ACTION SHORTS ===
    butchersStain: {
        id: 'butchersStain',
        title: "Butcher's Stain",
        year: 2025,
    },
    aFriendOfDorothy: {
        id: 'aFriendOfDorothy',
        title: 'A Friend of Dorothy',
        year: 2025,
    },
    janeAustensPeriodDrama: {
        id: 'janeAustensPeriodDrama',
        title: "Jane Austen's Period Drama",
        year: 2025,
    },
    theSingers: {
        id: 'theSingers',
        title: 'The Singers',
        year: 2025,
    },
    twoPeopleExchangingSaliva: {
        id: 'twoPeopleExchangingSaliva',
        title: 'Two People Exchanging Saliva',
        year: 2025,
    },
};

// =========================
// CATEGORIES DATA (Internal - Normalized)
// =========================

const categoriesData: CategoryData[] = [
    // ==================== ABOVE THE LINE ====================
    {
        id: 'bestPicture',
        name: 'Best Picture',
        shortName: 'Picture',
        isAboveTheLine: true,
        nominees: [
            { id: 'bp-1', name: 'Bugonia', filmId: 'bugonia', additionalInfo: 'Ed Guiney & Andrew Lowe, Yorgos Lanthimos, Emma Stone and Lars Knudsen, Producers' },
            { id: 'bp-2', name: 'F1', filmId: 'f1', additionalInfo: 'Chad Oman, Brad Pitt, Dede Gardner, Jeremy Kleiner, Joseph Kosinski and Jerry Bruckheimer, Producers' },
            { id: 'bp-3', name: 'Frankenstein', filmId: 'frankenstein', additionalInfo: 'Guillermo del Toro, J. Miles Dale and Scott Stuber, Producers' },
            { id: 'bp-4', name: 'Hamnet', filmId: 'hamnet', additionalInfo: 'Liza Marshall, Pippa Harris, Nicolas Gonda, Steven Spielberg and Sam Mendes, Producers' },
            { id: 'bp-5', name: 'Marty Supreme', filmId: 'martySupreme', additionalInfo: 'Eli Bush, Ronald Bronstein, Josh Safdie, Anthony Katagas and Timothée Chalamet, Producers' },
            { id: 'bp-6', name: 'One Battle after Another', filmId: 'oneBattleAfterAnother', additionalInfo: 'Adam Somner, Sara Murphy and Paul Thomas Anderson, Producers' },
            { id: 'bp-7', name: 'The Secret Agent', filmId: 'theSecretAgent', additionalInfo: 'Emilie Lesclaux, Producer' },
            { id: 'bp-8', name: 'Sentimental Value', filmId: 'sentimentalValue', additionalInfo: 'Maria Ekerhovd and Andrea Berentsen Ottmar, Producers' },
            { id: 'bp-9', name: 'Sinners', filmId: 'sinners', additionalInfo: 'Zinzi Coogler, Sev Ohanian and Ryan Coogler, Producers' },
            { id: 'bp-10', name: 'Train Dreams', filmId: 'trainDreams', additionalInfo: 'Marissa McMahon, Teddy Schwarzman, Will Janowitz, Ashley Schlaifer and Michael Heimler, Producers' },
        ],
    },
    {
        id: 'directing',
        name: 'Directing',
        shortName: 'Director',
        isAboveTheLine: true,
        nominees: [
            { id: 'dir-1', name: 'Chloé Zhao', filmId: 'hamnet' },
            { id: 'dir-2', name: 'Josh Safdie', filmId: 'martySupreme' },
            { id: 'dir-3', name: 'Paul Thomas Anderson', filmId: 'oneBattleAfterAnother' },
            { id: 'dir-4', name: 'Joachim Trier', filmId: 'sentimentalValue' },
            { id: 'dir-5', name: 'Ryan Coogler', filmId: 'sinners' },
        ],
    },
    {
        id: 'actorLeading',
        name: 'Actor in a Leading Role',
        shortName: 'Lead Actor',
        isAboveTheLine: true,
        nominees: [
            { id: 'al-1', name: 'Timothée Chalamet', filmId: 'martySupreme' },
            { id: 'al-2', name: 'Leonardo DiCaprio', filmId: 'oneBattleAfterAnother' },
            { id: 'al-3', name: 'Ethan Hawke', filmId: 'blueMoon' },
            { id: 'al-4', name: 'Michael B. Jordan', filmId: 'sinners' },
            { id: 'al-5', name: 'Wagner Moura', filmId: 'theSecretAgent' },
        ],
    },
    {
        id: 'actressLeading',
        name: 'Actress in a Leading Role',
        shortName: 'Lead Actress',
        isAboveTheLine: true,
        nominees: [
            { id: 'all-1', name: 'Jessie Buckley', filmId: 'hamnet' },
            { id: 'all-2', name: 'Rose Byrne', filmId: 'ifIHadLegsIdKickYou' },
            { id: 'all-3', name: 'Kate Hudson', filmId: 'songSungBlue' },
            { id: 'all-4', name: 'Renate Reinsve', filmId: 'sentimentalValue' },
            { id: 'all-5', name: 'Emma Stone', filmId: 'bugonia' },
        ],
    },
    {
        id: 'actorSupporting',
        name: 'Actor in a Supporting Role',
        shortName: 'Supporting Actor',
        isAboveTheLine: true,
        nominees: [
            { id: 'as-1', name: 'Benicio Del Toro', filmId: 'oneBattleAfterAnother' },
            { id: 'as-2', name: 'Jacob Elordi', filmId: 'frankenstein' },
            { id: 'as-3', name: 'Delroy Lindo', filmId: 'sinners' },
            { id: 'as-4', name: 'Sean Penn', filmId: 'oneBattleAfterAnother' },
            { id: 'as-5', name: 'Stellan Skarsgård', filmId: 'sentimentalValue' },
        ],
    },
    {
        id: 'actressSupporting',
        name: 'Actress in a Supporting Role',
        shortName: 'Supporting Actress',
        isAboveTheLine: true,
        nominees: [
            { id: 'ass-1', name: 'Elle Fanning', filmId: 'sentimentalValue' },
            { id: 'ass-2', name: 'Inga Ibsdotter Lilleaas', filmId: 'sentimentalValue' },
            { id: 'ass-3', name: 'Amy Madigan', filmId: 'weapons' },
            { id: 'ass-4', name: 'Wunmi Mosaku', filmId: 'sinners' },
            { id: 'ass-5', name: 'Teyana Taylor', filmId: 'oneBattleAfterAnother' },
        ],
    },
    {
        id: 'originalScreenplay',
        name: 'Writing (Original Screenplay)',
        shortName: 'Original Screenplay',
        isAboveTheLine: true,
        nominees: [
            { id: 'os-1', name: 'Robert Kaplow', filmId: 'blueMoon' },
            { id: 'os-2', name: 'Jafar Panahi', filmId: 'itWasJustAnAccident', additionalInfo: 'Script collaborators: Nader Saïvar, Shadmehr Rastin, Mehdi Mahmoudian' },
            { id: 'os-3', name: 'Ronald Bronstein & Josh Safdie', filmId: 'martySupreme' },
            { id: 'os-4', name: 'Eskil Vogt, Joachim Trier', filmId: 'sentimentalValue' },
            { id: 'os-5', name: 'Ryan Coogler', filmId: 'sinners' },
        ],
    },
    {
        id: 'adaptedScreenplay',
        name: 'Writing (Adapted Screenplay)',
        shortName: 'Adapted Screenplay',
        isAboveTheLine: true,
        nominees: [
            { id: 'ads-1', name: 'Will Tracy', filmId: 'bugonia' },
            { id: 'ads-2', name: 'Guillermo del Toro', filmId: 'frankenstein' },
            { id: 'ads-3', name: 'Chloé Zhao & Maggie O\'Farrell', filmId: 'hamnet' },
            { id: 'ads-4', name: 'Paul Thomas Anderson', filmId: 'oneBattleAfterAnother' },
            { id: 'ads-5', name: 'Clint Bentley & Greg Kwedar', filmId: 'trainDreams' },
        ],
    },

    // ==================== BELOW THE LINE ====================
    {
        id: 'animatedFeature',
        name: 'Animated Feature Film',
        shortName: 'Animated Feature',
        isAboveTheLine: false,
        nominees: [
            { id: 'anim-1', name: 'Arco', filmId: 'arco', additionalInfo: 'Ugo Bienvenu, Félix de Givry, Sophie Mas and Natalie Portman' },
            { id: 'anim-2', name: 'Elio', filmId: 'elio', additionalInfo: 'Madeline Sharafian, Domee Shi, Adrian Molina and Mary Alice Drumm' },
            { id: 'anim-3', name: 'KPop Demon Hunters', filmId: 'kpopDemonHunters', additionalInfo: 'Maggie Kang, Chris Appelhans and Michelle L.M. Wong' },
            { id: 'anim-4', name: 'Little Amélie or the Character of Rain', filmId: 'littleAmelie', additionalInfo: 'Maïlys Vallade, Liane-Cho Han, Nidia Santiago and Henri Magalon' },
            { id: 'anim-5', name: 'Zootopia 2', filmId: 'zootopia2', additionalInfo: 'Jared Bush, Byron Howard and Yvett Merino' },
        ],
    },
    {
        id: 'internationalFeature',
        name: 'International Feature Film',
        shortName: 'International',
        isAboveTheLine: false,
        nominees: [
            { id: 'int-1', name: 'The Secret Agent', filmId: 'theSecretAgent', additionalInfo: 'Brazil' },
            { id: 'int-2', name: 'It Was Just an Accident', filmId: 'itWasJustAnAccident', additionalInfo: 'France' },
            { id: 'int-3', name: 'Sentimental Value', filmId: 'sentimentalValue', additionalInfo: 'Norway' },
            { id: 'int-4', name: 'Sirāt', filmId: 'sirat', additionalInfo: 'Spain' },
            { id: 'int-5', name: 'The Voice of Hind Rajab', filmId: 'voiceOfHindRajab', additionalInfo: 'Tunisia' },
        ],
    },
    {
        id: 'cinematography',
        name: 'Cinematography',
        shortName: 'Cinematography',
        isAboveTheLine: false,
        nominees: [
            { id: 'cin-1', name: 'Dan Laustsen', filmId: 'frankenstein' },
            { id: 'cin-2', name: 'Darius Khondji', filmId: 'martySupreme' },
            { id: 'cin-3', name: 'Michael Bauman', filmId: 'oneBattleAfterAnother' },
            { id: 'cin-4', name: 'Autumn Durald Arkapaw', filmId: 'sinners' },
            { id: 'cin-5', name: 'Adolpho Veloso', filmId: 'trainDreams' },
        ],
    },
    {
        id: 'costumeDesign',
        name: 'Costume Design',
        shortName: 'Costumes',
        isAboveTheLine: false,
        nominees: [
            { id: 'cos-1', name: 'Deborah L. Scott', filmId: 'avatarFireAndAsh' },
            { id: 'cos-2', name: 'Kate Hawley', filmId: 'frankenstein' },
            { id: 'cos-3', name: 'Malgosia Turzanska', filmId: 'hamnet' },
            { id: 'cos-4', name: 'Miyako Bellizzi', filmId: 'martySupreme' },
            { id: 'cos-5', name: 'Ruth E. Carter', filmId: 'sinners' },
        ],
    },
    {
        id: 'filmEditing',
        name: 'Film Editing',
        shortName: 'Editing',
        isAboveTheLine: false,
        nominees: [
            { id: 'edit-1', name: 'Stephen Mirrione', filmId: 'f1' },
            { id: 'edit-2', name: 'Ronald Bronstein and Josh Safdie', filmId: 'martySupreme' },
            { id: 'edit-3', name: 'Andy Jurgensen', filmId: 'oneBattleAfterAnother' },
            { id: 'edit-4', name: 'Olivier Bugge Coutté', filmId: 'sentimentalValue' },
            { id: 'edit-5', name: 'Michael P. Shawver', filmId: 'sinners' },
        ],
    },
    {
        id: 'makeupHairstyling',
        name: 'Makeup and Hairstyling',
        shortName: 'Makeup',
        isAboveTheLine: false,
        nominees: [
            { id: 'mh-1', name: 'Frankenstein', filmId: 'frankenstein' },
            { id: 'mh-2', name: 'Kokuho', filmId: 'kokuho' },
            { id: 'mh-3', name: 'Sinners', filmId: 'sinners' },
            { id: 'mh-4', name: 'The Smashing Machine', filmId: 'theSmashingMachine' },
            { id: 'mh-5', name: 'The Ugly Stepsister', filmId: 'theUglyStepsister' },
        ],
    },
    {
        id: 'originalScore',
        name: 'Music (Original Score)',
        shortName: 'Score',
        isAboveTheLine: false,
        nominees: [
            { id: 'score-1', name: 'Jerskin Fendrix', filmId: 'bugonia' },
            { id: 'score-2', name: 'Alexandre Desplat', filmId: 'frankenstein' },
            { id: 'score-3', name: 'Max Richter', filmId: 'hamnet' },
            { id: 'score-4', name: 'Jonny Greenwood', filmId: 'oneBattleAfterAnother' },
            { id: 'score-5', name: 'Ludwig Goransson', filmId: 'sinners' },
        ],
    },
    {
        id: 'originalSong',
        name: 'Music (Original Song)',
        shortName: 'Song',
        isAboveTheLine: false,
        nominees: [
            { id: 'song-1', name: '"Dear Me"', filmId: 'dianeWarrenRelentless' },
            { id: 'song-2', name: '"Golden"', filmId: 'kpopDemonHunters' },
            { id: 'song-3', name: '"I Lied to You"', filmId: 'sinners' },
            { id: 'song-4', name: '"Sweet Dreams of Joy"', filmId: 'vivaVerdi' },
            { id: 'song-5', name: '"Train Dreams"', filmId: 'trainDreams' },
        ],
    },
    {
        id: 'productionDesign',
        name: 'Production Design',
        shortName: 'Production Design',
        isAboveTheLine: false,
        nominees: [
            { id: 'pd-1', name: 'Frankenstein', filmId: 'frankenstein' },
            { id: 'pd-2', name: 'Hamnet', filmId: 'hamnet' },
            { id: 'pd-3', name: 'Marty Supreme', filmId: 'martySupreme' },
            { id: 'pd-4', name: 'One Battle after Another', filmId: 'oneBattleAfterAnother' },
            { id: 'pd-5', name: 'Sinners', filmId: 'sinners' },
        ],
    },
    {
        id: 'sound',
        name: 'Sound',
        shortName: 'Sound',
        isAboveTheLine: false,
        nominees: [
            { id: 'snd-1', name: 'F1', filmId: 'f1' },
            { id: 'snd-2', name: 'Frankenstein', filmId: 'frankenstein' },
            { id: 'snd-3', name: 'One Battle after Another', filmId: 'oneBattleAfterAnother' },
            { id: 'snd-4', name: 'Sinners', filmId: 'sinners' },
            { id: 'snd-5', name: 'Sirāt', filmId: 'sirat' },
        ],
    },
    {
        id: 'visualEffects',
        name: 'Visual Effects',
        shortName: 'VFX',
        isAboveTheLine: false,
        nominees: [
            { id: 'vfx-1', name: 'Avatar: Fire and Ash', filmId: 'avatarFireAndAsh' },
            { id: 'vfx-2', name: 'F1', filmId: 'f1' },
            { id: 'vfx-3', name: 'Jurassic World Rebirth', filmId: 'jurassicWorldRebirth' },
            { id: 'vfx-4', name: 'The Lost Bus', filmId: 'theLostBus' },
            { id: 'vfx-5', name: 'Sinners', filmId: 'sinners' },
        ],
    },
    {
        id: 'casting',
        name: 'Casting',
        shortName: 'Casting',
        isAboveTheLine: false,
        nominees: [
            { id: 'cast-1', name: 'Nina Gold', filmId: 'hamnet' },
            { id: 'cast-2', name: 'Jennifer Venditti', filmId: 'martySupreme' },
            { id: 'cast-3', name: 'Cassandra Kulukundis', filmId: 'oneBattleAfterAnother' },
            { id: 'cast-4', name: 'Gabriel Domingues', filmId: 'theSecretAgent' },
            { id: 'cast-5', name: 'Francine Maisler', filmId: 'sinners' },
        ],
    },
    {
        id: 'animatedShort',
        name: 'Animated Short Film',
        shortName: 'Animated Short',
        isAboveTheLine: false,
        nominees: [
            { id: 'anims-1', name: 'Butterfly', filmId: 'butterfly' },
            { id: 'anims-2', name: 'Forevergreen', filmId: 'forevergreen' },
            { id: 'anims-3', name: 'The Girl Who Cried Pearls', filmId: 'theGirlWhoCriedPearls' },
            { id: 'anims-4', name: 'Retirement Plan', filmId: 'retirementPlan' },
            { id: 'anims-5', name: 'The Three Sisters', filmId: 'theThreeSisters' },
        ],
    },
    {
        id: 'documentaryFeature',
        name: 'Documentary Feature Film',
        shortName: 'Doc Feature',
        isAboveTheLine: false,
        nominees: [
            { id: 'doc-1', name: 'The Alabama Solution', filmId: 'theAlabamaSolution' },
            { id: 'doc-2', name: 'Come See Me in the Good Light', filmId: 'comeSeeMeInTheGoodLight' },
            { id: 'doc-3', name: 'Cutting Through Rocks', filmId: 'cuttingThroughRocks' },
            { id: 'doc-4', name: 'Mr. Nobody Against Putin', filmId: 'mrNobodyAgainstPutin' },
            { id: 'doc-5', name: 'The Perfect Neighbor', filmId: 'thePerfectNeighbor' },
        ],
    },
    {
        id: 'documentaryShort',
        name: 'Documentary Short Film',
        shortName: 'Doc Short',
        isAboveTheLine: false,
        nominees: [
            { id: 'docs-1', name: 'All the Empty Rooms', filmId: 'allTheEmptyRooms' },
            { id: 'docs-2', name: 'Armed Only with a Camera', filmId: 'armedOnlyWithACamera' },
            { id: 'docs-3', name: 'Children No More', filmId: 'childrenNoMore' },
            { id: 'docs-4', name: 'The Devil is Busy', filmId: 'theDevilIsBusy' },
            { id: 'docs-5', name: 'Perfectly a Strangeness', filmId: 'perfectlyAStrangeness' },
        ],
    },
    {
        id: 'liveActionShort',
        name: 'Live Action Short Film',
        shortName: 'Live Action Short',
        isAboveTheLine: false,
        nominees: [
            { id: 'las-1', name: "Butcher's Stain", filmId: 'butchersStain' },
            { id: 'las-2', name: 'A Friend of Dorothy', filmId: 'aFriendOfDorothy' },
            { id: 'las-3', name: "Jane Austen's Period Drama", filmId: 'janeAustensPeriodDrama' },
            { id: 'las-4', name: 'The Singers', filmId: 'theSingers' },
            { id: 'las-5', name: 'Two People Exchanging Saliva', filmId: 'twoPeopleExchangingSaliva' },
        ],
    },
];

// =========================
// RESOLVED DATA (Auto-generated from normalized data)
// =========================

/** Resolve a nominee with full film data */
function resolveNominee(nominee: NomineeData, categoryId: string): Nominee {
    const film = filmsDb[nominee.filmId];
    return {
        id: nominee.id,
        name: nominee.name,
        film: film?.title || nominee.name,
        year: film?.year,
        posterUrl: film?.posterUrl,
        trailerUrl: film?.trailerUrl,
        director: film?.director,
        producers: categoryId === 'bestPicture' ? nominee.additionalInfo : undefined,
        description: nominee.additionalInfo,
    };
}

/** Resolve a category with all nominee data resolved */
function resolveCategory(category: CategoryData): Category {
    return {
        id: category.id,
        name: category.name,
        shortName: category.shortName,
        isAboveTheLine: category.isAboveTheLine,
        nominees: category.nominees.map((nom) => resolveNominee(nom, category.id)),
    };
}

// =========================
// PUBLIC EXPORTS (Backward Compatible)
// =========================

/** All categories with resolved nominee data */
export const categories: Category[] = categoriesData.map(resolveCategory);

/** Above the line categories (major awards) */
export const aboveTheLineCategories = categories.filter((c) => c.isAboveTheLine);

/** Below the line categories (technical & other awards) */
export const belowTheLineCategories = categories.filter((c) => !c.isAboveTheLine);

/** Get unique films with trailers for the carousel */
export function getUniqueFilms(): string[] {
    const uniqueFilms = new Set<string>();

    const majorCategories = [
        'bestPicture',
        'directing',
        'actorLeading',
        'actressLeading',
        'actorSupporting',
        'actressSupporting',
        'originalScreenplay',
        'adaptedScreenplay',
    ];

    categories
        .filter((cat) => majorCategories.includes(cat.id))
        .forEach((cat) => {
            cat.nominees.forEach((nom) => {
                if (nom.trailerUrl) {
                    uniqueFilms.add(nom.film);
                }
            });
        });

    return Array.from(uniqueFilms);
}

/** Get category by ID */
export function getCategoryById(id: string): Category | undefined {
    return categories.find((c) => c.id === id);
}

// =========================
// ADVANCED API (For components that need film data directly)
// =========================

export interface Film {
    id: string;
    title: string;
    year: number;
    posterUrl?: string;
    trailerUrl?: string;
    director?: string;
    country?: string;
}

/** Get all films */
export function getAllFilms(): Film[] {
    return Object.values(filmsDb);
}

/** Get film by ID */
export function getFilmById(id: string): Film | undefined {
    return filmsDb[id];
}

/** Get films with trailers */
export function getFilmsWithTrailers(): Film[] {
    return Object.values(filmsDb).filter((f) => f.trailerUrl);
}

/** Public read-only access to films database */
export const films: Record<string, Film> = filmsDb;
