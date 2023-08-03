import { motion } from "framer-motion";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface IProps {
  type: "primary" | "secondary" | "outline" | "icon" | "hero";
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
  className?: string;
}

export const Button: FC<IProps> = ({
  type = "primary",
  link,
  onClick,
  children,
  className,
  ...rest
}) => {
  return (
    <>
      {link ? (
        // link buttons are used for external links
        <Link to={link}>
          <motion.button
            whileTap={{ scale: 0.95 }}
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
            {...rest}
          >
            {children}
          </motion.button>
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
