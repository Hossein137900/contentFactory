import WhyChoose from "@/components/global/boxes";
import ImagePan from "@/components/global/image-pan";
import BlogSlider from "@/components/global/page";
import ScrollingText from "@/components/global/ParallaxText";
import AboutSection from "@/components/global/two-box";
import HeroSection from "@/components/static/hero-section";

export default function Home() {
  return (
    <>
      <div>
        <HeroSection />
        <AboutSection />
      <BlogSlider title="مطالب پیشنهادی" />


        <ScrollingText />
        <ImagePan />
        <WhyChoose />
      </div>
    </>
  );
}
