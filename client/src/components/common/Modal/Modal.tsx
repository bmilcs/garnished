import { CloseButton } from "@/components/common/CloseButton/CloseButton";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { TChildrenAndClassName } from "@/types/propTypes";
import { FC, useEffect } from "react";
import styles from "./Modal.module.scss";

type TProps = TChildrenAndClassName & {
  type: "standard" | "image";
  title?: string;
  message?: string;
  onClickCloseOrOverlay?: () => void;
};

const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

export const Modal: FC<TProps> = ({
  type = "standard",
  title,
  message,
  children,
  onClickCloseOrOverlay,
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
          onClickCloseOrOverlay?.();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    [onClickCloseOrOverlay],
  );

  return (
    <div
      className={`${styles.modalOverlay}${className ? ` ${className}` : ""}`}
      onClick={onClickCloseOrOverlay}
    >
      <ScrollAnimator
        className={`${styles.modal}${
          type === "image" ? ` ${styles.image}` : ` ${styles.standard}`
        }`}
        onClick={handleModalClick}
      >
        {title && <h3 className={styles.title}>{title}</h3>}
        {message && <p className={styles.message}>{message}</p>}

        {children}

        <CloseButton
          onClick={onClickCloseOrOverlay}
          className={styles.closeButton}
        />
      </ScrollAnimator>
    </div>
  );
};
