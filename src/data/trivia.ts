export interface TriviaQuestion {
    difficulty: 'Easy' | 'Medium' | 'Hard';
    question: string;
    answer: string;
    connection: string;
}

export const triviaQuestions: TriviaQuestion[] = [
    {
        difficulty: 'Easy',
        question: 'Which 1997 film tied the record for the most Oscar wins with 11 trophies?',
        answer: 'Titanic',
        connection: 'Shares the 11-win record with Ben-Hur and The Return of the King.'
    },
    {
        difficulty: 'Easy',
        question: 'Who are the two actors who have won an Oscar for playing the Joker?',
        answer: 'Heath Ledger & Joaquin Phoenix',
        connection: 'They are among the few actors to win for playing the same character.'
    },
    {
        difficulty: 'Easy',
        question: 'Which movie musical features the song "City of Stars," which won Best Original Song in 2017?',
        answer: 'La La Land',
        connection: 'Famously involved in the Best Picture announcement mix-up.'
    },
    {
        difficulty: 'Easy',
        question: 'Who holds the record for the most individual Oscar wins (22)?',
        answer: 'Walt Disney',
        connection: 'He also received 4 honorary Oscars during his career.'
    },
    {
        difficulty: 'Easy',
        question: 'What is the official name of the gold statuette given out?',
        answer: 'Academy Award of Merit',
        connection: '"Oscar" was a nickname officially adopted by the Academy in 1939.'
    },
    {
        difficulty: 'Easy',
        question: 'Which 1994 Disney movie won Best Original Score and Song?',
        answer: 'The Lion King',
        connection: 'Elton John and Tim Rice took home the trophies for this soundtrack.'
    },
    {
        difficulty: 'Easy',
        question: 'Who was the first actor in 50 years to win back-to-back Best Actor Oscars in the 90s?',
        answer: 'Tom Hanks',
        connection: 'Won for Philadelphia (1993) and Forrest Gump (1994).'
    },
    {
        difficulty: 'Easy',
        question: 'Which family of "Supers" won Best Animated Feature in 2005?',
        answer: 'The Incredibles',
        connection: 'First Pixar film to win multiple Oscars in a single night.'
    },
    {
        difficulty: 'Easy',
        question: 'Who won Best Actress for her role as Mia in La La Land?',
        answer: 'Emma Stone',
        connection: 'This was her first win before her second win for Poor Things.'
    },
    {
        difficulty: 'Easy',
        question: 'In what city is the ceremony held every year?',
        answer: 'Los Angeles',
        connection: 'Hosted at the Dolby Theatre (originally at the Hollywood Roosevelt).'
    },
    {
        difficulty: 'Medium',
        question: 'Which 2019 South Korean film was the first non-English film to win Best Picture?',
        answer: 'Parasite',
        connection: 'Swept Best Picture, Director, Screenplay, and International Feature.'
    },
    {
        difficulty: 'Medium',
        question: 'Which 2024 film about the atomic bomb earned Christopher Nolan his first Best Director win?',
        answer: 'Oppenheimer',
        connection: 'It swept the major categories, including Best Picture.'
    },
    {
        difficulty: 'Medium',
        question: 'Which film was correctly named Best Picture after La La Land was mistakenly announced in 2017?',
        answer: 'Moonlight',
        connection: 'Widely considered the biggest blunder in the history of the broadcast.'
    },
    {
        difficulty: 'Medium',
        question: 'Who is the most-nominated actress in Oscar history?',
        answer: 'Meryl Streep',
        connection: 'She currently holds 21 nominations and 3 wins.'
    },
    {
        difficulty: 'Medium',
        question: 'Which 1972 classic was the first "sequel" to ever win Best Picture?',
        answer: 'The Godfather Part II',
        connection: 'Followed its predecessor, which also won Best Picture.'
    },
    {
        difficulty: 'Medium',
        question: 'Who became the first woman to win Best Director in 2010?',
        answer: 'Kathryn Bigelow',
        connection: 'Won for The Hurt Locker, beating out Avatar.'
    },
    {
        difficulty: 'Medium',
        question: 'Which 2025 winner is the first in years to win both the Palme d\'Or and Best Picture?',
        answer: 'Anora',
        connection: 'Continues the trend of indie-leaning films winning the top prize.'
    },
    {
        difficulty: 'Medium',
        question: 'For which 2020 film did Anthony Hopkins become the oldest Best Actor winner at age 83?',
        answer: 'The Father',
        connection: 'His win was a major upset over the late Chadwick Boseman.'
    },
    {
        difficulty: 'Hard',
        question: 'Only three films have won "The Big Five" major categories. Name one.',
        answer: 'It Happened One Night, One Flew Over the Cuckoo\'s Nest, or The Silence of the Lambs',
        connection: 'This feat hasn\'t been repeated since 1991 (Silence of the Lambs).'
    },
    {
        difficulty: 'Hard',
        question: 'To date, has any actor ever won an Oscar for a performance in an MCU film?',
        answer: 'No',
        connection: 'While several have been nominated (like Angela Bassett), none have won.'
    }
];
