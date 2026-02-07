/**
 * TMDB (The Movie Database) API Service
 * 
 * Provides movie posters and person images for Oscar nominees.
 * Uses TMDB API v3 with Bearer token authentication.
 * 
 * API Key should be stored in Cloudflare Pages environment variables as:
 * - TMDB_API_READ_TOKEN (server-side only, for secure API calls)
 * 
 * For client-side, we use a server endpoint to proxy requests.
 */

// API calls are proxied through /api/tmdb to keep the token secure
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image size options
export const IMAGE_SIZES = {
    poster: {
        small: 'w185',
        medium: 'w342',
        large: 'w500',
        original: 'original',
    },
    profile: {
        small: 'w45',
        medium: 'w185',
        large: 'h632',
        original: 'original',
    },
    backdrop: {
        small: 'w300',
        medium: 'w780',
        large: 'w1280',
        original: 'original',
    },
} as const;

// Types for TMDB API responses
interface TMDBMovie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    overview: string;
}

interface TMDBPerson {
    id: number;
    name: string;
    profile_path: string | null;
    known_for_department: string;
}

interface TMDBCastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

interface TMDBCrewMember {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
}

interface TMDBCreditsResponse {
    id: number;
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
}

interface TMDBSearchMovieResponse {
    page: number;
    results: TMDBMovie[];
    total_pages: number;
    total_results: number;
}

interface TMDBSearchPersonResponse {
    page: number;
    results: TMDBPerson[];
    total_pages: number;
    total_results: number;
}

// Caches to reduce API calls
const movieCache = new Map<string, TMDBMovie | null>();
const personCache = new Map<string, TMDBPerson | null>();
const creditsCache = new Map<number, TMDBCreditsResponse | null>();

/**
 * Build full image URL from TMDB path
 */
export function getImageUrl(
    path: string | null,
    type: 'poster' | 'profile' | 'backdrop' = 'poster',
    size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): string | null {
    if (!path) return null;
    const sizeConfig = IMAGE_SIZES[type][size];
    return `${TMDB_IMAGE_BASE_URL}/${sizeConfig}${path}`;
}

/**
 * Make authenticated TMDB API request
 * This is called from the client through our API endpoint
 */
async function tmdbFetch<T>(endpoint: string): Promise<T | null> {
    try {
        // Use our server-side API endpoint to proxy TMDB requests
        // This keeps the API token secure on the server
        const response = await fetch(`/api/tmdb?endpoint=${encodeURIComponent(endpoint)}`);

        if (!response.ok) {
            console.error('TMDB API error:', response.status);
            return null;
        }

        return await response.json() as T;
    } catch (error) {
        console.error('TMDB fetch error:', error);
        return null;
    }
}

/**
 * Search for a movie by title
 */
export async function searchMovie(title: string, year?: number): Promise<TMDBMovie | null> {
    const cacheKey = `${title}-${year || ''}`;

    if (movieCache.has(cacheKey)) {
        return movieCache.get(cacheKey) || null;
    }

    let endpoint = `/search/movie?query=${encodeURIComponent(title)}`;
    if (year) {
        endpoint += `&year=${year}`;
    }

    const data = await tmdbFetch<TMDBSearchMovieResponse>(endpoint);

    if (data?.results && data.results.length > 0) {
        const movie = data.results[0];
        movieCache.set(cacheKey, movie);
        return movie;
    }

    // Try without year if no results
    if (year) {
        const dataWithoutYear = await tmdbFetch<TMDBSearchMovieResponse>(
            `/search/movie?query=${encodeURIComponent(title)}`
        );
        if (dataWithoutYear?.results && dataWithoutYear.results.length > 0) {
            const movie = dataWithoutYear.results[0];
            movieCache.set(cacheKey, movie);
            return movie;
        }
    }

    movieCache.set(cacheKey, null);
    return null;
}

/**
 * Search for a person by name
 */
export async function searchPerson(name: string): Promise<TMDBPerson | null> {
    if (personCache.has(name)) {
        return personCache.get(name) || null;
    }

    const endpoint = `/search/person?query=${encodeURIComponent(name)}`;
    const data = await tmdbFetch<TMDBSearchPersonResponse>(endpoint);

    if (data?.results && data.results.length > 0) {
        const person = data.results[0];
        personCache.set(name, person);
        return person;
    }

    personCache.set(name, null);
    return null;
}

/**
 * Get movie credits (cast and crew)
 */
export async function getMovieCredits(movieId: number): Promise<TMDBCreditsResponse | null> {
    if (creditsCache.has(movieId)) {
        return creditsCache.get(movieId) || null;
    }

    const endpoint = `/movie/${movieId}/credits`;
    const data = await tmdbFetch<TMDBCreditsResponse>(endpoint);

    if (data) {
        creditsCache.set(movieId, data);
        return data;
    }

    creditsCache.set(movieId, null);
    return null;
}

/**
 * Get movie poster URL
 */
export async function getMoviePoster(
    title: string,
    year?: number,
    size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): Promise<string | null> {
    const movie = await searchMovie(title, year);
    return getImageUrl(movie?.poster_path || null, 'poster', size);
}

/**
 * Get person profile image URL
 */
export async function getPersonImage(
    name: string,
    size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): Promise<string | null> {
    const person = await searchPerson(name);
    return getImageUrl(person?.profile_path || null, 'profile', size);
}

/**
 * Get person image from a specific movie's credits
 * This is preferred as it shows them in context of their nominated work
 */
export async function getPersonImageFromMovie(
    personName: string,
    movieTitle: string,
    movieYear?: number,
    size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): Promise<string | null> {
    // First, find the movie
    const movie = await searchMovie(movieTitle, movieYear);
    if (!movie) {
        // Fallback to general person search
        return getPersonImage(personName, size);
    }

    // Get movie credits
    const credits = await getMovieCredits(movie.id);
    if (!credits) {
        return getPersonImage(personName, size);
    }

    // Search in cast first
    const normalizedName = personName.toLowerCase();
    const castMember = credits.cast.find(
        (c) => c.name.toLowerCase() === normalizedName
    );
    if (castMember?.profile_path) {
        return getImageUrl(castMember.profile_path, 'profile', size);
    }

    // Search in crew
    const crewMember = credits.crew.find(
        (c) => c.name.toLowerCase() === normalizedName
    );
    if (crewMember?.profile_path) {
        return getImageUrl(crewMember.profile_path, 'profile', size);
    }

    // Fallback to general person search
    return getPersonImage(personName, size);
}

/**
 * Get appropriate image based on category type
 * Returns movie poster for film-focused categories, person image for person-focused
 */
export async function getNomineeImage(
    nomineeName: string,
    filmTitle: string,
    filmYear?: number,
    categoryId?: string,
    size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): Promise<string | null> {
    // Person-focused categories - get person image
    const personCategories = [
        'directing',
        'actorLeading',
        'actressLeading',
        'actorSupporting',
        'actressSupporting',
        'originalScreenplay',
        'adaptedScreenplay',
        'cinematography',
        'costumeDesign',
        'filmEditing',
        'originalScore',
        'casting',
    ];

    if (categoryId && personCategories.includes(categoryId)) {
        // Try to get person image from movie credits first
        return getPersonImageFromMovie(nomineeName, filmTitle, filmYear, size);
    }

    // Film-focused categories - get movie poster
    return getMoviePoster(filmTitle, filmYear, size);
}

/**
 * Get movie backdrop image (for featured sections)
 */
export async function getMovieBackdrop(
    title: string,
    year?: number,
    size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): Promise<string | null> {
    const movie = await searchMovie(title, year);
    return getImageUrl(movie?.backdrop_path || null, 'backdrop', size);
}
