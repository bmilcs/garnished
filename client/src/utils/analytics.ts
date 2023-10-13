import { GOOGLE_ANALYTICS_ID } from "@/utils/config";
import ReactGA from "react-ga";
import { clientMode } from "./clientMode";

export const initAnalytics = () => {
  const isProduction = clientMode() === "production";
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, { debug: !isProduction });
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
