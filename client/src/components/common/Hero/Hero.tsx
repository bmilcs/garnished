import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { TChildrenAndClassName } from "@/types/propTypes";
import { FC } from "react";
import styles from "./Hero.module.scss";

type TProps = TChildrenAndClassName & {
  backgroundImage: string;
  title: string;
  titleSpan?: string;
  subtitle?: string;
  heightInVH?: number;
};

export const Hero: FC<TProps> = ({
  backgroundImage,
  title,
  titleSpan,
  subtitle,
  children,
  heightInVH,
  className,
  ...rest
}) => {
  return (
    <section>
      <AnimatedDiv
        type="FADE_IN"
        delay={0.2}
        className={`${styles.hero}${className ? " " + className : ""}`}
        style={
          heightInVH
            ? {
                minHeight: `max(${heightInVH}vh, 400px)`,
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : {
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
        }
        {...rest}
      >
        <div className={styles.heroOverlay}>
          <AnimatedDiv
            type="SLIDE_RIGHT"
            delay={0.8}
            className={styles.heroWrapper}
          >
            <h2 className={styles.heroTitle}>
              {title}
              {titleSpan ? <span> {titleSpan}</span> : ""}
            </h2>

            <p className={styles.heroSubtitle}>{subtitle}</p>

            <AnimatedDiv
              type="SLIDE_UP"
              delay={1.2}
              className={styles.heroChildren}
            >
              {children}
            </AnimatedDiv>
          </AnimatedDiv>
        </div>
      </AnimatedDiv>
    </section>
  );
};
