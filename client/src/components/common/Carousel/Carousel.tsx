import { ArrowSVG } from "@/components/common/ArrowSVG/ArrowSVG";
import { Button } from "@/components/common/Button/Button";
import { Modal } from "@/components/common/Modal/Modal";
import { useWindowResize } from "@/hooks/useWindowResize";
import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";

type TProps = {
  imageArray: string[];
};

function Carousel({ imageArray }: TProps) {
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
    currentImageIndex === imageArray.length - 1
      ? setCurrentImageIndex(0)
      : setCurrentImageIndex(currentImageIndex + 1);
  };

  const handlePreviousImage = () => {
    currentImageIndex === 0
      ? setCurrentImageIndex(imageArray.length - 1)
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
        >
          {imageArray.map(image => (
            <div
              key={image}
              className={styles.carouselSlide}
              ref={carouselSlideRef}
            >
              <img
                src={image}
                onClick={() => handleCarouselImageClick(image)}
                alt={`Carousel Image ${image}`}
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
          {imageArray.map((image, index) => (
            <div ref={navSlideRef} key={`${image}-${index}`}>
              <Button
                type="icon"
                className={styles.navigationSlide}
                ariaLabel={`Image ${index + 1}`}
              >
                <img
                  key={image}
                  src={image}
                  alt={`Navigation Image ${image}`}
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
