import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import services from "../data/services";
import { TarotScene } from "./visual/ServiceVisual";
import ProductImage from "./visual/ProductImage";

function ServiceCard({ service, index, isFeatured = false }) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  return (
    <motion.article
      initial={reduce ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col overflow-hidden"
    >
      {/* Image area — real photography w/ editorial scene fallback */}
      <div className="relative overflow-hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory">
          {!failed ? (
            <picture className="absolute inset-0 h-full w-full">
              <source srcSet={service.image} type="image/webp" />
              <source srcSet={service.poster} type="image/jpeg" />
              <img
                src={service.poster || service.image}
                alt={service.name}
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                onError={() => setFailed(true)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </picture>
          ) : (
            <TarotScene className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
          )}

          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/10 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory/95 text-ink shadow-soft transition-transform duration-300 group-hover:scale-110">
              →
            </span>
          </div>
        </div>

        {/* Floating badge */}
        <div className="absolute left-4 top-4 px-3 py-1.5 bg-ink">
          <span className="text-micro text-ivory">{service.format}</span>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-3xl text-ink">{service.name}</h3>
          <p className="shrink-0 font-display text-2xl text-ink">₹{service.price}</p>
        </div>

        <p className="mt-3 text-sm text-text-secondary">{service.duration}</p>

        <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-text-secondary">
          {service.description}
        </p>

        <a
          href="#"
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-electric-lilac"
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
  const [featuredFailed, setFeaturedFailed] = useState(false);
  const featured = services.find((s) => s.featured) || services[0];
  const others = services.filter((s) => s.id !== featured.id);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-coral py-32 lg:py-48"
      aria-label="Services and guidance"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-end pt-8 pr-8">
        <span className="text-section-num text-ivory/[0.03]">09</span>
      </div>

      {/* Tangerine/butter accent washes */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(60% 50% at 20% 0%, rgba(255,138,76,0.12) 0%, transparent 70%)",
      }} />
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(50% 40% at 80% 100%, rgba(255,230,109,0.1) 0%, transparent 70%)",
      }} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-20 lg:mb-32">
          <span className="text-micro text-ink/50 mb-6 block">09 — The Readings</span>
          <h2 className="font-display text-display-lg text-ink">
            ASK
            <br />
            <span className="italic text-tangerine">A BETTER</span>
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
              className="group relative flex h-full flex-col overflow-hidden bg-ivory shadow-lift"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory">
                {!featuredFailed ? (
                  <picture className="absolute inset-0 h-full w-full">
                    <source srcSet={featured.image} type="image/webp" />
                    <source srcSet={featured.poster} type="image/jpeg" />
                    <img
                      src={featured.poster || featured.image}
                      alt={featured.name}
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="600"
                      onError={() => setFeaturedFailed(true)}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </picture>
                ) : (
                  <TarotScene className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                )}
              </div>
              <div className="mt-6 flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-4xl text-ink">{featured.name}</h3>
                  <p className="shrink-0 font-display text-3xl text-ink">₹{featured.price}</p>
                </div>
                <p className="mt-3 text-sm text-text-secondary">{featured.duration}</p>
                <p className="mt-4 flex-1 text-pretty text-base leading-relaxed text-text-secondary">
                  {featured.description}
                </p>
                <a
                  href="#"
                  className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-electric-lilac"
                >
                  Book a Reading
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </motion.article>
          </motion.div>

          {/* Other services — smaller, compact */}
          {others.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
