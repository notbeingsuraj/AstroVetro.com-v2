import { FadeIn } from "./Motion";

function Statement() {
  return (
    <section
      className="border-y hairline bg-white py-28 lg:py-40"
      aria-label="Philosophy"
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <FadeIn>
          <p className="mx-auto mb-6 h-px w-16 bg-champagne" aria-hidden="true" />
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Everything begins
            <br />
            <span className="italic text-ink-soft">with an intention.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft">
            Protection. Calm. Love. Focus. Growth. Begin with what you are
            looking for — and let the rest follow.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export default Statement;
