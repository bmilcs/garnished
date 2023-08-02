import { AnimatePresence, motion, MotionProps } from "framer-motion";
import React from "react";

type AnimationType = "SLIDE_DOWN" | "SLIDE_UP" | "FADE_IN";

interface AnimateInProps extends React.ComponentProps<typeof motion.div> {
  animationType?: AnimationType;
  delay?: number;
}

// determine animation style based on animationType prop passed in
const getAnimationVariables = (
  animationType: AnimationType,
): Partial<MotionProps> => {
  switch (animationType) {
    case "FADE_IN":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.85 },
      };
    case "SLIDE_UP":
      return {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 0 },
        transition: { type: "spring", bounce: 0.4, duration: 1 },
      };
    case "SLIDE_DOWN":
    default:
      return {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 0 },
        transition: { type: "spring", bounce: 0.4, duration: 1 },
      };
  }
};

const AnimateIn: React.FC<AnimateInProps> = ({
  animationType = "SLIDE_DOWN",
  delay = 0,
  ...rest
}) => {
  const animationVariables = getAnimationVariables(animationType);

  return (
    <AnimatePresence>
      <motion.div
        initial={animationVariables.initial}
        animate={animationVariables.animate}
        exit={animationVariables.exit}
        transition={{ delay: delay || 0, ...animationVariables.transition }}
        {...rest}
      />
    </AnimatePresence>
  );
};

export default AnimateIn;
