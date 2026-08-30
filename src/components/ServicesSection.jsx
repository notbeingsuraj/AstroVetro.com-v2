import { FadeIn } from "./Motion";
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
  const Scene = SCENES[service.id] ?? TarotScene;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border hairline bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Scene className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
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
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-champagne"
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
      className="relative border-t hairline bg-stone-soft py-24 lg:py-32"
      aria-label="Services and guidance"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
            Services
          </p>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
            Guidance for where you are now.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            Sometimes you need something to carry. Sometimes you need a new
            perspective. Our readings are intimate, reflective and deeply
            personal — online, from wherever you are.
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
