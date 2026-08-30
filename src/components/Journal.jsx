import { FadeIn } from "./Motion";
import journal from "../data/journal";
import MineralScene from "./visual/MineralScene";

const SCENE_ID = {
  "first-crystal": "clear-quartz",
  "understanding-amethyst": "amethyst",
  "caring-for-crystals": "selenite",
  "science-crystal-formations": "labradorite",
  "tarot-for-reflection": "rose-quartz",
};

function Journal() {
  return (
    <section
      id="journal"
      className="border-t hairline bg-white py-24 lg:py-32"
      aria-label="Journal"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <FadeIn className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
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
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </FadeIn>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {journal.map((article, i) => (
            <FadeIn key={article.id} delay={i * 0.05}>
              <a href={`/journal/${article.id}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border hairline bg-white transition-shadow duration-500 group-hover:shadow-lift">
                  <MineralScene
                    id={SCENE_ID[article.id] ?? "selenite"}
                    className="h-full w-full opacity-90"
                  />
                </div>
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
