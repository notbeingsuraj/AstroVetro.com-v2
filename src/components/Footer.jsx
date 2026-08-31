import { motion, useReducedMotion } from "framer-motion";

const FOOTER_LINKS = {
  Shop: ["Crystals", "Jewellery", "By Intention", "Gift Cards"],
  Services: ["Tarot Readings", "Personal Guidance", "Book a Session", "FAQ"],
  Discover: ["About", "Journal", "Care Guide", "Contact"],
};

function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="relative overflow-hidden bg-lavender">
      {/* Large top curve / decorative */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(to right, var(--color-ink) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
        }} />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 pb-16 pt-32 lg:px-16 lg:pt-48">
        {/* Oversized wordmark */}
        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[14vw] leading-none tracking-tight text-ink lg:text-[10rem]"
        >
          ASTROVETRO
        </motion.h2>

        {/* Footer content */}
        <div className="mt-20 grid gap-12 border-t-2 border-ink/10 pt-16 lg:grid-cols-12">
          {/* Brand blurb */}
          <div className="lg:col-span-5">
            <p className="max-w-sm text-pretty text-lg leading-relaxed text-ink/80">
              Premium crystals, meaningful objects and intuitive guidance —
              inspired by the connection between what we carry, what we feel and
              the world around us.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="lg:col-span-2">
              <h3 className="text-micro text-ink/60 mb-6">
                {heading}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-display text-2xl text-ink/80 transition-colors duration-300 hover:text-accent-blue"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-micro text-ink/60 mb-6">Stay close</h3>
            <p className="text-sm text-ink/70 mb-6">
              Occasional letters on stones, science and self-discovery.
            </p>
            <form
              className="flex"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="min-w-0 flex-1 border border-ink/20 bg-white/80 px-5 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-accent-blue"
              />
              <button
                type="submit"
                className="bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-deep"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Giant final CTA */}
        <motion.div
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <a
            href="#top"
            className="group inline-block"
          >
            <span className="font-display text-6xl text-ink transition-colors duration-300 group-hover:text-accent-blue lg:text-8xl">
              KEEP LOOKING.
            </span>
            <span className="mt-4 block text-micro text-ink/50 group-hover:text-ink">
              Back to top ↑
            </span>
          </a>
        </motion.div>

        {/* Legal */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 sm:flex-row">
          <p className="text-xs text-ink/60">
            © {new Date().getFullYear()} AstroVetro. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-ink/60">
            <a href="#" className="transition-colors hover:text-ink">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Shipping
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
