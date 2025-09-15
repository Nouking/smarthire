import { CtaSection } from '@/components/landing/cta-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HeroSection } from '@/components/landing/hero-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { Footer } from '@/components/layout/footer';
import { MainNavigation } from '@/components/layout/main-navigation';

export default function Home() {
  return (
    <>
      <MainNavigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
