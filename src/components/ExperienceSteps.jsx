import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Bring your question.",
    text: "A decision, a hesitation, something on your mind. Start wherever you are.",
    color: "#B48CE8",
  },
  {
    number: "02",
    title: "Explore the cards.",
    text: "Together we let the cards reflect the shape of what you are carrying.",
    color: "#4A9ADB",
  },
  {
    number: "03",
    title: "Leave with perspective.",
    text: "Walk away with clarity you didn't have before — and room to decide for yourself.",
    color: "#E5A72E",
  },
];

function ExperienceSteps() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ivory py-32 lg:py-48">
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-end pr-8 pb-8">
        <span className="text-section-num text-ink/[0.03]">09</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-2xl"
        >
          <span className="text-micro text-ink/50 mb-6 block">The Reading Experience</span>
          <h2 className="font-display text-display-md text-ink">
            A READING,
            <br />
            <span className="italic text-accent-blue">THREE STEPS.</span>
          </h2>
        </motion.div>

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
              {/* Giant number with color */}
              <div className="mb-8">
                <span
                  className="font-display text-8xl lg:text-9xl"
                  style={{ color: step.color }}
                >
                  {step.number}
                </span>
              </div>
              
              {/* Decorative line */}
              <div className="mb-8 h-px w-full" style={{ backgroundColor: step.color }} />

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
