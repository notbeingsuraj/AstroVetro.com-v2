import { useState } from "react";
import { FadeIn, SectionLabel } from "./Motion";
import { TarotScene, GuidanceScene } from "./visual/ServiceVisual";
import services from "../data/services";

// Map each service to a photographic-style editorial scene.
// Replaced 1:1 by real photography (public/images/services/{slug}.webp).
const SCENES = {
  "tarot-reading": TarotScene,
  "personal-guidance": GuidanceScene,
  "intuitive-reading": TarotScene,
  "relationship-reading": TarotScene,
};

function ServiceCard({ service }) {
  const [failed, setFailed] = useState(false);
  const Scene = SCENES[service.id] ?? TarotScene;
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-ink/8 bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        {!failed ? (
          <picture>
            <source srcSet={`${service.image}`} type="image/webp" />
            <source srcSet={service.poster} type="image/jpeg" />
            <img
              src={service.poster}
              alt={service.name}
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              onError={() => setFailed(true)}
            />
          </picture>
        ) : (
          <Scene className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
        )}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl text-ink">{service.name}</h3>
          <p className="shrink-0 font-medium text-ink">₹{service.price}</p>
        </div>

        <dl className="mt-3 flex gap-5 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-soft">
              Duration
            </dt>
            <dd className="mt-1 font-medium text-ink">{service.duration}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-soft">
              Format
            </dt>
            <dd className="mt-1 font-medium text-ink">{service.format}</dd>
          </div>
        </dl>

        <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-ink-soft">
          {service.description}
        </p>

        <a
          href="#"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-ink-soft"
        >
          Book a Reading
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      className="relative border-t border-ink/8 bg-pearl py-24 lg:py-32"
      aria-label="Services and guidance"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="max-w-2xl">
          <SectionLabel index={5}>Readings</SectionLabel>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
            Guidance for where you are now.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            Sometimes you need something to carry. Sometimes you need a new
            perspective. Our readings are intimate, reflective and deeply
            personal — online, from wherever you are.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.06}>
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
