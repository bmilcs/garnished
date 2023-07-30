import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

type TProps = {
  type: "primary" | "secondary" | "outline" | "icon" | "hero";
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
  className?: string;
};

export const Button: FC<TProps> = ({
  type = "primary",
  link,
  onClick,
  children,
  className,
}) => {
  return (
    <>
      {link ? (
        // link buttons are used for external links
        <Link to={link}>
          <button
            className={`${styles.button} ${className ? className : ""} ${
              type === "primary"
                ? styles.primary
                : type === "secondary"
                ? styles.secondary
                : type === "icon"
                ? styles.icon
                : type === "hero"
                ? styles.hero
                : styles.outline
            }`}
            onClick={onClick}
          >
            {children}
          </button>
        </Link>
      ) : (
        <button
          className={`${styles.button} ${className ? className : ""}  ${
            type === "primary"
              ? styles.primary
              : type === "secondary"
              ? styles.secondary
              : type === "icon"
              ? styles.icon
              : styles.outline
          }`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};
