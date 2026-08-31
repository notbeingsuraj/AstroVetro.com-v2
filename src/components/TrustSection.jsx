import { motion, useReducedMotion } from "framer-motion";

const TRUST = [
  {
    title: "Carefully selected",
    text: "Every piece is chosen by hand for quality, clarity and character.",
    color: "#A7DFFF",
  },
  {
    title: "Thoughtfully sourced",
    text: "We work with suppliers who respect the people and places behind each stone.",
    color: "#BDF5D0",
  },
  {
    title: "Securely packaged",
    text: "Crystals arrive protected, presented and ready to be carried.",
    color: "#FFE66D",
  },
  {
    title: "Transparent guidance",
    text: "No false claims. Honest, grounded, practical perspective.",
    color: "#D9C2FF",
  },
];

function TrustSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-ivory py-32 lg:py-48"
      aria-label="Why choose AstroVetro"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        <div className="mb-16">
          <span className="text-micro text-ink/50 mb-6 block">Our Promise</span>
          <h2 className="font-display text-display-md text-ink">
            THOUGHTFULLY CHOSEN.
            <br />
            <span className="italic text-accent-blue">INTENTIONALLY OFFERED.</span>
          </h2>
        </div>

        {/* Horizontal scrolling trust strip */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="relative border-t-2 pt-8"
              style={{ borderColor: item.color }}
            >
              <span className="text-micro text-ink/40 mb-6 block">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl text-ink mb-4">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
