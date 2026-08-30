import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import IntentionExplorer from "./components/IntentionExplorer";
import ProductFeature from "./components/ProductFeature";
import ProductGrid from "./components/ProductGrid";
import CraftStory from "./components/CraftStory";
import ScienceSection from "./components/ScienceSection";
import GuidanceTransition from "./components/GuidanceTransition";
import GuidanceSection from "./components/GuidanceSection";
import ExperienceSteps from "./components/ExperienceSteps";
import TrustSection from "./components/TrustSection";
import Testimonials from "./components/Testimonials";
import Journal from "./components/Journal";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-ivory text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <IntentionExplorer />
        <ProductFeature />
        <ProductGrid />
        <CraftStory />
        <ScienceSection />
        <GuidanceTransition />
        <GuidanceSection />
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
