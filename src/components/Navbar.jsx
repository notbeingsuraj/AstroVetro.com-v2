import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "SHOP", href: "#collection" },
  { label: "READINGS", href: "#services" },
  { label: "DISCOVER", href: "#science" },
  { label: "JOURNAL", href: "#journal" },
];

// Section colour mapping for dynamic navbar (matches new palette section fields).
// isDark controls whether text is light (on dark sections) or dark (on light).
const SECTION_COLORS = {
  top: { isDark: false },
  hero: { isDark: false },
  brand: { isDark: true },
  intentions: { isDark: false },
  featured: { isDark: false },
  collection: { isDark: false },
  science: { isDark: true },
  interlude: { isDark: false },
  guidance: { isDark: false },
  services: { isDark: false },
  experience: { isDark: false },
  trust: { isDark: false },
  testimonials: { isDark: false },
  journal: { isDark: false },
  final: { isDark: false },
  footer: { isDark: true },
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = Object.keys(SECTION_COLORS);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isDark = SECTION_COLORS[activeSection]?.isDark ?? false;
  const textColor = isDark ? "var(--color-text-on-dark)" : "var(--color-ink)";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-md" : "bg-transparent"
        }`}
        style={{
          backgroundColor: scrolled
            ? isDark
              ? "rgba(50,27,69,0.7)"
              : "rgba(255,249,241,0.7)"
            : "transparent",
          borderBottom: scrolled
            ? `1px solid ${isDark ? "rgba(255,249,241,0.12)" : "rgba(23,19,29,0.08)"}`
            : "none",
        }}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 lg:px-16">
          {/* Brand — editorial wordmark */}
          <a
            href="#top"
            className="font-display text-xl tracking-[0.05em] transition-colors duration-500"
            style={{ color: textColor }}
            aria-label="AstroVetro home"
          >
            ASTROVETRO
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:opacity-60"
                style={{ color: textColor }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="#collection"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-ivory transition-all duration-300 hover:bg-deep-plum"
            >
              EXPLORE
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="flex flex-col gap-2">
              <motion.span
                animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-7 transition-colors duration-500"
                style={{ backgroundColor: open ? "#FFE66D" : textColor }}
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-[1.5px] w-7 transition-colors duration-500"
                style={{ backgroundColor: open ? "#FFE66D" : textColor }}
              />
              <motion.span
                animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-7 transition-colors duration-500"
                style={{ backgroundColor: open ? "#FFE66D" : textColor }}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-screen mobile navigation overlay — huge typography, editorial */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col bg-ivory lg:hidden"
          >
            {/* Close button */}
            <div className="absolute right-6 top-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-12 w-12 items-center justify-center text-ink"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation links — huge serif typography */}
            <nav className="flex flex-1 flex-col items-start justify-center px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setOpen(false)}
                  className="group mb-6 flex items-baseline gap-4"
                >
                  <span className="text-micro text-text-muted">0{i + 1}</span>
                  <span className="font-display text-5xl text-ink transition-colors duration-300 group-hover:text-electric-lilac">
                    {link.label}
                  </span>
                </motion.a>
              ))}

              {/* Mobile CTA */}
              <motion.a
                href="#collection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                onClick={() => setOpen(false)}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ivory"
              >
                EXPLORE
                <span aria-hidden>→</span>
              </motion.a>
            </nav>

            {/* Decorative accent */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-electric-lilac/15 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
