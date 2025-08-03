import HeroSection from "./_components/landing/HeroSection";
import FeaturesSection from "./_components/landing/FeaturesSection";
import StatsSection from "./_components/landing/StatsSection";
import AboutPreviewSection from "./_components/landing/AboutPreviewSection";
import TestimonialsSection from "./_components/landing/TestimonialsSection";
import CTASection from "./_components/landing/CTASection";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <AboutPreviewSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
