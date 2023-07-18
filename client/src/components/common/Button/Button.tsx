import styles from "./Button.module.scss";

type TProps = {
  type: "primary" | "secondary" | "outline" | "icon";
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
};

export const Button = ({
  type = "primary",
  link,
  onClick,
  children,
}: TProps) => {
  return (
    <>
      {link ? (
        // link buttons are used for external links
        <a href={link}>
          <button
            className={`${styles.button} ${
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
        </a>
      ) : (
        <button
          className={`${styles.button} ${
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
