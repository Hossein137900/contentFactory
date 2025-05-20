"use client";
import ContentCreationLab from "@/components/static/contentCreationLab";
import ContentCreationProcess from "@/components/static/contentCreationProcess";
import HeroSection from "@/components/static/hero-section";
import ServicesShowcase from "@/components/static/services";
import WhyChooseUs from "@/components/static/whyChooseUs";
import WorksShowcase from "@/components/static/worksShowcase";

const MainContainer = () => {
  return (
    <>
      <section>
        <HeroSection />
        <ServicesShowcase />
        <WhyChooseUs />
        <WorksShowcase />
        <ContentCreationProcess />
        <ContentCreationLab />
      </section>
    </>
  );
};
export default MainContainer;
