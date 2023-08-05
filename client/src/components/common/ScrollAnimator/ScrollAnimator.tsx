import { AnimatePresence, Variants, motion } from "framer-motion";
import React from "react";

interface ScrollAnimatorProps extends React.ComponentProps<typeof motion.div> {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  inViewPercent?: number;
}

type AnimationType =
  | "SLIDE_DOWN"
  | "SLIDE_UP"
  | "FADE_IN"
  | "FADE_GROW_IN"
  | "SLIDE_RIGHT";

// determine animation style based on type prop passed in
const getVariants = (
  type: AnimationType,
  delay: number,
  duration: number,
): Variants => {
  switch (type) {
    case "FADE_IN":
      return {
        offscreen: {
          opacity: 0,
        },
        onscreen: {
          opacity: 1,
          transition: {
            type: "spring",
            bounce: 0.4,
            duration: duration || 2,
            delay,
          },
        },
      };

    case "FADE_GROW_IN":
      return {
        offscreen: {
          opacity: 0,
          scale: 0.5,
        },
        onscreen: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: duration || 1,
            delay,
            ease: [0, 0.71, 0.2, 1.01],
          },
        },
      };

    case "SLIDE_UP":
      return {
        offscreen: {
          opacity: 0,
          y: 30,
        },
        onscreen: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            bounce: 0.5,
            duration: duration || 1,
            delay,
          },
        },
      };

    case "SLIDE_RIGHT":
      return {
        offscreen: {
          opacity: 0,
          x: -50,
        },
        onscreen: {
          x: 0,
          opacity: 1,
          transition: {
            type: "spring",
            bounce: 0.5,
            duration: duration || 1,
            delay,
          },
        },
      };

    case "SLIDE_DOWN":
    default:
      return {
        offscreen: {
          opacity: 0,
          y: -30,
        },
        onscreen: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            bounce: 0.3,
            duration: duration || 1,
            delay,
          },
        },
      };
  }
};

const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({
  type = "FADE_IN",
  delay = 0,
  duration = 0,
  inViewPercent = 0.1,
  ...rest
}) => {
  const variants = getVariants(type, delay, duration);

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: inViewPercent }}
        {...rest}
      />
    </AnimatePresence>
  );
};

export default ScrollAnimator;
