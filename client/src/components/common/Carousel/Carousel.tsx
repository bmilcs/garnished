import { ArrowSVG } from "@/components/common/ArrowSVG/ArrowSVG";
import { Button } from "@/components/common/Button/Button";
import { Modal } from "@/components/common/Modal/Modal";
import { ResponsiveImage } from "@/components/common/ResponsiveImage/ResponsiveImage";
import { useWindowResize } from "@/hooks/useWindowResize";
import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";

type TProps = {
  imageObject: {
    [key: string]: {
      full: string;
      small: string;
      medium: string;
      large: string;
    };
  };
};

function Carousel({ imageObject }: TProps) {
  const imageObjectArray = Object.values(imageObject);
  const windowSize = useWindowResize();
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselSlideRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navSlideRef = useRef<HTMLDivElement>(null);
  const [carouselSlideWidth, setCarouselSlideWidth] = useState(0);
  const [navSlideWidth, setNavSlideWidth] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(
    function setSlideWidthsOnWindowSizeChange() {
      setCarouselSlideWidth(carouselSlideRef.current?.scrollWidth ?? 0);
      setNavSlideWidth(navSlideRef.current?.scrollWidth ?? 0);
    },
    [windowSize],
  );

  useEffect(
    function scrollToImagesOnIndexChange() {
      const scrollAfterDebounce = setTimeout(() => {
        const carouselScrollPosition = carouselSlideWidth * currentImageIndex;
        carouselRef.current?.scrollTo({
          left: carouselScrollPosition,
          behavior: "smooth",
        });

        // scroll nav slide to center of the nav grid
        const navGridWidth = navRef.current?.clientWidth ?? 0;
        const navFarLeftScrollPosition = navSlideWidth * currentImageIndex;
        const navFinalScrollPosition =
          navFarLeftScrollPosition - (navGridWidth / 2 - navSlideWidth);
        navRef.current?.scrollTo({
          left: navFinalScrollPosition,
          behavior: "smooth",
        });
      }, 100);

      return () => clearTimeout(scrollAfterDebounce);
    },
    [currentImageIndex, carouselSlideWidth, navSlideWidth],
  );

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const index = scrollLeft / carouselSlideWidth;
    if (index % 1 !== 0) return;
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    currentImageIndex === imageObjectArray.length - 1
      ? setCurrentImageIndex(0)
      : setCurrentImageIndex(currentImageIndex + 1);
  };

  const handlePreviousImage = () => {
    currentImageIndex === 0
      ? setCurrentImageIndex(imageObjectArray.length - 1)
      : setCurrentImageIndex(currentImageIndex - 1);
  };

  const handleCarouselImageClick = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const handleModalImageClick = () => {
    setModalImage(null);
  };

  const handleNavigationSlideClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      {/* carousel */}

      <div className={styles.carouselWrapper}>
        <div
          className={`${styles.carousel}`}
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          tabIndex={0}
        >
          {imageObjectArray.map((image, index) => (
            <div
              key={image.full}
              className={styles.carouselSlide}
              ref={carouselSlideRef}
            >
              <ResponsiveImage
                img={image}
                onClick={() => handleCarouselImageClick(image.full)}
                alt={`Carousel Image #${index}`}
                className={styles.carouselImage}
              />
            </div>
          ))}
        </div>

        {/* carousel controls */}
        <div className={styles.carouselControls}>
          <Button
            type="icon"
            onClick={handlePreviousImage}
            className={styles.carouselArrowButton}
            ariaLabel="Previous Image"
          >
            <ArrowSVG direction="left" className={styles.carouselArrowSVG} />
          </Button>
          <Button
            type="icon"
            onClick={handleNextImage}
            className={styles.carouselArrowButton}
            ariaLabel="Next Image"
          >
            <ArrowSVG direction="right" className={styles.carouselArrowSVG} />
          </Button>
        </div>
      </div>

      {/* image grid */}
      <div className="">
        <div className={styles.navigationGrid} ref={navRef}>
          {imageObjectArray.map((image, index) => (
            <div ref={navSlideRef} key={`${image.full}-${index}`}>
              <Button
                type="icon"
                className={styles.navigationSlide}
                ariaLabel={`Image ${index + 1}`}
                key={image.full}
              >
                <ResponsiveImage
                  img={image}
                  alt={`Navigation Image ${index + 1}`}
                  onClick={() => handleNavigationSlideClick(index)}
                  className={`${styles.navigationSlideImage}${
                    index === currentImageIndex
                      ? ` ${styles.navigationSlideImageActive}`
                      : ""
                  }`}
                />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* modal */}

      {modalImage !== null && (
        <Modal onClick={() => handleModalImageClick()} type="image">
          <img src={modalImage} alt="Modal Image" />
        </Modal>
      )}
    </>
  );
}

export default Carousel;
