import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import phoneImg from '@/assets/images/contact-phone.webp';
import iconLinkedin from '@/assets/icons/social-linkedin-dark.webp';
import iconInstagram from '@/assets/icons/social-instagram-dark.webp';
import iconX from '@/assets/icons/social-x-dark.webp';

const chips = [
  { label: 'PixelPandas', icon: iconLinkedin, href: 'https://linkedin.com/company/PixelPandas' },
  { label: 'pixelpandas.in', icon: iconInstagram, href: 'https://instagram.com/pixelpandas.in' },
  { label: 'PixelPandas_in', icon: iconX, href: 'https://x.com/PixelPandas_in' },
];

function ChipList({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <ul className={className} style={style}>
      {chips.map((chip) => (
        <li key={chip.label}>
          <a
            href={chip.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[7px] whitespace-nowrap text-body-lg leading-[1.6] text-muted transition-colors duration-hover hover:text-ink-900"
          >
            <img src={chip.icon} alt="" className="size-6" />
            {chip.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ContactBanner() {
  return (
    <section
      id="contact"
      data-nav-tone="light"
      className="section-y relative z-[60] overflow-hidden bg-paper"
    >
      {/* Desktop — 1440x760 reference canvas (Figma 638:4917); every child below is
          positioned as a % of this box (or cqw for type) so it scales as one unit. */}
      <div
        className="relative mx-auto hidden w-full max-w-site lg:block"
        style={{ aspectRatio: '1440 / 760', containerType: 'inline-size' }}
      >
        {/* Email */}
        <p
          className="absolute text-body-lg leading-[1.6] text-ink-900"
          style={{
            left: '12.08%',
            top: '11.05%',
          }}
        >
          hello@pixelpandas.in
        </p>

        {/* Phone - stands in for the missing word, tucked into the headline's gap and
            mostly hidden above the section (Figma "Object" 638:5310) */}
        <motion.img
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          src={phoneImg}
          alt=""
          aria-hidden
          className="pointer-events-none absolute z-10 object-cover"
          style={{
            left: '34.58%',
            top: '-39.21%',
            width: '6.99%',
            height: '93.59%',
          }}
        />

        {/* Main text composition */}
        <div
          className="absolute flex flex-col items-start"
          style={{ left: '12.08%', top: '39.74%', gap: '1.875cqw' }}
        >
          {/* First row: "We're the [phone] team you contact" — the gap below is sized
              to match the phone's slot exactly, so it reads evenly on both sides */}
          <div className="flex items-center" style={{ gap: '12.08cqw' }}>
            <span
              className="whitespace-nowrap font-bold leading-none tracking-[-0.04em] text-[#3a3a3a]"
              style={{ fontSize: '4.444cqw',  wordSpacing: '0.08em', }}
            >
              We&rsquo;re the
            </span>

            <span
              className="whitespace-nowrap font-bold leading-none tracking-[-0.04em] text-[#3a3a3a]"
              style={{ fontSize: '4.444cqw',  wordSpacing: '0.08em' }}
            >
              team you contact
            </span>
          </div>

          {/* Second + third rows */}
          <p
            className="font-bold leading-[1.35] tracking-[-0.04em] text-[#3a3a3a]"
            style={{ fontSize: '4.444cqw' , wordSpacing: '0.08em', }}
          >
            When your product needs
            <br />
            More than just good design
          </p>
        </div>

        {/* Social links */}
        <ChipList
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-20"
          style={{
            top: '87.37%',
          }}
        />
      </div>

      {/* Mobile / Tablet */}
      <div className="mx-auto max-w-site px-6 sm:px-gutter-sm lg:hidden">
        <p className="text-body-lg text-ink-900">
          hello@pixelpandas.in
        </p>

        <div className="relative mt-10">
          <motion.img
            initial={{ opacity: 0, y: -16, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            src={phoneImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[24%] top-0 z-10 h-[190px] w-auto -translate-y-[95%]"
          />

          <h2 className="text-balance text-[clamp(2.6rem,9vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#3a3a3a]">
            We&rsquo;re the team you contact
            <br />
            When your product needs
            <br />
            More than just good design
          </h2>
        </div>

        <ChipList className="mt-16 flex flex-wrap items-center justify-center gap-10" />
      </div>
    </section>
  );
}