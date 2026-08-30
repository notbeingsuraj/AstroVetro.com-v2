import { FadeIn } from "./Motion";

const ARTICLES = [
  {
    title: "How to choose your first crystal",
    tag: "Beginners",
    time: "6 min read",
    color: "#9ec7e3",
  },
  {
    title: "Understanding Amethyst",
    tag: "Stones",
    time: "4 min read",
    color: "#c9bde0",
  },
  {
    title: "How to care for your crystals",
    tag: "Care",
    time: "5 min read",
    color: "#a9c5ae",
  },
  {
    title: "The science behind crystal formations",
    tag: "Science",
    time: "8 min read",
    color: "#e6c875",
  },
  {
    title: "Tarot as a tool for reflection",
    tag: "Guidance",
    time: "7 min read",
    color: "#d99a82",
  },
];

function Journal() {
  return (
    <section
      id="journal"
      className="border-t hairline bg-white py-28 lg:py-40"
      aria-label="Journal"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <FadeIn className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
              Journal
            </p>
            <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
              Look closer.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              All articles
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </FadeIn>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {ARTICLES.map((article, i) => (
            <FadeIn key={article.title} delay={i * 0.05}>
              <a href="#" className="group block">
                <div
                  className="aspect-[3/4] overflow-hidden rounded-2xl border hairline transition-shadow duration-500 group-hover:shadow-lift"
                  style={{
                    background: `radial-gradient(120% 120% at 40% 25%, ${article.color}66 0%, rgba(250,249,245,0) 65%)`,
                    backgroundColor: "#faf9f5",
                  }}
                />
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-champagne">
                  {article.tag}
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug text-ink">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-ink-soft">{article.time}</p>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Journal;
