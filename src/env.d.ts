/// <reference types="astro/client" />

interface ImportMetaEnv {
    // Server-side only (not exposed to client)
    readonly GUEST_PASSWORD_HASH: string;
    readonly PUBLIC_PASSWORD_HASH: string;

    // TMDB API token (server-side only - used in /api/tmdb endpoint)
    readonly TMDB_API_READ_TOKEN: string;

    // Public variables (can be used client-side)
    readonly PUBLIC_WEB3FORMS_ACCESS_KEY: string;

    // Legacy - keeping for reference but no longer used
    // readonly PUBLIC_OMDB_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
