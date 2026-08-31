import { FadeIn } from "./Motion";

// BrandStatement — a full-bleed editorial statement with generous whitespace.
// HUGE serif type, almost no supporting copy. A luxury-breather after the hero.
function BrandStatement() {
  return (
    <section
      className="relative bg-ivory py-28 lg:py-40"
      aria-label="Brand statement"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <FadeIn>
          <h2 className="font-display text-balance text-[10.5vw] leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Made by the earth.
            <br />
            <span className="italic text-ink-soft">Chosen by you.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12 max-w-md">
          <p className="text-pretty text-lg leading-relaxed text-ink-soft">
            Every piece at AstroVetro is a small meeting between the natural
            world and your own — a meaningful object that belongs to your
            rituals, your spaces and your present moment.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export default BrandStatement;
