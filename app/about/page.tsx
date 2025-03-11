"use client";
import InteriorDesign from "@/components/global/design";
import AboutHero from "@/components/global/hero";
import AboutWelcome from "@/components/global/welcome-about";
import WhyChooseUs from "@/components/global/why-us";
const About = () => {
  return (
    <section className="flex flex-col">
      <AboutHero
        backgroundImage="/assets/images/cam2.jpg"
        title="کارخانه محتوا"
        subtitle="خلق محتوای حرفه‌ای برای کسب و کار شما"
        primaryButtonText="شروع همکاری"
        secondaryButtonText="درباره ما"
        primaryButtonLink="/contact"
        secondaryButtonLink="/about"
        overlayOpacity={0.5}
      />
      <AboutWelcome />
      <WhyChooseUs />
      <InteriorDesign />
    </section>
  );
};

export default About;
