import { FadeIn } from "./Motion";

const STEPS = [
  {
    number: "01",
    title: "Bring your question.",
    text: "A decision, a hesitation, something on your mind. Start wherever you are.",
  },
  {
    number: "02",
    title: "Explore the cards.",
    text: "Together we let the cards reflect the shape of what you are carrying.",
  },
  {
    number: "03",
    title: "Leave with perspective.",
    text: "Walk away with clarity you didn't have before — and room to decide for yourself.",
  },
];

function ExperienceSteps() {
  return (
    <section className="relative bg-ivory py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
            The reading experience
          </p>
          <h2 className="font-display text-balance text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            A reading, three simple steps.
          </h2>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {STEPS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.08}>
              <div className="lg:border-l lg:border-ink/10 lg:pl-8">
                <p className="font-display text-6xl text-champagne">
                  {step.number}
                </p>
                <h3 className="mt-5 font-display text-3xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-pretty leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSteps;
