import { motion, useReducedMotion } from "framer-motion";

const FOOTER_LINKS = {
  Shop: ["Crystals", "Jewellery", "By Intention", "Gift Cards"],
  Services: ["Tarot Readings", "Personal Guidance", "Book a Session", "FAQ"],
  Discover: ["About", "Journal", "Care Guide", "Contact"],
};

function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer id="footer" className="relative overflow-hidden bg-deep-plum">
      {/* Large top curve / decorative */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(to right, var(--color-electric-lilac) 1px, transparent 1px), linear-gradient(to bottom, var(--color-electric-lilac) 1px, transparent 1px)`,
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
          className="font-display text-[14vw] leading-none tracking-tight text-ivory/90 lg:text-[10rem]"
        >
          ASTROVETRO
        </motion.h2>

        {/* Sign-off */}
        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-lg text-ivory/60"
        >
          KEEP LOOKING.
        </motion.p>

        {/* Footer content */}
        <div className="mt-20 grid gap-12 border-t-2 border-electric-lilac/15 pt-16 lg:grid-cols-12">
          {/* Brand blurb */}
          <div className="lg:col-span-5">
            <p className="max-w-sm text-pretty text-lg leading-relaxed text-ivory/70">
              Premium crystals, meaningful objects and intuitive guidance —
              inspired by the connection between what we carry, what we feel and
              the world around us.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="lg:col-span-2">
              <h3 className="text-micro text-ivory/50 mb-6">
                {heading}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-display text-2xl text-ivory/70 transition-colors duration-300 hover:text-electric-lilac"
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
            <h3 className="text-micro text-ivory/50 mb-6">Stay close</h3>
            <p className="text-sm text-ivory/50 mb-6">
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
                className="min-w-0 flex-1 border border-ivory/15 bg-ivory/10 px-5 py-3 text-sm text-ivory outline-none placeholder:text-ivory/30 focus:border-electric-lilac"
              />
              <button
                type="submit"
                className="bg-electric-lilac px-6 py-3 text-sm font-semibold text-ink transition-colors hover:opacity-80"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <motion.div
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <p className="text-micro text-ivory/40">© 2026 AstroVetro</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
