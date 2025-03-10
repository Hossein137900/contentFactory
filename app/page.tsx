import ImagePan from "@/components/global/image-pan";
import ScrollingText from "@/components/global/ParallaxText";
import HeroSection from "@/components/static/hero-section";

export default function Home() {
  return (
    <>
      <div className="bg-white">
        <HeroSection />
        <ScrollingText />
        <ImagePan />
      </div>
    </>
  );
}
