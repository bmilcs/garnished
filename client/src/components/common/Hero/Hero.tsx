import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { TResponsiveImage } from "@/components/common/ResponsiveImage/ResponsiveImage";
import { useWindowResize } from "@/hooks/useWindowResize";
import { TChildrenAndClassName } from "@/types/propTypes";
import { FC, useEffect, useState } from "react";
import styles from "./Hero.module.scss";

type TProps = TChildrenAndClassName & {
  backgroundImage: TResponsiveImage;
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
  const [windowWidth] = useWindowResize();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(
    function setBackgroundImageBasedOnWindowSize() {
      if (windowWidth < 480) setImageUrl(backgroundImage["320w"]);
      else if (windowWidth < 600) setImageUrl(backgroundImage["480w"]);
      else if (windowWidth < 768) setImageUrl(backgroundImage["600w"]);
      else setImageUrl(backgroundImage["full"]);
    },
    [windowWidth, backgroundImage],
  );

  return (
    <section aria-label="Hero">
      <AnimatedDiv type="FADE_IN" delay={0.2}>
        <div
          className={`${styles.hero}${className ? ` ${className}` : ""}`}
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url(${imageUrl}) center/cover no-repeat`,
            ...(heightInVH
              ? {
                  minHeight: `max(${heightInVH}vh, 400px)`,
                }
              : {}),
          }}
          {...rest}
        >
          <div className={styles.heroOverlay}>
            <AnimatedDiv
              type="SLIDE_RIGHT"
              delay={0.8}
              className={styles.heroWrapper}
            >
              <h1 className={styles.heroTitle}>
                {title}
                {titleSpan ? <span> {titleSpan}</span> : ""}
              </h1>

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
        </div>
      </AnimatedDiv>
    </section>
  );
};
