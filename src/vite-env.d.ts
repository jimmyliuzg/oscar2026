/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEB3FORMS_ACCESS_KEY: string
    readonly VITE_OMDB_API_KEY: string
    readonly VITE_GUEST_PASSWORD_HASH: string
    readonly VITE_PUBLIC_PASSWORD_HASH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
