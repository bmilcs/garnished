import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

export const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.event({
      category: "Page View",
      action: "Page View",
      label: `${location.pathname} + ${location.search}`,
    });
  }, [location]);

  return null;
};
