// Definition of the environment variables that are available in the application.

interface ImportMetaEnv {
  readonly VITE_COLLABJAM_SERVERS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}