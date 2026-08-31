import { useState, useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandStatement from "./components/BrandStatement";
import IntentionExplorer from "./components/IntentionExplorer";
import ProductFeature from "./components/ProductFeature";
import ProductGrid from "./components/ProductGrid";
import ScienceSection from "./components/ScienceSection";
import VisualInterlude from "./components/VisualInterlude";
import GuidanceTransition from "./components/GuidanceTransition";
import ServicesSection from "./components/ServicesSection";
import ExperienceSteps from "./components/ExperienceSteps";
import TrustSection from "./components/TrustSection";
import Testimonials from "./components/Testimonials";
import Journal from "./components/Journal";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

function App() {
  const [activeIntentionId, setActiveIntentionId] = useState(null);
  const collectionRef = useRef(null);

  const handleSelectIntention = useCallback((id) => {
    setActiveIntentionId((prev) => (prev === id ? null : id));
    // Scroll to the collection after state settles, on the next frame.
    requestAnimationFrame(() => {
      collectionRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-ink antialiased">
      <Navbar />
      <main>
        {/* 01 — The Arrival */}
        <Hero />

        {/* 02 — The Manifesto */}
        <BrandStatement />

        {/* 03 — What Are You Looking For? */}
        <IntentionExplorer
          activeIntentionId={activeIntentionId}
          onSelect={handleSelectIntention}
        />

        {/* 04 — The Objects */}
        <ProductFeature />

        {/* 05 — The Collection */}
        <div ref={collectionRef} id="collection">
          <ProductGrid activeIntentionId={activeIntentionId} />
        </div>

        {/* 06 — The Mineral Universe */}
        <ScienceSection />

        {/* 07 — Visual Interlude */}
        <VisualInterlude />

        {/* 08 — The Pivot */}
        <GuidanceTransition />

        {/* 09 — The Readings */}
        <ServicesSection />

        {/* 10 — The Reading Experience */}
        <ExperienceSteps />

        {/* 11 — Our Promise */}
        <TrustSection />

        {/* 12 — Stories */}
        <Testimonials />

        {/* 13 — The Journal */}
        <Journal />

        {/* 14 — Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
