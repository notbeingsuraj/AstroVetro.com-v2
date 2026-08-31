import { motion, useReducedMotion } from "framer-motion";
import services from "../data/services";

const SERVICE_COLORS = {
  "tarot-reading": "#D9C2FF",
  "personal-guidance": "#FFE7D6",
  "intuitive-reading": "#A7DFFF",
  "relationship-reading": "#FF8F70",
};

function ServiceCard({ service, index }) {
  const reduce = useReducedMotion();
  const color = SERVICE_COLORS[service.id] || "#D9C2FF";

  return (
    <motion.article
      initial={reduce ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden"
    >
      {/* Image area */}
      <div className="relative overflow-hidden">
        <div
          className="relative aspect-[4/3]"
          style={{ backgroundColor: color + "30" }}
        >
          {/* Tarot-style illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 300 400" className="h-3/4 w-3/4 opacity-70">
              <defs>
                <linearGradient id={`svc-${service.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color} />
                  <stop offset="100%" stopColor="#FFFDF7" />
                </linearGradient>
              </defs>
              {/* Sun/symbol */}
              <circle cx="150" cy="160" r="60" fill={`url(#svc-${service.id})`} opacity="0.6" />
              <circle cx="150" cy="160" r="45" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
              {/* Rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1={150 + Math.cos((angle * Math.PI) / 180) * 70}
                  y1={160 + Math.sin((angle * Math.PI) / 180) * 70}
                  x2={150 + Math.cos((angle * Math.PI) / 180) * 85}
                  y2={160 + Math.sin((angle * Math.PI) / 180) * 85}
                  stroke={color}
                  strokeWidth="1.5"
                  opacity="0.4"
                />
              ))}
            </svg>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/10 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft transition-transform duration-300 group-hover:scale-110">
              →
            </span>
          </div>
        </div>

        {/* Floating badge */}
        <div 
          className="absolute left-4 top-4 px-3 py-1.5"
          style={{ backgroundColor: color }}
        >
          <span className="text-micro text-ink">{service.format}</span>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-3xl text-ink">{service.name}</h3>
          <p className="font-display text-2xl text-ink">₹{service.price}</p>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <span className="text-sm text-text-secondary">{service.duration}</span>
        </div>

        <p className="mt-4 text-pretty text-sm leading-relaxed text-text-secondary">
          {service.description}
        </p>

        <a
          href="#"
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-blue"
        >
          Book a Reading
          <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
        </a>
      </div>
    </motion.article>
  );
}

function ServicesSection() {
  const reduce = useReducedMotion();
  const featured = services.find((s) => s.featured) || services[0];
  const others = services.filter((s) => s.id !== featured.id);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-peach py-32 lg:py-48"
      aria-label="Services and guidance"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-end pt-8 pr-8">
        <span className="text-section-num text-ink/[0.04]">09</span>
      </div>

      {/* Warm gradient wash */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(60% 50% at 20% 0%, rgba(255,143,112,0.15) 0%, transparent 70%)",
      }} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-20 lg:mb-32">
          <span className="text-micro text-ink/60 mb-6 block">09 — The Readings</span>
          <h2 className="font-display text-display-lg text-ink">
            ASK A
            <br />
            <span className="italic text-accent-coral">BETTER</span>
            <br />
            QUESTION.
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/70">
            Sometimes you need something to carry. Sometimes you need a new
            perspective. Our readings are intimate, reflective and deeply
            personal — online, from wherever you are.
          </p>
        </div>

        {/* Asymmetric layout: large featured + smaller services */}
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Featured service — large */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <motion.article
              whileHover={reduce ? {} : { y: -8 }}
              className="group relative overflow-hidden bg-white shadow-lift"
            >
              <div 
                className="relative aspect-[4/3]"
                style={{ backgroundColor: SERVICE_COLORS[featured.id] + "40" }}
              >
                {/* Tarot illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 300 400" className="h-3/4 w-3/4 opacity-80">
                    <defs>
                      <linearGradient id="svc-featured" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={SERVICE_COLORS[featured.id]} />
                        <stop offset="100%" stopColor="#FFFDF7" />
                      </linearGradient>
                    </defs>
                    <circle cx="150" cy="150" r="50" fill="url(#svc-featured)" opacity="0.6" />
                    <circle cx="150" cy="150" r="38" fill="none" stroke={SERVICE_COLORS[featured.id]} strokeWidth="1" />
                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                      <line
                        key={angle}
                        x1={150 + Math.cos((angle * Math.PI) / 180) * 60}
                        y1={150 + Math.sin((angle * Math.PI) / 180) * 60}
                        x2={150 + Math.cos((angle * Math.PI) / 180) * 75}
                        y2={150 + Math.sin((angle * Math.PI) / 180) * 75}
                        stroke={SERVICE_COLORS[featured.id]}
                        strokeWidth="1.5"
                        opacity="0.4"
                      />
                    ))}
                  </svg>
                </div>
                
                <div className="absolute left-4 top-4 px-3 py-1.5" style={{ backgroundColor: SERVICE_COLORS[featured.id] }}>
                  <span className="text-micro text-ink">FEATURED</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-4xl text-ink">{featured.name}</h3>
                  <p className="font-display text-3xl text-ink">₹{featured.price}</p>
                </div>
                <p className="mt-3 text-sm text-text-secondary">{featured.duration} · {featured.format}</p>
                <p className="mt-5 text-pretty leading-relaxed text-text-secondary">
                  {featured.description}
                </p>
                <a
                  href="#"
                  className="group/link mt-8 inline-flex items-center gap-2 bg-ink px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-ink-deep"
                >
                  Book a Reading
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </motion.article>
          </motion.div>

          {/* Other services */}
          <div className="lg:col-span-2 grid gap-12 sm:grid-cols-2 lg:gap-16">
            {others.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
