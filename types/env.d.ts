// Definition of the environment variables that are available in the application.

interface ImportMetaEnv {
  readonly VITE_ELECTRON_SERVERS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}