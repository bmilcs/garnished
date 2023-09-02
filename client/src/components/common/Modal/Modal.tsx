import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { TChildrenAndClassName } from "@/types/propTypes";
import { FC, useEffect } from "react";
import styles from "./Modal.module.scss";

type TProps = TChildrenAndClassName & {
  type: "standard" | "image";
  title?: string;
  message?: string;
  onClick?: () => void;
};

export const Modal: FC<TProps> = ({
  type = "standard",
  title,
  message,
  children,
  onClick,
  className,
}) => {
  useEffect(
    function addKeyboardNavigation() {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.key === "Escape" ||
          e.key === "Spacebar" ||
          e.key === " " ||
          e.key === "Enter"
        ) {
          onClick?.();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    [onClick],
  );

  return (
    <div
      className={`${styles.modalOverlay}${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      <ScrollAnimator
        className={`${styles.modal}${
          type === "image" ? ` ${styles.image}` : ` ${styles.standard}`
        }`}
      >
        {title && <h3 className={styles.title}>{title}</h3>}
        {message && <p className={styles.message}>{message}</p>}
        {children}
      </ScrollAnimator>
    </div>
  );
};
