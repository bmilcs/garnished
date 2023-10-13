import {
  DEVELOPMENT_DOMAIN,
  PREVIEW_DOMAIN,
  PRODUCTION_DOMAIN,
} from "@/utils/config";

export const clientMode = () => {
  const domain = window.location.hostname;
  return domain === PRODUCTION_DOMAIN
    ? "production"
    : domain === DEVELOPMENT_DOMAIN
    ? "development"
    : domain === PREVIEW_DOMAIN
    ? "preview"
    : null;
};
