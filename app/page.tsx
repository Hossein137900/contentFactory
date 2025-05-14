import WhyChoose from "@/components/global/boxes";
import ImagePan from "@/components/global/image-pan";
import BlogSlider from "@/components/global/page";
import ScrollingText from "@/components/global/ParallaxText";
import AboutSection from "@/components/global/two-box";
import AboutUs from "@/components/static/aboutUs";
import ContactForm from "@/components/static/contactForm";
import ContentCreationLab from "@/components/static/contentCreationLab";
import ContentCreationProcess from "@/components/static/contentCreationProcess";
import GalleryGrid from "@/components/static/galleryGrid";
import HeroSection from "@/components/static/hero-section";
import ProjectSlider from "@/components/static/projectSlider";
import ServicesShowcase from "@/components/static/services";
import WhyChooseUs from "@/components/static/whyChooseUs";
import WorksShowcase from "@/components/static/worksShowcase";

export default function Home() {
  return (
    <>
      <div>
        <HeroSection />
        <ServicesShowcase />
        <WhyChooseUs />
        <GalleryGrid />
        <ContactForm />
        <ProjectSlider />
        <AboutUs />
        <WorksShowcase />
        <ContentCreationProcess />
        <ContentCreationLab />

        <div className="relative">
          {" "}
          <AboutSection />
        </div>

        <BlogSlider title="مطالب پیشنهادی" />

        <ScrollingText />
        <ImagePan />
        <WhyChoose />
      </div>
    </>
  );
}
