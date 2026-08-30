import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./constants";

export function FadeIn({ children, delay = 0, y = 24, className, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: EASE,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
