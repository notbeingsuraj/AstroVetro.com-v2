import { useState, useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IntentionExplorer from "./components/IntentionExplorer";
import ProductFeature from "./components/ProductFeature";
import ProductGrid from "./components/ProductGrid";
import ScienceSection from "./components/ScienceSection";
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
        <Hero />
        <IntentionExplorer
          activeIntentionId={activeIntentionId}
          onSelect={handleSelectIntention}
        />
        <ProductFeature />
        <div ref={collectionRef}>
          <ProductGrid activeIntentionId={activeIntentionId} />
        </div>
        <ScienceSection />
        <GuidanceTransition />
        <ServicesSection />
        <ExperienceSteps />
        <TrustSection />
        <Testimonials />
        <Journal />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
