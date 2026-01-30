const OMDB_API_KEY = import.meta.env.PUBLIC_OMDB_API_KEY;
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

interface OMDbResponse {
    Title?: string;
    Year?: string;
    Poster?: string;
    Plot?: string;
    Director?: string;
    Actors?: string;
    imdbRating?: string;
    Response: string;
    Error?: string;
}

// Cache for poster URLs to avoid repeated API calls
const posterCache: Map<string, string | null> = new Map();

/**
 * Fetch movie data from OMDb API
 */
export async function fetchMovieData(title: string, year?: number): Promise<OMDbResponse | null> {
    try {
        let url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`;
        if (year) {
            url += `&y=${year}`;
        }

        const response = await fetch(url);
        const data: OMDbResponse = await response.json();

        if (data.Response === 'True') {
            return data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching from OMDb:', error);
        return null;
    }
}

/**
 * Get movie poster URL, with fallback to gradient
 */
export async function getMoviePoster(title: string, year?: number): Promise<string | null> {
    // Check cache first
    const cacheKey = `${title}-${year || ''}`;
    if (posterCache.has(cacheKey)) {
        return posterCache.get(cacheKey) || null;
    }

    const data = await fetchMovieData(title, year);

    if (data?.Poster && data.Poster !== 'N/A') {
        posterCache.set(cacheKey, data.Poster);
        return data.Poster;
    }

    // Try without year
    if (year) {
        const dataWithoutYear = await fetchMovieData(title);
        if (dataWithoutYear?.Poster && dataWithoutYear.Poster !== 'N/A') {
            posterCache.set(cacheKey, dataWithoutYear.Poster);
            return dataWithoutYear.Poster;
        }
    }

    posterCache.set(cacheKey, null);
    return null;
}

/**
 * Preload posters for a list of film titles
 */
export async function preloadPosters(films: string[]): Promise<void> {
    const promises = films.map(film => getMoviePoster(film));
    await Promise.allSettled(promises);
}
