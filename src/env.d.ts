/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAPIKEY: string;
  readonly VITE_GAPIREFERER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
