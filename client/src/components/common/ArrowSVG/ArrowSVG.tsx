import { TClassName } from "@/types/propTypes";
import { FC } from "react";

type TArrowDirection = "left" | "right";

type TProps = TClassName & { direction: TArrowDirection };

export const ArrowSVG: FC<TProps> = ({ direction = "left", className }) => {
  return direction === "left" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={className ?? ""}
    >
      <path fill="currentColor" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={className ?? ""}
    >
      <path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z" />
    </svg>
  );
};
