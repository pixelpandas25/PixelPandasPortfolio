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
}

export function AvatarCollage({ eyebrow, title, cta, avatars }: AvatarCollageProps) {
  return (
    <section data-nav-tone="dark" className="section-y bg-surface-dark px-4 sm:px-10">
      <div
        className="relative mx-auto flex min-h-[480px] w-full max-w-[1360px] flex-col items-center justify-end overflow-hidden rounded-[32px] border border-[#242428] bg-[#121214] py-12 shadow-[0_20px_40px_rgba(0,0,0,0.38)] sm:aspect-[1360/760] sm:min-h-0 sm:py-0 sm:pb-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden justify-between px-24 sm:flex"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-full w-px bg-[#242428] opacity-40" />
          ))}
        </div>

        {avatars.map((avatar, i) => (
          <motion.img
            key={i}
            src={avatar.src}
            alt={avatar.alt}
            initial="rest"
            whileHover="hover"
            variants={{
              rest: { scale: 1, filter: 'grayscale(1)' },
              hover: { scale: 1.08, filter: 'grayscale(0)' },
            }}
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
        ))}

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
