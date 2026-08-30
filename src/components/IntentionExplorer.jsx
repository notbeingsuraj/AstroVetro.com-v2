import { motion } from "framer-motion";
import { FadeIn } from "./Motion";

const INTENTIONS = [
  {
    title: "Protection",
    color: "#99aab8",
    soft: "#9ec7e3",
    description: "For anchoring, grounding and a sense of safety.",
  },
  {
    title: "Love",
    color: "#d99a82",
    soft: "#d99a82",
    description: "For tenderness, openness and connection.",
  },
  {
    title: "Calm",
    color: "#a9c5ae",
    soft: "#a9c5ae",
    description: "For steadiness when the mind feels loud.",
  },
  {
    title: "Focus",
    color: "#c6a96b",
    soft: "#e6c875",
    description: "For clarity and quiet, deliberate attention.",
  },
  {
    title: "Abundance",
    color: "#9ec7e3",
    soft: "#c6a96b",
    description: "For openness to growth and generosity.",
  },
  {
    title: "Manifestation",
    color: "#c9bde0",
    soft: "#c9bde0",
    description: "For bringing intention into form.",
  },
  {
    title: "Confidence",
    color: "#d99a82",
    soft: "#d99a82",
    description: "For stepping forward with clarity.",
  },
  {
    title: "Growth",
    color: "#a9c5ae",
    soft: "#a9c5ae",
    description: "For evolution, learning and expansion.",
  },
];

function IntentionCard({ intention }) {
  return (
    <motion.a
      href="#collection"
      className="group relative block overflow-hidden rounded-2xl border hairline bg-stone-soft p-6 transition-shadow duration-500 hover:shadow-lift"
    >
      {/* mineral texture */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 30% 10%, ${intention.soft} 0%, rgba(255,255,255,0) 60%)`,
        }}
      />
      <div className="relative">
        <span
          className="mb-8 block h-14 w-14 rounded-full transition-transform duration-500 group-hover:scale-110"
          style={{
            background: `linear-gradient(140deg, ${intention.color}88, ${intention.soft}33)`,
            boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.6)`,
          }}
        />
        <h3 className="font-display text-2xl text-ink">{intention.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {intention.description}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-ink/60 transition-colors group-hover:text-ink">
          Explore
          <span
            className="transition-transform duration-500 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </motion.a>
  );
}

function IntentionExplorer() {
  return (
    <section id="intentions" className="bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
            By intention
          </p>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
            What are you seeking?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Protection. Calm. Love. Focus. Growth. Begin with what you are
            looking for, and find the piece that feels like it was always
            waiting for you.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INTENTIONS.map((intention, i) => (
            <FadeIn key={intention.title} delay={i * 0.05}>
              <IntentionCard intention={intention} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IntentionExplorer;
