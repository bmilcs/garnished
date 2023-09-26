// import * as imagesObject from "@/assets/index";
import { drinks } from "@/assets";
import Carousel from "@/components/common/Carousel/Carousel";
import { Hero } from "@/components/common/Hero/Hero";
import { PageTransition } from "@/components/common/PageTransition/PageTransition";
import { FC } from "react";
import styles from "./Gallery.module.scss";

export const Gallery: FC = () => {
  return (
    <PageTransition>
      <Hero
        backgroundImage={drinks.specialty_drink_42.full}
        title="Photo"
        titleSpan="Gallery"
        subtitle="Drink in the beauty"
      />

      <section className={`content-spacer ${styles.carouselSection}`}>
        <div className="column">
          <Carousel imageObject={drinks} />
        </div>
      </section>
    </PageTransition>
  );
};
