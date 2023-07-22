// by default, "npm run dev" loads ".env.development"
// and production loads ".env.production"

export const getApiEndpoint = () => {
  return import.meta.env.VITE_API_ENDPOINT;
};
