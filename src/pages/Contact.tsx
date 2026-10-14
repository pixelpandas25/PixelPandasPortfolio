import { Seo } from '@/components/Seo';
import { ContactBanner } from '@/components/sections/ContactBanner';
import { CalEmbed } from './contact/CalEmbed';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact — PixelPandas"
        description="Ready to start something? Reach out to PixelPandas — we'd love to hear about your project."
        path="/contact"
      />
      <ContactBanner />
      <CalEmbed />
    </>
  );
}
