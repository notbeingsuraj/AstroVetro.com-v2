import { FadeIn, SectionLabel } from "./Motion";

const TRUST = [
  {
    title: "Carefully selected",
    text: "Every piece is chosen by hand for quality, clarity and character.",
    color: "#a9d7f2",
  },
  {
    title: "Thoughtfully sourced",
    text: "We work with suppliers who respect the people and places behind each stone.",
    color: "#b8d2b6",
  },
  {
    title: "Securely packaged",
    text: "Crystals arrive protected, presented and ready to be carried.",
    color: "#e7c875",
  },
  {
    title: "Transparent guidance",
    text: "No false claims. Honest, grounded, practical perspective.",
    color: "#cec3e7",
  },
];

function TrustSection() {
  return (
    <section
      className="border-t border-ink/8 bg-white py-24 lg:py-32"
      aria-label="Why choose AstroVetro"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="max-w-2xl">
          <SectionLabel index={6}>Our promise</SectionLabel>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
            Thoughtfully chosen.
            <br />
            <span className="italic">Intentionally offered.</span>
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-ink/8 bg-ink/8 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06} className="bg-white">
              <div className="flex h-full flex-col justify-between p-8">
                <div>
                  <span
                    className="mb-8 block h-px w-10"
                    style={{ backgroundColor: item.color }}
                  />
                  <h3 className="font-display text-2xl text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {item.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
