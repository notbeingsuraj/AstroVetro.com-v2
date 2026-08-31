import { motion, useReducedMotion } from "framer-motion";

const TRUST = [
  {
    title: "Thoughtfully selected",
    text: "Every piece is chosen by hand for quality, clarity and character.",
  },
  {
    title: "Carefully packaged",
    text: "Crystals arrive protected, presented and ready to be carried.",
  },
  {
    title: "Secure checkout",
    text: "Encrypted payment processing keeps your details safe.",
  },
  {
    title: "Transparent information",
    text: "Honest product descriptions. No false claims. Grounded perspective.",
  },
];

function TrustSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="trust"
      className="relative overflow-hidden bg-ivory py-32 lg:py-48"
      aria-label="Why choose AstroVetro"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        <div className="mb-16">
          <span className="text-micro text-ink/50 mb-6 block">Our Promise</span>
          <h2 className="font-display text-display-md text-ink">
            THOUGHTFULLY CHOSEN.
            <br />
            <span className="italic text-electric-lilac">INTENTIONALLY OFFERED.</span>
          </h2>
        </div>

        {/* Trust points in a horizontal row */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="relative border-t-2 pt-8"
              style={{ borderColor: "rgba(23,19,29,0.1)" }}
            >
              <span className="text-micro text-text-muted mb-6 block">
                0{i + 1}
              </span>
              <h3 className="font-semibold text-sm text-ink mb-4">
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
