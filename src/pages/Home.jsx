import Hero from "../components/Hero";
import Predictor from "../components/Predictor";
import TrustedStrip from "../components/TrustedStrip";

export default function Home() {
  return (
    <>
      <Hero />

      <div id="predictor" className="max-w-7xl mx-auto px-6">
        <Predictor />
      </div>

      <TrustedStrip />
    </>
  );
}