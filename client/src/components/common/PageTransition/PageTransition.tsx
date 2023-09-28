import { TClassName } from "@/types/propTypes";
import { PAGE_TRANSITION_DURATION } from "@/utils/animations";
import { motion } from "framer-motion";
import React, { FC } from "react";

type TProps = TClassName & {
  children: React.ReactNode;
};

export const PageTransition: FC<TProps> = ({ children, className }) => {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: PAGE_TRANSITION_DURATION }}
    >
      {children}
    </motion.main>
  );
};
