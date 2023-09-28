import { TAnimationType, getAnimationVariants } from "@/utils/animations";
import { motion } from "framer-motion";
import React from "react";

interface IProps extends React.ComponentProps<typeof motion.div> {
  type?: TAnimationType;
  delay?: number;
  duration?: number;
  inViewPercent?: number;
  when?: "ON_LOAD" | "IN_VIEW";
}

const AnimatedDiv: React.FC<IProps> = ({
  type = "FADE_IN",
  when = "ON_LOAD",
  delay = 0,
  duration = 0,
  inViewPercent = 0.1,
  ...rest
}) => {
  const variants = getAnimationVariants(type, delay, duration);

  return when === "ON_LOAD" ? (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      {...rest}
    />
  ) : (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: inViewPercent }}
      {...rest}
    />
  );
};

export default AnimatedDiv;
