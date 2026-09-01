import { Seo } from '@/components/Seo';
import { Hero } from './home/Hero';
import { LogoStrip } from './home/LogoStrip';
import { DesignServices } from './home/DesignServices';
import { Philosophy } from './home/Philosophy';
import { TypewriterQuote } from './home/TypewriterQuote';
import { PortfolioCarousel } from './home/PortfolioCarousel';
import { Testimonials } from './home/Testimonials';
import { TrustedBy } from './home/TrustedBy';
import { ContactBanner } from '@/components/sections/ContactBanner';

export default function Home() {
  return (
    <>
      <Seo
        title="PixelPandas — Escape the Ordinary"
        description="PixelPandas is a design studio that turns startups and established brands into unmistakably themselves — branding, UI/UX, and visual creative that escapes the ordinary."
        path="/"
      />
      <Hero />
      <LogoStrip />
      <DesignServices />
      <Philosophy />
      <TypewriterQuote />
      <PortfolioCarousel />
      <Testimonials />
      <TrustedBy />
      <ContactBanner />
    </>
  );
}
