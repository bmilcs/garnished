// import * as imagesObject from "@/assets/index";
import { drinks } from "@/assets";
import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { Button } from "@/components/common/Button/Button";
import { CallToAction } from "@/components/common/CallToAction/CallToAction";
import Carousel from "@/components/common/Carousel/Carousel";
import { Hero } from "@/components/common/Hero/Hero";
import { FC } from "react";
import styles from "./Gallery.module.scss";

export const Gallery: FC = () => {
  return (
    <>
      <Hero
        backgroundImage={drinks.specialty_drink_42.full}
        title="Photo"
        titleSpan="Gallery"
        subtitle="Drink in the beauty"
      />

      <section className={`content-spacer ${styles.carouselSection}`}>
        <AnimatedDiv type="SLIDE_UP" delay={0.5} className="column">
          <Carousel imageObject={drinks} />
        </AnimatedDiv>
      </section>

      {/* <CallToAction>
        <h3 className={styles.ctaHeading}>Ready for your free estimate?</h3>
        <Button link="/get-started" type="primary" className={styles.ctaButton}>
          Get Started
        </Button>
      </CallToAction> */}
    </>
  );
};
