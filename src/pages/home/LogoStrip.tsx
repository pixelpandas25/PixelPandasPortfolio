import { cn } from '@/lib/utils';

interface LogoItem {
  name: string;
  image?: string;
  icon?: string;
  maskColor?: string;
}

import logoGrowthplus from '@/assets/images/logo-rowA-growthplus.webp';
import logoRowA2 from '@/assets/images/logo-rowA-2.webp';
import logoTle from '@/assets/images/logo-rowA-tle.webp';
import logoRowA4 from '@/assets/images/logo-rowA-4.webp';
import logoRowA5 from '@/assets/images/logo-rowA-5.webp';
import logoRowA6 from '@/assets/images/logo-rowA-6.webp';
import logoGplus from '@/assets/images/logo-rowB-gplus.webp';
import logoCoreclubb from '@/assets/images/logo-rowB-coreclubb.webp';
import logoRowB3 from '@/assets/images/logo-rowB-3.webp';
import logoRowB4 from '@/assets/images/logo-rowB-4.webp';
import logoThaatbaat from '@/assets/images/logo-rowB-thaatbaat.webp';
import logoAicaIcon from '@/assets/icons/logo-aica-icon.svg';

const LOGO_COLOR = '#626262';

const rowA: LogoItem[] = [
  { name: 'GrowthPlus',    image: logoGrowthplus },
  { name: 'takeUforward',  image: logoRowA2, maskColor: LOGO_COLOR },
  { name: 'TLE Eliminator',image: logoTle },
  { name: 'Client logo',   image: logoRowA4, maskColor: LOGO_COLOR },
  { name: 'Client logo',   image: logoRowA5, maskColor: LOGO_COLOR },
  { name: 'Zenith',        image: logoRowA6, maskColor: LOGO_COLOR },
];

const rowB: LogoItem[] = [
  { name: 'G+',        image: logoGplus },
  { name: 'CoreClubb', image: logoCoreclubb },
  { name: 'Scapia',    image: logoRowB3 },
  { name: 'Client',    image: logoRowB4 },
  { name: 'AICA',      icon: logoAicaIcon },
  { name: 'Thaat Baat',image: logoThaatbaat },
];

/* ------------------------------------------------------------------ */
/* LOGO BOX                                                             */
/* ------------------------------------------------------------------ */

function LogoBox({ name, image, icon, maskColor }: LogoItem) {
  return (
    <div className="flex h-[56px] w-[144px] shrink-0 items-center justify-center rounded-[4px] bg-[#efefef] sm:h-[104px] sm:w-[267px]">
      {icon ? (
        /* AICA: icon + wordmark */
        <div className="flex items-center gap-[6px] sm:gap-[12px]">
          <img
            src={icon}
            alt=""
            aria-hidden
            className="h-[16px] w-[19px] sm:h-[30px] sm:w-[36px]"
            style={{ filter: `brightness(0) saturate(0) invert(40%)` }}
          />
          <span
            className="font-bold leading-none text-[21px] sm:text-[40px]"
            style={{ color: LOGO_COLOR }}
          >
            {name}
          </span>
        </div>
      ) : maskColor ? (
        /* Vector / text logos — rendered as a flat colour through the alpha mask */
        <div
          role="img"
          aria-label={name}
          className="h-[26px] sm:h-[48px]"
          style={{
            backgroundColor: maskColor,
            width: '70%',
            WebkitMaskImage: `url(${image})`,
            maskImage: `url(${image})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
      ) : (
        /* Raster logos — luminosity blend desaturates them against the #efefef tile */
        <img
          src={image}
          alt={name}
          className="mix-blend-luminosity max-h-[40px] w-auto max-w-[70%] object-contain sm:max-h-[76px]"
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MARQUEE ROW                                                          */
/* ------------------------------------------------------------------ */

function MarqueeRow({
  items,
  direction = 'forward',
}: {
  items: LogoItem[];
  direction?: 'forward' | 'reverse';
}) {
  const doubled = [...items, ...items];

  return (
    <div className="group flex w-max gap-[2px] sm:gap-1">
      <div
        className={cn(
          'flex gap-[2px] sm:gap-1',
          direction === 'forward' ? 'animate-marquee' : 'animate-marquee-reverse',
          'group-hover:[animation-play-state:paused]',
        )}
      >
        {doubled.map((item, i) => (
          <LogoBox key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LOGO STRIP                                                           */
/* ------------------------------------------------------------------ */

export function LogoStrip() {
  return (
    <section
      aria-label="Clients we've worked with"
      data-nav-tone="light"
      className="relative overflow-hidden bg-paper py-6"
    >
      {/* Left fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[28px] bg-gradient-to-r from-paper to-transparent sm:w-[52px]"
      />

      {/* Right fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[28px] bg-gradient-to-l from-paper to-transparent sm:w-[52px]"
      />

      <div className="flex flex-col gap-[2px] sm:gap-1">
        <MarqueeRow items={rowA} direction="forward" />
        <MarqueeRow items={rowB} direction="reverse" />
      </div>
    </section>
  );
}
