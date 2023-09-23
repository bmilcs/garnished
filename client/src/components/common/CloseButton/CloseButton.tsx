import { Button } from "@/components/common/Button/Button";
import { TClassName } from "@/types/propTypes";
import { FC } from "react";

type TProps = TClassName & {
  onClick?: () => void;
};

export const CloseButton: FC<TProps> = ({ className, onClick }) => {
  return (
    <Button type="icon" className={className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
        />
      </svg>
    </Button>
  );
};