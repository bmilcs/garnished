// import * as imagesObject from "@/assets/index";
import { drinks } from "@/assets";
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
        subtitle="Eye candy from our events"
      />

      {/* image grid */}

      <section className={`content-spacer ${styles.carouselSection}`}>
        <div className="column">
          <Carousel imageObject={drinks} />
        </div>
      </section>
    </>
  );
};
