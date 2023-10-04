import { ArrowIcon } from "@/components/common/ArrowIcon/ArrowIcon";
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
  const [carouselScrollPosition, setCarouselScrollPosition] = useState(0);
  const DEBOUNCE_TIME = 100;

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
        // scroll current carousel slide to center of the carousel
        const carouselScrollPosition = carouselSlideWidth * currentImageIndex;
        carouselRef.current?.scrollTo({
          left: carouselScrollPosition,
          behavior: "smooth",
        });

        // scroll current nav slide to center of the nav grid
        const navGridWidth = navRef.current?.clientWidth ?? 0;
        const navFarLeftScrollPosition = navSlideWidth * currentImageIndex;
        const navCenteredScrollPosition =
          navFarLeftScrollPosition - (navGridWidth / 2 - navSlideWidth);
        navRef.current?.scrollTo({
          left: navCenteredScrollPosition,
          behavior: "smooth",
        });
      }, DEBOUNCE_TIME);

      return () => clearTimeout(scrollAfterDebounce);
    },
    [currentImageIndex, carouselSlideWidth, navSlideWidth],
  );

  useEffect(
    function changeImageIndexAfterCarouselScrollingStops() {
      const setImageIndexAfterDebounce = setTimeout(() => {
        const index = Math.round(carouselScrollPosition / carouselSlideWidth);
        setCurrentImageIndex(index);
      }, DEBOUNCE_TIME);

      return () => clearTimeout(setImageIndexAfterDebounce);
    },
    [carouselScrollPosition, carouselSlideWidth],
  );

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    setCarouselScrollPosition(scrollLeft);
  };

  const handleNextImage = () => {
    const onLastImage = currentImageIndex === imageObjectArray.length - 1;
    onLastImage
      ? setCurrentImageIndex(0)
      : setCurrentImageIndex(currentImageIndex + 1);
  };

  const handlePreviousImage = () => {
    const onFirstImage = currentImageIndex === 0;
    onFirstImage
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

        {/* carousel controls: left/right arrows */}

        <div className={styles.carouselControls}>
          <Button
            type="icon"
            onClick={handlePreviousImage}
            className={styles.carouselArrowButton}
            ariaLabel="Previous Image"
          >
            <ArrowIcon direction="left" className={styles.carouselArrowSVG} />
          </Button>
          <Button
            type="icon"
            onClick={handleNextImage}
            className={styles.carouselArrowButton}
            ariaLabel="Next Image"
          >
            <ArrowIcon direction="right" className={styles.carouselArrowSVG} />
          </Button>
        </div>
      </div>

      {/* image grid */}

      <div>
        <div className={styles.navigationGrid} ref={navRef}>
          {imageObjectArray.map((image, index) => (
            <div ref={navSlideRef} key={`${image.full}-${index}`}>
              <Button
                type="icon"
                className={styles.navigationSlide}
                ariaLabel={`Image ${index + 1}`}
                key={image.full}
                onClick={() => handleNavigationSlideClick(index)}
              >
                <ResponsiveImage
                  img={image}
                  alt={`Navigation Image ${index + 1}`}
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
        <Modal
          onClickCloseOrOverlay={() => handleModalImageClick()}
          onClickModal={() => handleModalImageClick()}
          type="image"
        >
          <img src={modalImage} alt="Modal Image" />
        </Modal>
      )}
    </>
  );
}

export default Carousel;
