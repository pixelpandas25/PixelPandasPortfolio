import { Seo } from '@/components/Seo';
import { Hero } from './about/Hero';
import { BuiltForMotion } from './about/BuiltForMotion';
import { NotForEveryone } from './about/NotForEveryone';
import { PremiumStatement } from './about/PremiumStatement';
import { Shortcuts } from './about/Shortcuts';
import { WhyUsStats } from './about/WhyUsStats';
import { FounderPolaroid } from './about/FounderPolaroid';
import { MeetTeam } from './about/MeetTeam';
import { ExPandas } from './about/ExPandas';
import { ContactBanner } from '@/components/sections/ContactBanner';

export default function About() {
  return (
    <>
      <Seo
        title="About Us — PixelPandas"
        description="Meet the team behind PixelPandas and why brands trust us with more than just design."
        path="/about"
      />
      <Hero />
      <BuiltForMotion />
      <NotForEveryone />
      <PremiumStatement />
      <Shortcuts />
      <WhyUsStats />
      <FounderPolaroid />
      <MeetTeam />
      <ExPandas />
      <ContactBanner />
    </>
  );
}
