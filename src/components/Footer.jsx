const FOOTER_LINKS = {
  Shop: ["Crystals", "Jewellery", "By Intention", "Gift Cards"],
  Services: ["Tarot Readings", "Personal Guidance", "Book a Session", "FAQ"],
  Discover: ["About", "Journal", "Care Guide", "Contact"],
};

function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a
              href="#top"
              className="font-display text-2xl tracking-tight text-ink"
            >
              ASTROVETRO
            </a>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-ink-soft">
              Premium crystals, meaningful objects and intuitive guidance —
              inspired by the connection between what we carry, what we feel
              and the world around us.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="lg:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink">
              Stay close
            </h3>
            <p className="mt-4 text-sm text-ink-soft">
              Occasional letters on stones, science and self-discovery. No
              noise.
            </p>
            <form
              className="mt-4 flex"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-l-full border border-r-0 border-ink/15 bg-white px-5 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-ink/40"
              />
              <button
                type="submit"
                className="rounded-r-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink/8 pt-8 sm:flex-row">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} AstroVetro. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-ink-soft">
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
