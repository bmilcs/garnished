import { TClassName } from "@/types/propTypes";
import { FC } from "react";

type TProps = TClassName & {
  img: {
    full: string;
    small: string;
    medium: string;
    large: string;
  };
  onClick?: () => void;
  alt: string;
};

export const ResponsiveImage: FC<TProps> = ({
  img,
  alt,
  className,
  onClick,
}) => {
  return (
    <img
      src={img.full}
      alt={alt}
      className={className ?? ""}
      srcSet={`${img.small} 320w, ${img.medium} 480w, ${img.large} 600w`}
      sizes="(max-width: 400px) 100vw, (max-width: 800px) 50vw, 35vw"
      onClick={onClick}
      loading="lazy"
    />
  );
};
