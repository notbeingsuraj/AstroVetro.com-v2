import { useEffect, useState } from "react";
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

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-ink/8 bg-ivory/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Brand */}
        <a
          href="#top"
          className="font-display text-2xl tracking-tight text-ink"
          aria-label="AstroVetro home"
        >
          ASTROVETRO
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden items-center gap-6 lg:flex">
          {RIGHT_ACTIONS.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {action.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-ink"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-6 bg-ink"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-ink"
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu — full-screen editorial overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-ivory lg:hidden"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-8 pb-16">
              <div className="space-y-2">
                {[...NAV_LINKS, ...RIGHT_ACTIONS].map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.06 * i, ease: EASE }}
                    className="block border-b border-ink/8 py-4 font-display text-4xl text-ink"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <motion.p
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12 text-sm text-ink-soft"
              >
                Shop △ Readings — one brand.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
