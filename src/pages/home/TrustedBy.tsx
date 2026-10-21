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

/* ── Desktop canvas (1360 × 760) ── */
const CANVAS_W = 1360;
const CANVAS_H = 760;

const avatars: CollageAvatar[] = [
  { src: t1,  alt: '', leftPct: (311  / CANVAS_W) * 100, topPct: (250 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate: -16.5  },
  { src: t2,  alt: '', leftPct: (577  / CANVAS_W) * 100, topPct: (289 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate:   0     },
  { src: t3,  alt: '', leftPct: (797  / CANVAS_W) * 100, topPct: (254 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate:  14.79  },
  { src: t4,  alt: '', leftPct: (210  / CANVAS_W) * 100, topPct: ( 44 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate:  -6.35  },
  { src: t5,  alt: '', leftPct: (160  / CANVAS_W) * 100, topPct: (448 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate:  -6.35  },
  { src: t6,  alt: '', leftPct: (680  / CANVAS_W) * 100, topPct: ( 29 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate:  12.22  },
  { src: t7,  alt: '', leftPct: (1057 / CANVAS_W) * 100, topPct: (223 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate:  12.22  },
  { src: t8,  alt: '', leftPct: (937  / CANVAS_W) * 100, topPct: ( 25 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate:  12.22  },
  { src: t9,  alt: '', leftPct: (972  / CANVAS_W) * 100, topPct: (434 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate:   0     },
  { src: t10, alt: '', leftPct: (470  / CANVAS_W) * 100, topPct: ( 43 / CANVAS_H) * 100, sizePct: (180 / CANVAS_W) * 100, rotate:   0     },
];

/* ── Mobile canvas (361 × 477) ── */
/* Figma outer frame = 393 × 477px; card left-edge = (393-361)/2 = 16px.  */
/* All Figma `left` values are in outer-frame space → subtract 16 first.  */
/* Inner image top-left = (outer_left - 16 + bbox_offset, outer_top + bbox_offset) */
/* where bbox_offset = (bbox_size - 90) / 2 for rotated wrappers.        */
const MW = 361;   // card width
const MH = 477;   // card height
const MS = 90;    // avatar diameter px
const CX = 16;    // card left-edge within outer 393px frame

const mobileAvatars: CollageAvatar[] = [
  // top-left,     Figma outer(53,45)   bbox 99.4  → inner(53-16+4.7, 45+4.7)
  { src: t4,  alt: '', leftPct: ((53  - CX + 4.7)   / MW) * 100, topPct: ((45   + 4.7)   / MH) * 100, sizePct: (MS / MW) * 100, rotate:  -6.35 },
  // top-right,    Figma outer(242,37)  bbox 107.0 → inner(242-16+8.5, 37+8.5)
  { src: t8,  alt: '', leftPct: ((242 - CX + 8.5)   / MW) * 100, topPct: ((37   + 8.5)   / MH) * 100, sizePct: (MS / MW) * 100, rotate:  12.22 },
  // top-centre,   Figma outer(157,33)  no rotation → inner(157-16, 33)
  { src: t10, alt: '', leftPct: ((157 - CX)          / MW) * 100, topPct: (33              / MH) * 100, sizePct: (MS / MW) * 100, rotate:   0    },
  // mid-left,     Figma outer(27,251)  bbox 111.85→ inner(27-16+10.9, 251+10.9)
  { src: t1,  alt: '', leftPct: (( 27 - CX + 10.9)  / MW) * 100, topPct: ((251  + 10.9)  / MH) * 100, sizePct: (MS / MW) * 100, rotate: -16.5  },
  // mid-centre,   Figma outer(142,224) no rotation → inner(142-16, 224)
  { src: t2,  alt: '', leftPct: ((142 - CX)          / MW) * 100, topPct: (224             / MH) * 100, sizePct: (MS / MW) * 100, rotate:   0    },
  // centre-left,  Figma outer(58,144)  bbox 107.0 → inner(58-16+8.5, 144+8.5)
  { src: t6,  alt: '', leftPct: (( 58 - CX + 8.5)   / MW) * 100, topPct: ((144  + 8.5)   / MH) * 100, sizePct: (MS / MW) * 100, rotate:  12.22 },
  // centre-right, Figma outer(212,138) bbox 107.0 → inner(212-16+8.5, 138+8.5)
  { src: t7,  alt: '', leftPct: ((212 - CX + 8.5)   / MW) * 100, topPct: ((138  + 8.5)   / MH) * 100, sizePct: (MS / MW) * 100, rotate:  12.22 },
  // centre,       Figma outer(139,117) no rotation → inner(139-16, 117)
  { src: t9,  alt: '', leftPct: ((139 - CX)          / MW) * 100, topPct: (117             / MH) * 100, sizePct: (MS / MW) * 100, rotate:   0    },
  // far-right,    Figma outer(263.95,168.95) bbox 101.5 → inner(263.95-16+5.75, 168.95+5.75)
  { src: t5,  alt: '', leftPct: ((263.95 - CX + 5.75) / MW) * 100, topPct: ((168.95 + 5.75) / MH) * 100, sizePct: (MS / MW) * 100, rotate:   7.89 },
  // lower-right,  Figma outer(232,246) bbox 110.0 → inner(232-16+10, 246+10)
  { src: t3,  alt: '', leftPct: ((232 - CX + 10.0)  / MW) * 100, topPct: ((246  + 10.0)  / MH) * 100, sizePct: (MS / MW) * 100, rotate:  14.79 },
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
      // cta={{ label: 'Read Success Stories', href: '/work' }}
      avatars={avatars}
      mobileAvatars={mobileAvatars}
    />
  );
}
