import { TClassName } from "@/types/propTypes";
import { FC } from "react";
import styles from "./TiltDivider.module.scss";

type TProps = TClassName & {
  location?: "TOP" | "BOTTOM";
};

export const TiltDivider: FC<TProps> = ({ location = "TOP", ...rest }) => {
  return (
    <div className={styles.tiltDivider}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={location === "TOP" ? { transform: "rotate(180deg)" } : {}}
        {...rest}
      >
        <path
          d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
          className={styles.shapeFill}
        ></path>
      </svg>
    </div>
  );
};
