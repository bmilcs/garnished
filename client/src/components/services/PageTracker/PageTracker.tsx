import { useEffect } from "react";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

export const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null;
};
