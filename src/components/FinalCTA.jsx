import { FadeIn } from "./Motion";

function FinalCTA() {
  return (
    <section className="bg-ivory py-32 lg:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <FadeIn>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-7xl">
            Start with what
            <br />
            <span className="italic">resonates.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
            Explore something meaningful to carry with you, or make space for
            a new perspective.
          </p>
        </FadeIn>

        <FadeIn delay={0.12} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#collection"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-9 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black sm:w-auto"
          >
            Explore the Collection
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#guidance"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-9 py-4 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink/40 sm:w-auto"
          >
            Book a Reading
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

export default FinalCTA;
