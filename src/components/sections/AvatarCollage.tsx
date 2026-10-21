import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import arrowRight from '@/assets/icons/arrow-right-cta.svg';

export interface CollageAvatar {
  src: string;
  alt: string;
  leftPct: number;
  topPct: number;
  sizePct: number;
  rotate: number;
}

interface AvatarCollageProps {
  eyebrow?: string;
  title: ReactNode;
  cta?: { label: string; href: string };
  avatars: CollageAvatar[];
  mobileAvatars?: CollageAvatar[];
}

const desktopVariants = {
  rest:  { scale: 1,    filter: 'grayscale(1)' },
  hover: { scale: 1.08, filter: 'grayscale(0)' },
};

const mobileVariants = {
  rest:  { scale: 1 },
  hover: { scale: 1.05 },
};

function AvatarImg({ avatar, colorful = false }: { avatar: CollageAvatar; colorful?: boolean }) {
  return (
    <motion.img
      src={avatar.src}
      alt={avatar.alt}
      initial="rest"
      whileHover="hover"
      variants={colorful ? mobileVariants : desktopVariants}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        left: `${avatar.leftPct}%`,
        top: `${avatar.topPct}%`,
        width: `${avatar.sizePct}%`,
        aspectRatio: '1 / 1',
        rotate: `${avatar.rotate}deg`,
      }}
      className="rounded-full object-cover"
    />
  );
}

export function AvatarCollage({ eyebrow, title, cta, avatars, mobileAvatars }: AvatarCollageProps) {
  return (
    <section data-nav-tone="dark" className="section-y bg-surface-dark px-4 sm:px-10">

      {/* ================================================================== */}
      {/* MOBILE card  (< sm = 640px)                                        */}
      {/* Fixed aspect-ratio container so %-based positions are correct.     */}
      {/* ================================================================== */}
      <div
        className="relative mx-auto w-full max-w-[393px] overflow-hidden rounded-[16px] border border-[#242428] bg-[#121214] shadow-[0_10px_20px_rgba(0,0,0,0.38)] sm:hidden"
        style={{ aspectRatio: '361 / 477' }}
      >
        {/* Gridlines */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-start justify-between px-[50px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-full w-px bg-[#242428] opacity-40" />
          ))}
        </div>

        {/* Avatars — full color on mobile (no grayscale) */}
        {(mobileAvatars ?? avatars).map((avatar, i) => (
          <AvatarImg key={i} avatar={avatar} colorful />
        ))}

        {/* Text block — Figma: left=72 top=391 w=258 in 361×477 card */}
        <div className="absolute bottom-[40px] w-full text-center">
          {eyebrow && (
            <p className="mb-1 text-xs font-medium uppercase text-muted">{eyebrow}</p>
          )}
          <h2 className="px-[72px] text-[20px] font-bold leading-[1.15] text-white">{title}</h2>
          {cta && (
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={cta.href}
              className="mt-4 inline-flex items-center gap-2 rounded-pill bg-paper px-7 py-3.5 text-label font-semibold text-ink-900 shadow-lg"
            >
              {cta.label}
              <img src={arrowRight} alt="" className="size-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/* DESKTOP card  (sm+)                                                */}
      {/* ================================================================== */}
      <div
        className="relative mx-auto hidden w-full max-w-[1360px] flex-col items-center justify-end overflow-hidden rounded-[32px] border border-[#242428] bg-[#121214] pb-20 shadow-[0_20px_40px_rgba(0,0,0,0.38)] sm:flex"
        style={{ aspectRatio: '1360 / 760' }}
      >
        {/* Gridlines */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-start justify-between px-24">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-full w-px bg-[#242428] opacity-40" />
          ))}
        </div>

        {/* Avatars */}
        {avatars.map((avatar, i) => (
          <AvatarImg key={i} avatar={avatar} />
        ))}

        {/* Text block */}
        <div className="relative z-10 flex w-full max-w-[800px] flex-col items-center gap-6 px-6 text-center">
          {eyebrow && <p className="text-eyebrow font-medium uppercase text-muted">{eyebrow}</p>}
          <h2 className="text-display-3 font-bold leading-[1.15] text-paper">{title}</h2>
          {cta && (
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={cta.href}
              className="flex items-center gap-2 rounded-pill bg-paper px-7 py-3.5 text-label font-semibold text-ink-900 shadow-lg"
            >
              {cta.label}
              <img src={arrowRight} alt="" className="size-4" />
            </motion.a>
          )}
        </div>
      </div>

    </section>
  );
}
