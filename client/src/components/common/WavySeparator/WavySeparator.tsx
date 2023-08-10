import { TClassName } from "@/types/propTypes";
import { FC } from "react";
import styles from "./WavySeparator.module.scss";

type TProps = TClassName & {
  location?: "TOP" | "BOTTOM";
};

export const WavySeparator: FC<TProps> = ({ location = "UP", ...rest }) => {
  return (
    <div className={styles.wavySeparator}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={location === "TOP" ? { transform: "rotate(180deg)" } : {}}
        {...rest}
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className={styles.shapeFill}
        ></path>
      </svg>
    </div>
  );
};
