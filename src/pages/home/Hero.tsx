import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroEscKey from '@/assets/images/hero-esc-key.webp';
import shadowArc from '@/assets/icons/hero-shadow-arc.svg';
import walkingFigure from '@/assets/icons/hero-walking-figure.svg';
import { EscapeTransition } from '@/components/experimental/EscapeTransition';

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
        className="pointer-events-none absolute bottom-[3%] right-0 w-[24%]"
      />
    </div>
  );
}

export function Hero() {
  const navigate = useNavigate();
  const [escaping, setEscaping] = useState(false);

  // Pressing Escape on the "Escape" hero plays the full transition, which then
  // hands off to the Cal booking embed on the contact page.
  useEffect(() => {
    if (escaping) return; // the overlay owns Escape once it's playing

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) {
        return;
      }

      event.preventDefault();
      setEscaping(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [escaping]);

  return (
    <section
      data-nav-tone="light"
      className="relative overflow-hidden bg-paper pt-28 sm:pt-32 lg:min-h-[100dvh] lg:pt-0"
    >
      {escaping &&
        createPortal(
          <div className="fixed inset-0 z-[9999]">
            <EscapeTransition
              autoPlay
              showControls={false}
              onComplete={() => navigate('/contact#cal-embed')}
            />
          </div>,
          document.body,
        )}
      {/* Desktop: Figma 1440x760 composition, vertically centered in the viewport */}
      <div className="relative mx-auto hidden min-h-[100dvh] max-w-site items-center lg:flex">
        <div className="relative w-full" style={{ aspectRatio: '1440 / 760', containerType: 'inline-size' }}>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute font-bold leading-[0.9] text-ink-black"
          style={{ left: '2.64%', top: '20.66%', fontSize: '9.722cqw', letterSpacing: '-0.06em' }}
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
          style={{ right: '4.86%', top: '79.4%' }}
        >
          <p
            className="font-semibold text-muted"
            style={{ fontSize: '3.333cqw', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            from ordinary to
          </p>
          <p className="font-bold leading-[0.95] text-ink-black" style={{ fontSize: '6.667cqw', letterSpacing: '-0.04em' }}>
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
          <p className="font-semibold leading-none text-muted" style={{ fontSize: 'clamp(1.25rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            from ordinary to
          </p>
          <p className="text-display-2 font-bold leading-[0.95] text-ink-black">
            Extraordinary
          </p>
        </motion.div>
      </div>
    </section>
  );
}
