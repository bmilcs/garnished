import { useEffect, useState } from "react";

type TWindowSize = [number, number];

export const useWindowResize = (): TWindowSize => {
  const initSize: TWindowSize = [window.innerWidth, window.innerHeight];
  const [windowSize, setWindowSize] = useState<TWindowSize>(initSize);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize([window.innerWidth, window.innerHeight]);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
