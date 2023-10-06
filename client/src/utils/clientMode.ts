const productionDomain =
  (import.meta.env.VITE_PRODUCTION_DOMAIN as string) || "garnished.events";
const developmentDomain =
  (import.meta.env.VITE_DEVELOPMENT_DOMAIN as string) || "localhost";
const previewDomain =
  (import.meta.env.VITE_PREVIEW_DOMAIN as string) || "test.garnished.events";

export const clientMode = () => {
  const domain = window.location.hostname;
  return domain === productionDomain
    ? "production"
    : domain === developmentDomain
    ? "development"
    : domain === previewDomain
    ? "preview"
    : null;
};
