import { TClassName } from "@/types/propTypes";
import { FC } from "react";

export type TResponsiveImage = {
  full: string;
  "80w": string;
  "320w": string;
  "480w": string;
  "600w": string;
};

type TProps = TClassName & {
  img: TResponsiveImage;
  onClick?: () => void;
  alt: string;
  tabIndex?: number;
};

export const ResponsiveImage: FC<TProps> = ({
  img,
  alt,
  className,
  onClick,
  tabIndex,
}) => {
  return (
    <img
      alt={alt}
      className={className ?? ""}
      srcSet={`${img["320w"]} 320w, ${img["480w"]} 480w, ${img["600w"]} 600w`}
      sizes="(max-width: 768px) 90vw, (max-width: 1300px) 40vw, 600px"
      src={img["600w"]}
      onClick={onClick}
      tabIndex={tabIndex}
      loading="lazy"
    />
  );
};
