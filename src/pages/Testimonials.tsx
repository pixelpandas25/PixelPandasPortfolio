import { Seo } from '@/components/Seo';
import { Testimonials as TestimonialsSection } from './home/Testimonials';
import { ContactBanner } from '@/components/sections/ContactBanner';

export default function Testimonials() {
  return (
    <>
      <Seo
        title="Testimonials — PixelPandas"
        description="What our clients say about working with PixelPandas."
        path="/testimonials"
      />
      <div className="pt-32 sm:pt-[140px]" data-nav-tone="light">
        <TestimonialsSection />
      </div>
      <ContactBanner />
    </>
  );
}
