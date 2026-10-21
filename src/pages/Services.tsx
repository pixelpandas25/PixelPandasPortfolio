import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { ContactBanner } from '@/components/sections/ContactBanner';
import { useInView } from '@/hooks/useInView';
import arrowUpRight from '@/assets/icons/tag-arrow-up-right.svg';

import brandImg  from '@/assets/images/services/01.avif';
import uiuxImg   from '@/assets/images/services/02.avif';
import visualImg from '@/assets/images/services/03.avif';
import webImg    from '@/assets/images/services/04.avif';

const EASE = [0.16, 1, 0.3, 1] as const;

interface Service {
  title: string;
  /** Anchor id — used by the homepage cards to deep-link here */
  sectionId: string;
  tags: string[];
  description: string;
  image: string;
  imageLeft: boolean;
  /** ?category= value on /work that shows relevant projects for this service */
  workCategory: string;
}

const services: Service[] = [
  {
    title: 'Brand Design',
    sectionId: 'brand-design',
    tags: ['Logo Design', 'Brand Strategy', 'Visual Language', 'Brand Book & Guideline'],
    description:
      'We build distinctive brand identities that make your business instantly recognisable. From strategy and visual language to logos and brand guidelines, we create a system that stays consistent across every touchpoint.',
    image: brandImg,
    imageLeft: true,
    workCategory: 'Branding',
  },
  {
    title: 'UI/UX Design',
    sectionId: 'ui-ux-design',
    tags: ['Web & App Design', 'Design System', 'Consumer UX', 'Enterprise UX', 'UX Audit'],
    description:
      'We turn complex ideas into simple, intuitive digital experiences. From product strategy and user flows to polished interfaces and scalable design systems, we design products that are easy to use and built to grow.',
    image: uiuxImg,
    imageLeft: false,
    workCategory: 'UI/UX',
  },
  {
    title: 'Visual Creatives',
    sectionId: 'visual-creatives',
    tags: ['Packaging', 'Social Media', 'Print Design', 'Campaign Design', 'Marketing Creatives'],
    description:
      'We create visuals that make people stop, notice, and remember. From social campaigns and marketing creatives to packaging and print, we bring your brand to life across every visual touchpoint.',
    image: visualImg,
    imageLeft: true,
    workCategory: 'Branding',
  },
  {
    title: 'Website Design & Development',
    sectionId: 'website-dev',
    tags: ['Website Design', 'Web Development'],
    description:
      'We design and build websites that look great and work hard. From high-converting landing pages to complete brand websites, we combine strategy, design, and development to create digital experiences that drive results.',
    image: webImg,
    imageLeft: false,
    workCategory: 'Website Designs',
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
      "Every pixel has a purpose. We design with real code constraints in mind — creating handoffs developers can implement without losing the design intent.",
  },
  {
    number: '04',
    title: 'Leave a system behind',
    description:
      "We don't just deliver screens. We build reusable components, design systems and guidelines that help your team move faster long after we're done.",
  },
];

/* ── Shared CTA pair ────────────────────────────────────────────────────── */
function ServiceCtas({ workCategory }: { workCategory: string }) {
  return (
    <div className="flex flex-wrap items-center gap-[18px]">
      {/* Contact Us → jumps straight to the booking calendar on /contact */}
      <Link
        to="/contact#cal-embed"
        className="inline-flex items-center rounded-[150px] bg-black px-[18px] py-[12px] text-[16px] font-semibold text-white"
      >
        Contact Us
      </Link>
      {/* Explore Portfolio → /work pre-filtered to the relevant category */}
      <Link
        to={`/work?category=${encodeURIComponent(workCategory)}`}
        className="inline-flex items-center rounded-[150px] border-[1.5px] border-[#e5e5e5] bg-[#f5f5f5] px-[18px] py-[12px] text-[16px] font-semibold text-[#121212]"
      >
        Explore Portfolio
        <img src={arrowUpRight} alt="" aria-hidden className="ml-[3px] size-[21px] shrink-0" />
      </Link>
    </div>
  );
}

/* ── Service row ────────────────────────────────────────────────────────── */
function ServiceRow({ service }: { service: Service }) {
  const [rowRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      id={service.sectionId}
      ref={rowRef}
      className="flex flex-col gap-8 lg:h-[451px] lg:flex-row lg:items-stretch lg:gap-[60px]"
    >
      {/* Image — always first on mobile; lg:order-* swaps it on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.95, ease: EASE }}
        className={`w-full overflow-hidden rounded-[16px] lg:h-[451px] lg:w-auto lg:flex-1${!service.imageLeft ? ' lg:order-last' : ''}`}
      >
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Text — always second on mobile; lg:order-* swaps it on desktop */}
      <div className={`flex flex-col gap-[16px] lg:gap-[41px] lg:w-[393px] lg:shrink-0${!service.imageLeft ? ' lg:order-first' : ''}`}>
        <div className="flex flex-col gap-[13px]">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE, delay: 0.12 }}
            className="text-[clamp(1.75rem,5vw,3rem)] font-medium leading-[1.05] text-[#111]"
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
                className="rounded-[999px] border border-[#d9d9d9] px-[10px] py-[8px] text-[14px] font-medium text-[#1c1c1c]"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
            className="text-[16px] font-normal leading-[1.5] text-[#3a3a3a] lg:text-[20px]"
          >
            {service.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.42 }}
        >
          <ServiceCtas workCategory={service.workCategory} />
        </motion.div>
      </div>
    </div>
  );
}

/* ── Approach card ──────────────────────────────────────────────────────── */
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
      className="relative h-[360px] overflow-clip rounded-[16px]"
      style={{ background: 'rgba(244,244,244,0.15)' }}
    >
      {/* 01/02/03/04 watermark — bleeds 38 px above the card */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute right-0 top-[-38px] text-[90px] font-bold leading-none text-black opacity-60 tracking-[4.5px]"
      >
        {card.number}
      </span>

      <div className="flex h-full flex-col justify-between p-8">
        <h4 className="text-[24px] font-medium leading-[1.05] text-white">
          {card.title}
        </h4>
        <p className="text-[16px] font-normal leading-[1.5] text-[#d9d9d9]">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function Services() {
  const [approachRef, approachInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { hash } = useLocation();

  /* Scroll to anchored service section when navigating from homepage cards */
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      /* Small timeout lets the page finish its entrance animation first */
      const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      return () => clearTimeout(t);
    }
  }, [hash]);

  return (
    <>
      <Seo
        title="Services — PixelPandas"
        description="Whether you're building a brand, launching a product, or fixing an experience — we're ready to jump in."
        path="/services"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      {/* Figma: "OUR" at top-122, "SERVICES" at top-212, 72 px medium */}
      <section
        data-nav-tone="light"
        className="bg-paper px-6 pb-[48px] pt-[120px] sm:px-[91px]"
      >
        <div className="mx-auto max-w-site">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="text-[clamp(2.5rem,8vw,4.5rem)] font-medium leading-[1.25] text-[#111]"
          >
            OUR
            <br />
            SERVICES
          </motion.h1>
        </div>
      </section>

      {/* ── Services grid ─────────────────────────────────────────────────── */}
      {/* Figma: left-[91px], w-[1261px], gap-[100px] between rows */}
      <section
        data-nav-tone="light"
        className="bg-paper px-6 pb-[120px] pt-[48px] sm:px-[91px]"
      >
        <div className="mx-auto flex max-w-site flex-col gap-[80px] sm:gap-[100px]">
          {services.map((service) => (
            <ServiceRow key={service.title} service={service} />
          ))}
        </div>
      </section>

      {/* ── Our Approach ──────────────────────────────────────────────────── */}
      {/* Figma: 847 px tall, bg-black, px-80, pt-62, content-width ~1280 */}
      <section
        data-nav-tone="dark"
        className="bg-black px-6 pb-[40px] pt-[80px] sm:px-[80px]"
      >
        <div className="mx-auto max-w-site">
          <div ref={approachRef}>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={approachInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[20px] font-semibold uppercase leading-[1.05] tracking-[0.02em] text-[#d9d9d9]"
            >
              Our Approach
            </motion.p>

            {/* Mixed-colour description — matches Figma segments exactly */}
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={approachInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
              className="mt-8 max-w-[1300px] text-[clamp(1.25rem,2.5vw,2rem)] font-medium leading-[1.45] sm:mt-[53px]"
            >
              <span className="text-[#7a7a7a]">Most agencies deliver a design</span>
              <span className="text-white">.</span>
              <br />
              <span className="text-white">We care about what happens after it.</span>
              <br /><br />
              <span className="text-[#7a7a7a]">We think </span>
              <span className="text-white">good design </span>
              <span className="text-[#7a7a7a]">should </span>
              <span className="text-white">solve the right problem, work in the real world, </span>
              <span className="text-[#7a7a7a]">and leave your team with something they can actually build on.</span>
            </motion.p>
          </div>

          {/* Approach cards — Figma gap-[20px], cards 360 px tall */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:mt-[102px] lg:grid-cols-4">
            {approachCards.map((card, i) => (
              <ApproachCard key={card.number} card={card} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <ContactBanner />
    </>
  );
}
