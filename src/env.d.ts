/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAPIKEY: string;
  readonly VITE_GAPIREFERER: string;
  readonly VITE_G_REDIRECT_URI: string;
  readonly VITE_G_CLIENT_ID: string;
  readonly VITE_G_CLIENT_SECRET: string;
  readonly VITE_VOODOO_URI: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
