import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./constants";

// FadeIn — a calm, luxurious reveal on scroll. Respects reduced motion.
export function FadeIn({ children, delay = 0, y = 28, className, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// Fade — opacity-only reveal (for imagery / texture).
export function Fade({ children, delay = 0, className, ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.4, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// SectionLabel — a small editorial eyebrow with a leading numeral.
export function SectionLabel({ index, children }) {
  return (
    <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-soft">
      <span className="opacity-60">{String(index).padStart(2, "0")}</span>
      <span className="inline-block h-px w-8 bg-ink/15" />
      {children}
    </p>
  );
}

