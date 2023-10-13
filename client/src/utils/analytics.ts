import { GOOGLE_ANALYTICS_ID } from "@/utils/config";
import ReactGA from "react-ga";
import { clientMode } from "./clientMode";

export const initGoogleAnalytics = () => {
  const isProduction = clientMode() === "production";
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, { debug: !isProduction });
};
