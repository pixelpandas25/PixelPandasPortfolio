import { cn } from '@/lib/utils';

interface LogoItem {
  name: string;
  image?: string;
  icon?: string;
  /**
   * Figma renders this logo as a solid-color mask rather than the literal source
   * image — the raw asset is a low-contrast/near-white export that washes out
   * under the usual luminosity blend, so Figma fills the shape with a flat gray
   * (#626262) using the image purely as an alpha mask. Set to reproduce that.
   */
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

const MASK_GRAY = '#626262';

const rowA: LogoItem[] = [
  { name: 'GrowthPlus', image: logoGrowthplus },
  { name: 'takeUforward', image: logoRowA2, maskColor: MASK_GRAY },
  { name: 'TLE Eliminator', image: logoTle },
  { name: 'Client logo', image: logoRowA4 },
  { name: 'Client logo', image: logoRowA5 },
  { name: 'Zenith', image: logoRowA6, maskColor: MASK_GRAY },
];

const rowB: LogoItem[] = [
  { name: 'G+', image: logoGplus },
  { name: 'CoreClubb', image: logoCoreclubb },
  { name: 'Client logo', image: logoRowB3 },
  { name: 'Client logo', image: logoRowB4 },
  { name: 'AICA', icon: logoAicaIcon },
  { name: 'Thaat Baat', image: logoThaatbaat },
];

function LogoBox({ name, image, icon, maskColor }: { name: string; image?: string; icon?: string; maskColor?: string }) {
  return (
    <div className="flex h-[104px] w-[220px] shrink-0 items-center justify-center rounded bg-[#efefef]">
      {icon ? (
        <div className="flex items-center gap-3">
          <img src={icon} alt="" aria-hidden className="h-8 w-auto" style={{ mixBlendMode: 'luminosity' }} />
          <span className="font-display text-2xl font-bold text-[#626262]">{name}</span>
        </div>
      ) : maskColor ? (
        <div
          role="img"
          aria-label={name}
          className="h-16"
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
        <img
          src={image}
          alt={name}
          className="max-h-16 w-auto max-w-[70%] object-contain"
          style={{ mixBlendMode: 'luminosity' }}
        />
      )}
    </div>
  );
}

function MarqueeRow({
  items,
  direction = 'forward',
}: {
  items: typeof rowA;
  direction?: 'forward' | 'reverse';
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex w-max gap-1">
      <div
        className={cn(
          'flex gap-1',
          direction === 'forward' ? 'animate-marquee' : 'animate-marquee-reverse',
          'group-hover:[animation-play-state:paused]',
        )}
      >
        {doubled.map((item, i) => (
          <LogoBox
            key={`${item.name}-${i}`}
            name={item.name}
            image={item.image}
            icon={item.icon}
            maskColor={item.maskColor}
          />
        ))}
      </div>
    </div>
  );
}

export function LogoStrip() {
  return (
    <section
      aria-label="Clients we've worked with"
      data-nav-tone="light"
      className="relative overflow-hidden bg-paper py-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent"
      />
      <div className="flex flex-col gap-1">
        <MarqueeRow items={rowA} direction="forward" />
        <MarqueeRow items={rowB} direction="reverse" />
      </div>
    </section>
  );
}
