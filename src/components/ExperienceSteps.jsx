import { FadeIn } from "./Motion";

const STEPS = [
  {
    number: "01",
    title: "Bring your question.",
    text: "A decision, a hesitation, something on your mind. Start with wherever you are.",
  },
  {
    number: "02",
    title: "Explore the cards.",
    text: "Together, we let the cards reflect the shape of what you are carrying.",
  },
  {
    number: "03",
    title: "Leave with perspective.",
    text: "Walk away with clarity you didn't have before — and room to decide for yourself.",
  },
];

function ExperienceSteps() {
  return (
    <section className="bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
          {STEPS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1}>
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
