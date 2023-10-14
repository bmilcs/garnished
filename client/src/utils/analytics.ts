import { GOOGLE_ANALYTICS_ID } from "@/utils/config";
import ReactGA from "react-ga4";
import { clientMode } from "./clientMode";

export const initAnalytics = () => {
  const isDevelopment = clientMode() !== "production";
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, { testMode: Boolean(isDevelopment) });
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
