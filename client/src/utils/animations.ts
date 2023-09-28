import { Variants } from "framer-motion";

export const PAGE_TRANSITION_DURATION = 0.5;
export const BASE_ANIMATION_DELAY = PAGE_TRANSITION_DURATION * 0.75;

export type TAnimationType =
  | "SLIDE_DOWN"
  | "SLIDE_UP"
  | "FADE_IN"
  | "FADE_GROW_IN"
  | "SLIDE_RIGHT";

// determine animation style
export const getAnimationVariants = (
  type: TAnimationType,
  delay: number,
  duration: number,
): Variants => {
  switch (type) {
    case "FADE_IN":
      return {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          transition: {
            type: "spring",
            bounce: 0.4,
            duration: duration || 2,
            delay: delay + BASE_ANIMATION_DELAY,
          },
        },
      };

    case "FADE_GROW_IN":
      return {
        initial: {
          opacity: 0,
          scale: 0.5,
        },
        animate: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: duration || 1,
            delay: delay + BASE_ANIMATION_DELAY,
            ease: [0, 0.71, 0.2, 1.01],
          },
        },
      };

    case "SLIDE_UP":
      return {
        initial: {
          opacity: 0,
          y: 30,
        },
        animate: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            bounce: 0.5,
            duration: duration || 1,
            delay: delay + BASE_ANIMATION_DELAY,
          },
        },
      };

    case "SLIDE_RIGHT":
      return {
        initial: {
          opacity: 0,
          x: -50,
        },
        animate: {
          x: 0,
          opacity: 1,
          transition: {
            type: "spring",
            bounce: 0.5,
            duration: duration || 1,
            delay: delay + BASE_ANIMATION_DELAY,
          },
        },
      };

    case "SLIDE_DOWN":
    default:
      return {
        initial: {
          opacity: 0,
          y: -30,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            bounce: 0.3,
            duration: duration || 1,
            delay: delay + BASE_ANIMATION_DELAY,
          },
        },
      };
  }
};
