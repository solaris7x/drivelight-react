/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROOTFOLDERID: string;
  readonly VITE_TEAMDRIVEID: string;
  readonly VITE_GAPIKEY: string;
  readonly VITE_GAPIREFERER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
