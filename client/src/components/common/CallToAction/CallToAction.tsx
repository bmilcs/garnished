import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { FC } from "react";
import styles from "./CallToAction.module.scss";

type TProps = {
  children: React.ReactNode;
};

export const CallToAction: FC<TProps> = ({ children }) => {
  return (
    <section className={styles.ctaSection}>
      <div className={`column ${styles.ctaWrapper}`}>
        <AnimatedDiv when="IN_VIEW" type="FADE_GROW_IN" delay={0.2}>
          {children}
        </AnimatedDiv>
      </div>
    </section>
  );
};
