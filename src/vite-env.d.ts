// Fix: Manually define types for Vite environment variables (`import.meta.env`).
// The default `/// <reference types="vite/client" />` was causing a "Cannot find type definition" error.
// This workaround provides the necessary types directly, resolving errors when accessing `import.meta.env`.
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
