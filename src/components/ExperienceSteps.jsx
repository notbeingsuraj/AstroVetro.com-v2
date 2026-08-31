import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Choose your intention.",
    text: "Bring a decision, a hesitation, something on your mind. Start wherever you are.",
  },
  {
    number: "02",
    title: "Explore the collection.",
    text: "Let the pieces reflect what you are carrying. Find what resonates.",
  },
  {
    number: "03",
    title: "Carry it with you.",
    text: "Walk away with clarity and a piece of the earth that holds it for you.",
  },
];

function ExperienceSteps() {
  const reduce = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-ivory py-32 lg:py-48"
      aria-label="How it works"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-end pr-8 pb-8">
        <span className="text-section-num text-ink/[0.03]">10</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-2xl"
        >
          <span className="text-micro text-text-muted mb-6 block">HOW IT WORKS</span>
          <h2 className="font-display text-display-md text-ink">
            THREE STEPS.
          </h2>
        </motion.div>

        {/* Thin connecting line */}
        <motion.div
          initial={reduce ? {} : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 h-px bg-electric-lilac/20"
        />

        <div className="grid gap-16 lg:grid-cols-3 lg:gap-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={reduce ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Giant number — electric-lilac at 20% opacity watermark */}
              <div className="mb-8">
                <span className="font-display text-8xl lg:text-9xl text-electric-lilac/20">
                  {step.number}
                </span>
              </div>

              {/* Decorative line */}
              <div className="mb-8 h-px w-full bg-electric-lilac/20" />

              <h3 className="font-display text-3xl text-ink mb-5">
                {step.title}
              </h3>
              <p className="max-w-sm text-pretty leading-relaxed text-text-secondary">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSteps;
