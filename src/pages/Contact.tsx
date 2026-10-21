import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { ContactBanner } from '@/components/sections/ContactBanner';
import { CalEmbed } from './contact/CalEmbed';

export default function Contact() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#cal-embed') {
      const el = document.getElementById('cal-embed');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <>
      <Seo
        title="Contact — PixelPandas"
        description="Ready to start something? Reach out to PixelPandas — we'd love to hear about your project."
        path="/contact"
      />
      <div className="pt-10">
        <ContactBanner />
      </div>
      <CalEmbed />
    </>
  );
}
