import { ArrowIcon } from "@/components/common/ArrowIcon/ArrowIcon";
import { Button } from "@/components/common/Button/Button";
import { Modal } from "@/components/common/Modal/Modal";
import {
  ResponsiveImage,
  TResponsiveImage,
} from "@/components/common/ResponsiveImage/ResponsiveImage";
import { useWindowResize } from "@/hooks/useWindowResize";
import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";

type TProps = {
  imageObject: {
    [key: string]: TResponsiveImage;
  };
};

function Carousel({ imageObject }: TProps) {
  const MANUAL_SCROLL_DEBOUNCE_TIME_IN_MS = 200;
  const AUTO_SCROLL_DELAY_DEFAULT_IN_MS = 2500;
  const AUTO_SCROLL_DELAY_AFTER_USER_INTERACTION_IN_MS =
    AUTO_SCROLL_DELAY_DEFAULT_IN_MS * 1.5;
  const imageObjectArray = Object.values(imageObject);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselSlideRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navSlideRef = useRef<HTMLDivElement>(null);
  const [windowWidth] = useWindowResize();
  const [carouselSlideWidth, setCarouselSlideWidth] = useState(0);
  const [navSlideWidth, setNavSlideWidth] = useState(0);
  const [modalImage, setModalImage] = useState<TResponsiveImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselScrollPosition, setCarouselScrollPosition] = useState(0);
  const [autoScrollDelay, setAutoScrollDelay] = useState(3000);

  // save carousel scroll position on scroll. this is used to determine the
  // current image index when the user scrolls the carousel manually.

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    setCarouselScrollPosition(scrollLeft);
  };

  // after clicking on a carousel arrow, adjust the current image index &
  // increase the auto scroll delay to prevent the carousel
  // from automatically scrolling immediately after user interaction.

  const handleNextImage = () => {
    setAutoScrollDelay(AUTO_SCROLL_DELAY_AFTER_USER_INTERACTION_IN_MS);
    const onLastImage = currentImageIndex === imageObjectArray.length - 1;
    onLastImage
      ? setCurrentImageIndex(0)
      : setCurrentImageIndex(currentImageIndex + 1);
  };

  const handlePreviousImage = () => {
    setAutoScrollDelay(AUTO_SCROLL_DELAY_AFTER_USER_INTERACTION_IN_MS);
    const onFirstImage = currentImageIndex === 0;
    onFirstImage
      ? setCurrentImageIndex(imageObjectArray.length - 1)
      : setCurrentImageIndex(currentImageIndex - 1);
  };

  // after clicking on a navigation slide image, adjust the current image index &
  // increase the auto scroll delay to prevent the carousel
  // from automatically scrolling immediately after user interaction.

  const handleNavigationSlideClick = (imageIndex: number) => {
    setAutoScrollDelay(AUTO_SCROLL_DELAY_AFTER_USER_INTERACTION_IN_MS);
    setCurrentImageIndex(imageIndex);
  };

  // after clicking on a carousel image, open the modal

  const handleCarouselImageClick = (responsiveImage: TResponsiveImage) => {
    setModalImage(responsiveImage);
  };

  // after clicking on the opened modal image, close the modal

  const handleModalImageClick = () => {
    setModalImage(null);
  };

  // on window width change, set carousel slide & nav slide widths

  useEffect(
    function setSlideWidthsOnWindowWidthChange() {
      setCarouselSlideWidth(carouselSlideRef.current?.scrollWidth ?? 0);
      setNavSlideWidth(navSlideRef.current?.scrollWidth ?? 0);
    },
    [windowWidth],
  );

  // automatically scroll carousel images on a timer. the timer is reset
  // whenever the user manually changes the image or opens the modal.
  // once the user stops interacting with the carousel,
  // the timer is reset to the default value.

  useEffect(
    function autoScrollImagesOnTimer() {
      const autoScroll = setInterval(() => {
        setAutoScrollDelay(AUTO_SCROLL_DELAY_DEFAULT_IN_MS);
        const onLastImage = currentImageIndex === imageObjectArray.length - 1;
        onLastImage
          ? setCurrentImageIndex(0)
          : setCurrentImageIndex(currentImageIndex + 1);
      }, autoScrollDelay);
      // stop auto scroll when modal is open
      if (modalImage) clearInterval(autoScroll);
      return () => clearInterval(autoScroll);
    },
    // by adding currentImageIndex to the dependency array, we ensure that the
    // auto scroll timer is reset whenever the user manually changes the image
    [modalImage, currentImageIndex, imageObjectArray, autoScrollDelay],
  );

  // after the user manually scrolls the carousel, determine the current image index
  // based on the carousel scroll position. this is done after a debounce to allow the
  // css scroll animation to complete and to prevent the image index from changing
  // while the user is still scrolling. once the user stops scrolling & the image index
  // is updated, the nav slide is scrolled to the center of the nav grid via the
  // useEffect after this one.

  useEffect(
    function changeImageIndexAfterCarouselScrollingStops() {
      const setImageIndexAfterDebounce = setTimeout(() => {
        const index = Math.round(carouselScrollPosition / carouselSlideWidth);
        setCurrentImageIndex(index);
      }, MANUAL_SCROLL_DEBOUNCE_TIME_IN_MS);

      return () => clearTimeout(setImageIndexAfterDebounce);
    },
    [carouselScrollPosition, carouselSlideWidth],
  );

  // regardless of how the image index is changed, scroll to the correct carousel
  // and navigation slide images. this is done after a debounce to allow the
  // css scroll animation to complete.

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
        const navGridVisibleWidth = navRef.current?.clientWidth ?? 0;
        const navFarLeftScrollPosition = navSlideWidth * currentImageIndex;
        const navCenteredScrollPosition =
          navFarLeftScrollPosition -
          navGridVisibleWidth / 2 +
          navSlideWidth / 2;
        navRef.current?.scrollTo({
          left: navCenteredScrollPosition,
          behavior: "smooth",
        });
      }, MANUAL_SCROLL_DEBOUNCE_TIME_IN_MS);

      return () => clearTimeout(scrollAfterDebounce);
    },
    [currentImageIndex, carouselSlideWidth, navSlideWidth],
  );

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
                onClick={() => handleCarouselImageClick(image)}
                alt={`Carousel Image #${index + 1}`}
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

      {/* navigation image grid */}

      <div className={styles.navigationGrid} ref={navRef}>
        {imageObjectArray.map((image, index) => (
          <div ref={navSlideRef} key={`${image.full}-${index}`}>
            <Button
              type="icon"
              className={styles.navigationSlide}
              ariaLabel={`View Full Image ${index + 1}`}
              key={image.full}
              onClick={() => handleNavigationSlideClick(index)}
            >
              <img
                src={image["80w"]}
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

      {/* modal */}

      {modalImage && (
        <Modal
          onClickCloseOrOverlay={() => handleModalImageClick()}
          onClickModal={() => handleModalImageClick()}
          type="image"
        >
          <ResponsiveImage
            img={modalImage}
            alt="Modal Image"
            className={styles.modalImage}
          />
        </Modal>
      )}
    </>
  );
}

export default Carousel;
