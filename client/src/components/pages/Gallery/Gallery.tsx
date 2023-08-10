import backgroundImage from "@/assets/fruit-02.jpg";
import * as images from "@/assets/index";
import ScrollAnimator from "@/components/common/ScrollAnimator/ScrollAnimator";
import { FC, useEffect, useState } from "react";
import styles from "./Gallery.module.scss";

export const Gallery: FC = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(
    function modalKeyboardNavigation() {
      if (modalImage === null) return;

      const toggleNextImage = () => {
        const imageUrls = Object.values(images);
        const currentImageIndex = imageUrls.indexOf(modalImage);

        if (currentImageIndex === imageUrls.length - 1) {
          setModalImage(imageUrls[0]);
        } else {
          setModalImage(imageUrls[currentImageIndex + 1]);
        }
      };

      const togglePreviousImage = () => {
        const imageUrls = Object.values(images);
        const currentImageIndex = imageUrls.indexOf(modalImage);

        if (currentImageIndex === 0) {
          setModalImage(imageUrls[imageUrls.length - 1]);
        } else {
          setModalImage(imageUrls[currentImageIndex - 1]);
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowLeft":
            togglePreviousImage();
            break;
          case "ArrowRight":
            toggleNextImage();
            break;
          case "Escape":
            setModalImage(null);
            break;
          default:
            break;
        }
      };

      document.body.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.removeEventListener("keydown", handleKeyDown);
      };
    },
    [modalImage],
  );

  const handleGalleryImageClick = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const handleModalClick = () => {
    setModalImage(null);
  };

  return (
    <>
      <section>
        <ScrollAnimator
          type="FADE_IN"
          delay={0.2}
          className={styles.hero}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className={styles.heroOverlay}>
            <ScrollAnimator
              type="SLIDE_RIGHT"
              delay={0.8}
              className={styles.heroWrapper}
            >
              <h2 className={styles.heroTitle}>
                Photos from <span>Garnished</span> Events
              </h2>

              <p className={styles.heroSubtitle}>
                The Premium Mobile Bar Service
              </p>
            </ScrollAnimator>
          </div>
        </ScrollAnimator>
      </section>

      {/* image grid */}

      <section className="column">
        <ScrollAnimator type="SLIDE_UP" delay={1}>
          <div className={styles.gallery}>
            {Object.values(images).map((image, index) => {
              return (
                <button
                  className={styles.galleryImageButton}
                  key={image}
                  onClick={() => handleGalleryImageClick(image)}
                >
                  <img
                    src={image}
                    className={styles.galleryImage}
                    alt={`Gallery Image ${index}`}
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </ScrollAnimator>
      </section>

      {/* modal */}

      {modalImage !== null && (
        <div className={styles.modal} onClick={handleModalClick}>
          <ScrollAnimator
            type="FADE_GROW_IN"
            className={styles.modalImageWrapper}
          >
            <img
              src={modalImage}
              className={styles.modalImage}
              alt="Modal Image"
            />
          </ScrollAnimator>
        </div>
      )}
    </>
  );
};
