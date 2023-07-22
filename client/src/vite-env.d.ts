/// <reference types="vite/client" />

declare module "*.module.css";
declare module "*.module.scss";

interface ImportMetaEnv {
  VITE_API_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
