import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
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

// ScrollReveal — direction-aware reveal on scroll into view (up/left/right).
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion();
  const offsets = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };
  const { x, y } = offsets[direction] || offsets.up;
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// TextSplit — splits a string into words/lines and staggers their reveal.
export function TextSplit({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.08,
  ...rest
}) {
  const reduce = useReducedMotion();
  const words = String(text).split(" ");
  return (
    <span className={className} {...rest}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block ${wordClassName}`}
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

// Parallax — subtle vertical parallax tied to scroll position.
export function Parallax({
  children,
  className,
  speed = 0.1,
  ...rest
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  // Gentle, capped at ±20% of scroll delta per UI-SPEC.
  const cappedSpeed = Math.max(-0.2, Math.min(0.2, speed));

  return (
    <div ref={ref} className={className} {...rest}>
      <motion.div
        className="will-change-transform"
        animate={
          reduce || !inView
            ? { y: 0 }
            : { y: [0, cappedSpeed * 40, 0] }
        }
        transition={{ duration: 1.4, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// HoverScale — subtle scale on hover with smooth easing.
export function HoverScale({
  children,
  className,
  scale = 1.02,
  ...rest
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? {} : { scale }}
      whileTap={reduce ? {} : { scale: scale - 0.01 }}
      transition={{ duration: 0.3, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// MagneticButton — subtle cursor-follow translation on hover.
export function MagneticButton({
  children,
  className,
  strength = 8,
  ...rest
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (reduce || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      ref.current.style.transform = `translate(${relX * 0.2}px, ${relY * 0.2}px)`;
    },
    [reduce]
  );

  const reset = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ display: "inline-block", transition: "transform 0.3s var(--ease-out-expo)" }}
      {...rest}
    >
      {children}
    </div>
  );
}

// SectionLabel — a small editorial eyebrow with a leading numeral.
export function SectionLabel({ index, children }) {
  return (
    <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-text-secondary">
      <span className="opacity-60">{String(index).padStart(2, "0")}</span>
      <span className="inline-block h-px w-8 bg-ink/15" />
      {children}
    </p>
  );
}

