import { Fade } from "./Motion";
import MineralScene from "./visual/MineralScene";

// VisualInterlude — a full-bleed positive breathing moment with very little
// copy. Emotional transition using generous imagery and whitespace.
function VisualInterlude({ mineralId = "labradorite", copy = "Look closer." }) {
  return (
    <section
      className="relative overflow-hidden border-t border-ink/8 bg-ivory"
      aria-label="Visual interlude"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Full-bleed macro mineral image */}
          <Fade className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-ink/8 bg-white shadow-lift">
              <MineralScene
                id={mineralId}
                wide
                className="absolute inset-0 h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
            </div>
          </Fade>

          {/* Minimal copy */}
          <Fade delay={0.15} className="lg:col-span-5">
            <p className="font-display text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
              {copy}
            </p>
            <p className="mt-6 max-w-xs text-pretty text-lg leading-relaxed text-ink-soft">
              The details are where the wonder is. The less we rush, the more
              a piece of the earth has to say.
            </p>
          </Fade>
        </div>
      </div>
    </section>
  );
}

export default VisualInterlude;
