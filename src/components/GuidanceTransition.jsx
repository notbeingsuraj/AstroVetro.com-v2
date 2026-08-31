import { FadeIn } from "./Motion";

function GuidanceTransition() {
  return (
    <section className="relative border-t border-ink/8 bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <FadeIn>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Sometimes you need something
            <br />
            <span className="italic text-coral">to carry.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-12">
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Sometimes you need something
            <br />
            <span className="italic text-celestial">to understand.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2} className="mt-10">
          <p className="mx-auto max-w-md text-lg leading-relaxed text-ink-soft">
            Both are a kind of guidance. Both are part of the same journey.
            {` `}
            <a
              href="#services"
              className="font-semibold text-ink underline decoration-solar decoration-1 underline-offset-8 hover:text-ink-soft"
            >
              Explore our readings ↓
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export default GuidanceTransition;
