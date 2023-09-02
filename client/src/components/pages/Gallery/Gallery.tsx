import backgroundImage from "@/assets/fruit-02.jpg";
import * as imagesObject from "@/assets/index";
import Carousel from "@/components/common/Carousel/Carousel";
import { Hero } from "@/components/common/Hero/Hero";
import { FC } from "react";
import styles from "./Gallery.module.scss";

export const Gallery: FC = () => {
  const imageUrls = Object.values(imagesObject);

  return (
    <>
      <Hero
        backgroundImage={backgroundImage}
        title="Photo"
        titleSpan="Gallery"
        subtitle="Eye candy from our events"
        heightInVH={35}
      />

      {/* image grid */}

      <section className={`content-spacer ${styles.carouselSection}`}>
        <div className="column">
          <Carousel imageArray={imageUrls} />
        </div>
      </section>
    </>
  );
};
