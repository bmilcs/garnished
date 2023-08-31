import { useWindowResize } from "@/hooks/useWindowResize";
import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";

type TProps = {
  imageArray: string[];
};

function Carousel({ imageArray }: TProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselTotalWidth, setCarouselTotalWidth] = useState(0);
  const [carouselVisibleWidth, setCarouselVisibleWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowResize();

  useEffect(() => {
    setCarouselTotalWidth(carouselRef.current?.scrollWidth ?? 0);
    setCarouselVisibleWidth(carouselRef.current?.clientWidth ?? 0);
    setSlideWidth(slideRef.current?.scrollWidth ?? 0);
  }, [windowSize, carouselTotalWidth]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    setScrollPosition(scrollLeft);
    const slideWidthPercentage = slideWidth / carouselVisibleWidth;
    const offset = scrollLeft * slideWidthPercentage;

    console.log(
      { scrollPosition: scrollLeft },
      { carouselTotalWidth },
      { carouselVisibleWidth },
      { slideWidth },
      { slideWidthPercentage },
      { offset },
    );
  };

  const handleNextImage = () => {
    currentImageIndex === imageArray.length - 1
      ? setCurrentImageIndex(0)
      : setCurrentImageIndex(currentImageIndex + 1);
  };

  const handlePreviousImage = () => {
    currentImageIndex === 0
      ? setCurrentImageIndex(imageArray.length - 1)
      : setCurrentImageIndex(currentImageIndex - 1);
  };

  return (
    <div className={styles.carousel} ref={carouselRef} onScroll={handleScroll}>
      {imageArray.map((image, index) => (
        <div key={image} className={styles.carouselItem} ref={slideRef}>
          <img
            src={image}
            onClick={() => setCurrentImageIndex(index)}
            className={styles.carouselImage}
          />
        </div>
      ))}
    </div>
  );
}

export default Carousel;
