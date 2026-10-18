import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { ClosingCta } from './work/ClosingCta';
import { ContactBanner } from '@/components/sections/ContactBanner';
import { useInView } from '@/hooks/useInView';
import arrowUpRight from '@/assets/icons/tag-arrow-up-right.svg';

import brandImg from '@/assets/images/services/01.avif';
import uiuxImg from '@/assets/images/services/02.avif';
import visualImg from '@/assets/images/services/03.avif';
import webImg from '@/assets/images/services/04.avif'

const EASE = [0.16, 1, 0.3, 1] as const;

interface Service {
  title: string;
  tags: string[];
  description: string;
  image: string;
  imageLeft: boolean;
}

const services: Service[] = [
  {
    title: 'Brand Design',
    tags: ['Logo Design', 'Brand Strategy', 'Visual Language', 'Brand Book & Guideline'],
    description:
      'We build distinctive brand identities that make your business instantly recognisable. From strategy and visual language to logos and brand guidelines, we create a system that stays consistent across every touchpoint.',
    image: brandImg,
    imageLeft: true,
  },
  {
    title: 'UI/UX Design',
    tags: ['Web & App Design', 'Design System', 'Consumer UX', 'Enterprise UX', 'UX Audit'],
    description:
      'We turn complex ideas into simple, intuitive digital experiences. From product strategy and user flows to polished interfaces and scalable design systems, we design products that are easy to use and built to grow.',
    image: uiuxImg,
    imageLeft: false,
  },
  {
    title: 'Visual Creatives',
    tags: ['Packaging', 'Social Media', 'Print Design', 'Campaign Design', 'Marketing Creatives'],
    description:
      'We create visuals that make people stop, notice, and remember. From social campaigns and marketing creatives to packaging and print, we bring your brand to life across every visual touchpoint.',
    image: visualImg,
    imageLeft: true,
  },
  {
    title: 'Website Design & Development',
    tags: ['Website Design', 'Web Development'],
    description:
      'We design and build websites that look great and work hard. From high-converting landing pages to complete brand websites, we combine strategy, design, and development to create digital experiences that drive results.',
    image: webImg,
    imageLeft: false,
  },
];

const approachCards = [
  {
    number: '01',
    title: 'Start with the problem',
    description:
      "We don't jump straight into Figma. We understand your business, users, goals, and constraints before deciding what to design.",
  },
  {
    number: '02',
    title: 'Think beyond the screen',
    description:
      "Good design isn't just about making things look good. We think through the flows, edge cases, content, interactions, and details that make the experience actually work.",
  },
  {
    number: '03',
    title: 'Design to build',
    description:
      'Every pixel has a purpose. We design with real code constraints in mind, creating handoffs that developers can implement without losing the design intent.',
  },
  {
    number: '04',
    title: 'Leave a system behind',
    description:
      "We don't just deliver screens. We build reusable components, design systems and guidelines that help your team move faster long after we're done.",
  },
];

// ---------------------------------------------------------------------------
// Service row — each element animates in sequence off a single InView trigger
// ---------------------------------------------------------------------------
function ServiceRow({ service }: { service: Service }) {
  const [rowRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  const img = (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.95, ease: EASE }}
      className="aspect-video w-full overflow-hidden rounded-card lg:aspect-auto lg:flex-1"
    >
      <img
        src={service.image}
        alt={service.title}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );

  const text = (
    <div className="flex flex-col gap-[41px] lg:w-[393px] lg:shrink-0">
      {/* Title + tags + description grouped with 13px gap to match Figma */}
      <div className="flex flex-col gap-[13px]">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
          className="text-[48px] font-medium leading-none text-[#111111]"
        >
          {service.title}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.22 }}
          className="flex flex-wrap gap-[13px]"
        >
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill border border-[#d9d9d9] px-[10px] py-2 text-[14px] font-medium text-[#1c1c1c]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
          className="text-[20px] font-normal leading-[1.5] text-[#3a3a3a]"
        >
          {service.description}
        </motion.p>
      </div>

      {/* Buttons — 41px gap from text group via parent flex gap */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE, delay: 0.42 }}
        className="flex flex-wrap items-center gap-[18px]"
      >
        <Link
          to="/contact"
          className="inline-flex items-center rounded-[150px] bg-black px-[18px] py-[12px] text-[16px] font-semibold text-white"
        >
          Contact Us
        </Link>
        <Link
          to="/work"
          className="inline-flex items-center gap-1 rounded-[150px] border-[1.5px] border-[#e5e5e5] bg-[#f5f5f5] px-[18px] py-[12px] text-[16px] font-semibold text-[#121212]"
        >
          Explore Portfolio
          <img src={arrowUpRight} alt="" aria-hidden className="size-[21px]" />
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="flex flex-col gap-8 lg:h-[451px] lg:flex-row lg:items-stretch lg:gap-[60px]"
    >
      {service.imageLeft ? (
        <>
          {img}
          {text}
        </>
      ) : (
        <>
          {text}
          {img}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Approach card — single card with its own InView + stagger delay via prop
// ---------------------------------------------------------------------------
function ApproachCard({
  card,
  delay,
}: {
  card: (typeof approachCards)[number];
  delay: number;
}) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className="relative h-[360px] min-w-0 flex-1 rounded-[16px] overflow-clip"
      style={{ background: 'rgba(244,244,244,0.15)' }}
    >
      {/* Large number watermark — 90px bold, 60% opacity, bleeds 38px above the card top-right */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute right-0 font-display text-[90px] font-bold leading-none text-black opacity-60"
        style={{ top: '-38px', letterSpacing: '0.05em' }}
      >
        {card.number}
      </span>

      {/* Content — title pinned to top, description pinned to bottom */}
      <div className="flex h-full flex-col justify-between p-8">
        <h4 className="font-display text-[24px] font-medium leading-[105%] text-white">
          {card.title}
        </h4>
        <p className="text-[16px] font-normal leading-[150%] text-[#d9d9d9]">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Services() {
  const [approachRef, approachInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <>
      <Seo
        title="Services — PixelPandas"
        description="Whether you're building a brand, launching a product, or fixing an experience — we're ready to jump in."
        path="/services"
      />

      {/* HERO ---------------------------------------------------------------- */}
      <section data-nav-tone="light" className="bg-paper px-6 pb-[80px] pt-[122px] sm:px-gutter-sm">
        <div className="mx-auto flex max-w-site flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="text-[clamp(3rem,5vw,4.5rem)] font-medium leading-[1.2] text-[#111111] lg:w-[476px] lg:shrink-0"
          >
            OUR
            <br />
            SERVICES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="max-w-[460px] text-[20px] font-normal leading-[1.5] text-[#3a3a3a] lg:mt-[90px] lg:flex-1"
          >
            Whether you&rsquo;re building a brand, launching a product, or fixing an experience
            — we&rsquo;re ready to jump in.
          </motion.p>
        </div>
      </section>

      {/* SERVICES GRID ------------------------------------------------------- */}
      <section data-nav-tone="light" className="bg-paper px-6 pb-[120px] sm:px-gutter-sm">
        <div className="mx-auto flex max-w-site flex-col gap-[100px]">
          {services.map((service) => (
            <ServiceRow key={service.title} service={service} />
          ))}
        </div>
      </section>

      {/* OUR APPROACH -------------------------------------------------------- */}
      {/* Section: 1440×847px in Figma — pt=62, pb=40, px=80 */}
      <section data-nav-tone="dark" className="bg-black px-6 pb-[40px] pt-[62px] sm:px-[80px]">
        <div className="mx-auto max-w-site">
          <div ref={approachRef}>
            {/* Eyebrow: textCase=UPPER in Figma */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={approachInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display text-[20px] font-semibold uppercase leading-[105%] text-[#d9d9d9]"
            >
              Our Approach
            </motion.p>

            {/* Description: mixed white/#7A7A7A segments matching Figma exactly */}
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={approachInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
              className="mt-8 font-display text-[32px] font-medium leading-[145%]"
            >
              <span className="text-[#7A7A7A]">Most agencies deliver a design</span>
              <span className="text-white">.</span>
              <br />
              <span className="text-white">We care about what happens after it.</span>
              <br />
              <br />
              <span className="text-[#7A7A7A]">We think </span>
              <span className="text-white">good design </span>
              <span className="text-[#7A7A7A]">should </span>
              <span className="text-white">solve the right problem, work in the real world, </span>
              <span className="text-[#7A7A7A]">and leave your team with something they can actually build on.</span>
            </motion.p>
          </div>

          {/* Cards row: y=447 (gap=102 from description bottom), flex gap-5, fixed 258px cards */}
          <div className="mt-[102px] flex flex-wrap gap-5">
            {approachCards.map((card, i) => (
              <ApproachCard key={card.number} card={card} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
      <ContactBanner />
    </>
  );
}
