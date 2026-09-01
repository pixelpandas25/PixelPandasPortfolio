import { AvatarCollage, type CollageAvatar } from '@/components/sections/AvatarCollage';
import t1 from '@/assets/images/trusted-1.webp';
import t2 from '@/assets/images/trusted-2.webp';
import t3 from '@/assets/images/trusted-3.webp';
import t4 from '@/assets/images/trusted-4.webp';
import t5 from '@/assets/images/trusted-5.webp';
import t6 from '@/assets/images/trusted-6.webp';
import t7 from '@/assets/images/trusted-7.webp';
import t8 from '@/assets/images/trusted-8.webp';
import t9 from '@/assets/images/trusted-9.webp';
import t10 from '@/assets/images/trusted-10.webp';

const CANVAS_W = 1360;
const CANVAS_H = 760;

const avatars: CollageAvatar[] = [
  { src: t1, alt: '', leftPct: (311 / CANVAS_W) * 100, topPct: (250 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: -16.5 },
  { src: t2, alt: '', leftPct: (577 / CANVAS_W) * 100, topPct: (289 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: 0 },
  { src: t3, alt: '', leftPct: (797 / CANVAS_W) * 100, topPct: (254 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: 14.79 },
  { src: t4, alt: '', leftPct: (210 / CANVAS_W) * 100, topPct: (44 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: -6.35 },
  { src: t5, alt: '', leftPct: (160 / CANVAS_W) * 100, topPct: (448 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: -6.35 },
  { src: t6, alt: '', leftPct: (680 / CANVAS_W) * 100, topPct: (29 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: 12.22 },
  { src: t7, alt: '', leftPct: (1057 / CANVAS_W) * 100, topPct: (223 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: 12.22 },
  { src: t8, alt: '', leftPct: (937 / CANVAS_W) * 100, topPct: (25 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: 12.22 },
  { src: t9, alt: '', leftPct: (972 / CANVAS_W) * 100, topPct: (434 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: 0 },
  { src: t10, alt: '', leftPct: (470 / CANVAS_W) * 100, topPct: (43 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: 0 },
];

export function TrustedBy() {
  return (
    <AvatarCollage
      title={
        <>
          Trusted by leaders
          <br />
          from various industries
        </>
      }
      cta={{ label: 'Read Success Stories', href: '/work' }}
      avatars={avatars}
    />
  );
}
