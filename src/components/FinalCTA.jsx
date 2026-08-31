import { FadeIn } from "./Motion";

function FinalCTA() {
  return (
    <section className="relative border-t border-ink/8 bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <FadeIn>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-7xl">
            Start with what
            <br />
            <span className="italic">feels like you.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
            Explore something meaningful to carry with you, or make space for
            a new perspective.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.12}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <a
            href="#collection"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-9 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-ink/85 sm:w-auto"
          >
            Explore the Collection
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#services"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-9 py-4 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink/40 sm:w-auto"
          >
            Book a Reading
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

export default FinalCTA;
