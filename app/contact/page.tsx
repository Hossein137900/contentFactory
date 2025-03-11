import ContactForm from "@/components/global/ContactForm";
import ContactInfo from "@/components/global/ContactInfo";
import AboutHero from "@/components/global/hero";
import React from "react";

const ContactPage = () => {
  return (
    <section className="flex flex-col">
      <AboutHero
        backgroundImage="/assets/images/cam1.jpg"
        title="تماس با ما"
        subtitle="خلق محتوای حرفه‌ای برای کسب و کار شما"
        primaryButtonText="شروع همکاری"
        secondaryButtonText="درباره ما"
        primaryButtonLink="/contact"
        secondaryButtonLink="/about"
        overlayOpacity={0.5}
      />
      <ContactInfo />
      <ContactForm />
    </section>
  );
};

export default ContactPage;
