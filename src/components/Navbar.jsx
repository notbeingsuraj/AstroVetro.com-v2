import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE } from "./constants";

const NAV_LINKS = [
  { label: "Shop", href: "#collection" },
  { label: "Readings", href: "#services" },
  { label: "Discover", href: "#science" },
  { label: "Journal", href: "#journal" },
];

const RIGHT_ACTIONS = [
  { label: "Search", href: "#" },
  { label: "Account", href: "#" },
  { label: "Cart", href: "#" },
];

// Section color mapping for dynamic navbar background
const SECTION_COLORS = {
  top: { bg: "rgba(255,253,247,0.95)", text: "#11131A" },
  hero: { bg: "rgba(255,253,247,0.95)", text: "#11131A" },
  brand: { bg: "rgba(167,223,255,0.95)", text: "#11131A" },
  intentions: { bg: "rgba(255,230,109,0.95)", text: "#11131A" },
  featured: { bg: "rgba(255,253,247,0.95)", text: "#11131A" },
  collection: { bg: "rgba(255,253,247,0.95)", text: "#11131A" },
  science: { bg: "rgba(17,19,26,0.95)", text: "#FFFDF7" },
  interlude: { bg: "rgba(189,245,208,0.95)", text: "#11131A" },
  guidance: { bg: "rgba(255,231,214,0.95)", text: "#11131A" },
  services: { bg: "rgba(255,143,112,0.95)", text: "#11131A" },
  experience: { bg: "rgba(217,194,255,0.95)", text: "#11131A" },
  trust: { bg: "rgba(255,253,247,0.95)", text: "#11131A" },
  testimonials: { bg: "rgba(255,231,214,0.95)", text: "#11131A" },
  journal: { bg: "rgba(255,253,247,0.95)", text: "#11131A" },
  final: { bg: "rgba(17,19,26,0.95)", text: "#FFFDF7" },
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const reduce = useReducedMotion();
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      
      // Detect which section is in view
      const sections = Object.keys(SECTION_COLORS);
      for (const id of sections.reverse()) {
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

  const sectionStyle = SECTION_COLORS[activeSection] || SECTION_COLORS.top;
  const isDark = activeSection === "science" || activeSection === "final";

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md"
            : "bg-transparent"
        }`}
        style={{
          backgroundColor: scrolled ? sectionStyle.bg : "transparent",
          borderBottom: scrolled ? `1px solid ${isDark ? "rgba(255,253,247,0.1)" : "rgba(17,19,26,0.08)"}` : "none",
        }}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 lg:px-16">
          {/* Brand — large wordmark */}
          <a
            href="#top"
            className="font-display text-2xl tracking-tight transition-colors duration-500"
            style={{ color: sectionStyle.text }}
            aria-label="AstroVetro home"
          >
            ASTROVETRO
          </a>

          {/* Desktop links — editorial style */}
          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-300 hover:opacity-70"
                style={{ color: sectionStyle.text }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden items-center gap-8 lg:flex">
            {RIGHT_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="text-sm font-medium transition-colors duration-300 hover:opacity-70"
                style={{ color: sectionStyle.text }}
              >
                {action.label}
              </a>
            ))}
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
                style={{ backgroundColor: open ? "#FFFDF7" : sectionStyle.text }}
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-[1.5px] w-7 transition-colors duration-500"
                style={{ backgroundColor: open ? "#FFFDF7" : sectionStyle.text }}
              />
              <motion.span
                animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-7 transition-colors duration-500"
                style={{ backgroundColor: open ? "#FFFDF7" : sectionStyle.text }}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-screen mobile navigation overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
          >
            {/* Close button */}
            <div className="absolute right-6 top-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-12 w-12 items-center justify-center text-white"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation links — large editorial typography */}
            <nav className="flex flex-1 flex-col items-start justify-center px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setOpen(false)}
                  className="group mb-6 flex items-baseline gap-4"
                >
                  <span className="text-micro text-white/40">0{i + 1}</span>
                  <span className="font-display text-6xl text-white transition-colors duration-300 group-hover:text-solar">
                    {link.label}
                  </span>
                </motion.a>
              ))}

              {/* Right actions in mobile */}
              <div className="mt-12 flex gap-8">
                {RIGHT_ACTIONS.map((action, i) => (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {action.label}
                  </motion.a>
                ))}
              </div>
            </nav>

            {/* Decorative gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-accent-blue/20 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
