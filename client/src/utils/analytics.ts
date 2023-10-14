import { GOOGLE_ANALYTICS_ID } from "@/utils/config";
import ReactGA from "react-ga4";

export const initAnalytics = () => {
  // Google Measurement IDs differ based on environment (dev & prod .env files)
  ReactGA.initialize(GOOGLE_ANALYTICS_ID);
};

export const logEvent = ({
  category,
  action,
  label,
}: {
  category: string;
  action: string;
  label: string;
}) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
