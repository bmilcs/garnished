import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { Button } from "@/components/common/Button/Button";
import { AuthContext } from "@/hooks/useAuthContext";
import { TClassName } from "@/types/propTypes";
import { FC, useContext } from "react";
import styles from "./GetStartedButton.module.scss";

export const GetStartedButton: FC = ({ className }: TClassName) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <AnimatedDiv
      type="SLIDE_UP"
      delay={0.5}
      className={`${styles.buttonWrapper} ${className ?? ""}`}
    >
      {isLoggedIn ? (
        <Button type="primary" link="/event/new" className={styles.button}>
          Create an Event
        </Button>
      ) : (
        <Button type="primary" link="/get-started" className={styles.button}>
          Get Started
        </Button>
      )}
    </AnimatedDiv>
  );
};
