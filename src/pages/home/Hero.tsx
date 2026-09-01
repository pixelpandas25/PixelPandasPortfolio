import { motion } from 'framer-motion';
import heroEscKey from '@/assets/images/hero-esc-key.webp';
import shadowArc from '@/assets/icons/hero-shadow-arc.svg';
import walkingFigure from '@/assets/icons/hero-walking-figure.svg';

function HeroImage({ className }: { className?: string }) {
  return (
    <div className={className}>
      <img src={shadowArc} alt="" aria-hidden className="pointer-events-none absolute -left-[8%] top-[45%] w-[70%] opacity-70" />
      <div className="relative aspect-[346/306] w-full overflow-hidden">
        <img
          src={heroEscKey}
          alt="A giant Esc keyboard key, photographed at an angle"
          className="absolute max-w-none"
          style={{ left: '-78.9%', top: '-164.71%', width: '250.29%', height: '445.16%' }}
        />
      </div>
      <img
        src={walkingFigure}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] right-[-6%] w-[24%]"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section
      data-nav-tone="light"
      className="relative overflow-hidden bg-paper pt-28 sm:pt-32 lg:min-h-[100dvh] lg:pt-0"
    >
      {/* Desktop: Figma 1440x760 composition, vertically centered in the viewport */}
      <div className="relative mx-auto hidden min-h-[100dvh] max-w-site items-center lg:flex">
        <div className="relative w-full" style={{ aspectRatio: '1440 / 760' }}>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute text-display-1 font-bold leading-[0.9] tracking-tight text-ink-black"
          style={{ left: '2.64%', top: '20.66%' }}
        >
          Escape
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="absolute"
          style={{ left: '39.1%', top: '26.2%', width: '26.3%' }}
        >
          <HeroImage className="relative" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
          className="absolute text-right"
          style={{ right: '4.9%', top: '73%' }}
        >
          <p className="text-display-5 font-semibold text-muted">from ordinary to</p>
          <p className="-mt-1 text-display-2 font-bold leading-[0.95] tracking-tight text-ink-black">
            Extraordinary
          </p>
        </motion.div>
        </div>
      </div>

      {/* Mobile / tablet: simple stacked flow */}
      <div className="mx-auto flex max-w-site flex-col items-center gap-12 px-6 pb-10 text-center sm:px-gutter-sm sm:pb-12 lg:hidden">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="self-start text-display-1 font-bold leading-[0.9] tracking-tight text-ink-black"
        >
          Escape
        </motion.h1>

        <HeroImage className="relative w-full max-w-[380px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
          className="self-end text-right"
        >
          <p className="text-body-lg font-semibold text-muted sm:text-display-5">from ordinary to</p>
          <p className="-mt-1 text-display-2 font-bold leading-[0.95] tracking-tight text-ink-black">
            Extraordinary
          </p>
        </motion.div>
      </div>
    </section>
  );
}
