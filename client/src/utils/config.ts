// this file is used to store all the environment variable configuration

export const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT ?? "";

export const PRODUCTION_DOMAIN =
  (import.meta.env.VITE_PRODUCTION_DOMAIN as string) ?? "";

export const PREVIEW_DOMAIN =
  (import.meta.env.VITE_PREVIEW_DOMAIN as string) ?? "";

export const DEVELOPMENT_DOMAIN =
  (import.meta.env.VITE_DEVELOPMENT_DOMAIN as string) ?? "localhost";

export const GOOGLE_ANALYTICS_ID =
  (import.meta.env.VITE_GOOGLE_ANALYTICS_ID as string) ?? "";
