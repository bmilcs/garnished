import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
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
      <ScrollAnimator
        type="FADE_IN"
        delay={0.2}
        className={`${styles.hero}${className ? " " + className : ""}`}
        style={
          heightInVH
            ? {
                minHeight: `max(${heightInVH}vh, 400px)`,
                backgroundImage: `url(${backgroundImage})`,
              }
            : { backgroundImage: `url(${backgroundImage})` }
        }
        {...rest}
      >
        <div className={styles.heroOverlay}>
          <ScrollAnimator
            type="SLIDE_RIGHT"
            delay={0.8}
            className={styles.heroWrapper}
          >
            <h2 className={styles.heroTitle}>
              {title}
              {titleSpan ? <span> {titleSpan}</span> : ""}
            </h2>

            <p className={styles.heroSubtitle}>{subtitle}</p>

            <ScrollAnimator
              type="SLIDE_UP"
              delay={1.2}
              className={styles.heroChildren}
            >
              {children}
            </ScrollAnimator>
          </ScrollAnimator>
        </div>
      </ScrollAnimator>
    </section>
  );
};