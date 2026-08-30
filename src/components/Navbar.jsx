import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "./constants";

const NAV_LINKS = [
  { label: "Shop", href: "#collection" },
  { label: "Services", href: "#services" },
  { label: "By Intention", href: "#intentions" },
  { label: "Discover", href: "#science" },
  { label: "Journal", href: "#journal" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/80 backdrop-blur-md shadow-soft border-b hairline"
          : "bg-transparent"
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
        <div className="hidden items-center gap-8 lg:flex">
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
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="#"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            aria-label="Search"
          >
            Search
          </a>
          <a
            href="#"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            aria-label="Account"
          >
            Account
          </a>
          <a
            href="#"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            aria-label="Cart"
          >
            Cart
          </a>
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

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={
          open
            ? { opacity: 1, height: "auto" }
            : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.4, ease: EASE }}
        className="overflow-hidden bg-ivory lg:hidden"
      >
        <div className="flex flex-col gap-1 px-6 pb-8 pt-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b hairline py-4 font-display text-2xl text-ink"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-6 flex gap-6 text-sm text-ink-soft">
            <a href="#">Search</a>
            <a href="#">Account</a>
            <a href="#">Cart</a>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default Navbar;
