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
        {title && <h3>{title}</h3>}

        {/* if message exists with a title, add .message (margin) to message.
        otherwise just render message */}
        {message && title ? (
          <p className={styles.message}>{message}</p>
        ) : (
          <p>message</p>
        )}

        {/* if children exist with a title or message, add .children class (margin) 
        otherwise just render children */}
        {children && (title || message) ? (
          <div className={styles.children}>{children}</div>
        ) : (
          children
        )}

        <CloseButton
          onClick={onClickCloseOrOverlay}
          className={styles.closeButton}
        />
      </ScrollAnimator>
    </div>
  );
};
