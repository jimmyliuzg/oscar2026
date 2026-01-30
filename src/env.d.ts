/// <reference types="astro/client" />

interface ImportMetaEnv {
    // Server-side only (not exposed to client)
    readonly GUEST_PASSWORD_HASH: string;
    readonly PUBLIC_PASSWORD_HASH: string;

    // Public variables (can be used client-side)
    readonly PUBLIC_WEB3FORMS_ACCESS_KEY: string;
    readonly PUBLIC_OMDB_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
