import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import servicesAvatar   from '@/assets/images/services-avatar.webp';
import folderOutline    from '@/assets/icons/services-folder-outline.svg';
import folderMatte      from '@/assets/images/services-folder-matte.webp';
import folderShapeMask  from '@/assets/images/services-folder-shape-mask.webp';
import pandaIcon        from '@/assets/icons/services-panda-icon.svg';

import iconSocial from '@/assets/icons/svc-icon-social.svg';
import iconUiux   from '@/assets/icons/svc-icon-uiux.svg';
import iconBrand  from '@/assets/icons/svc-icon-brand.svg';
import iconDev    from '@/assets/icons/svc-icon-dev.svg';

/* ── Types ──────────────────────────────────────────────────────────────── */
interface Service {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  /** Deep-link into the /services page for this specific service */
  href: string;
  /** Absolute position in the 1320 × 500 stage when folder is CLOSED */
  fan: { left: number; top: number; rotate: number; zIndex: number };
}

/* ── Service data — order matches left-to-right open row ────────────────── */
const services: Service[] = [
  {
    id: 'social',
    title: 'Social Media Creatives',
    description:
      'We create scroll-stopping visuals that capture attention, spark engagement and make your brand stand out.',
    tag: '.social',
    icon: iconSocial,
    href: '/services#visual-creatives',
    /*
     * Figma folder-relative pos: left = −88.61, top = 5.86
     * Stage: FOLDER_LEFT(430.87) − 88.61 = 342.26, FOLDER_TOP(22.39) + 5.86 = 28.25
     * Painted last in Figma → highest z-index in fan
     */
    fan: { left: 342, top: 28, rotate: -11.17, zIndex: 4 },
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description:
      'We turn complex ideas into intuitive digital experiences that feel effortless to use and built to convert.',
    tag: '.design',
    icon: iconUiux,
    href: '/services#ui-ux-design',
    /*
     * Figma: left = −68.02, top = −60.47
     * Stage: 362.85, −38.08
     */
    fan: { left: 363, top: -38, rotate: 9.13, zIndex: 1 },
  },
  {
    id: 'brand',
    title: 'Brand Design',
    description:
      'We build distinctive brand identities that tell your story, set you apart and stay memorable.',
    tag: '.brand',
    icon: iconBrand,
    href: '/services#brand-design',
    /*
     * Figma: left = 186.16, top = −8.07
     * Stage: 617.03, 14.32
     */
    fan: { left: 617, top: 14, rotate: 19.6, zIndex: 3 },
  },
  {
    id: 'dev',
    title: 'Website Development',
    description:
      'We build fast, responsive websites that look great, work seamlessly and grow with you.',
    tag: '.dev',
    icon: iconDev,
    href: '/services#website-dev',
    /*
     * Figma: left = 125, top = −88
     * Stage: 555.87, −65.61
     */
    fan: { left: 556, top: -66, rotate: 0, zIndex: 2 },
  },
];

/* ── Constants ──────────────────────────────────────────────────────────── */
const AUTO_ADVANCE_MS = 4000;
const CARD_SHADOW     = '0px 8.54px 8.54px 6.405px rgba(3, 3, 3, 0.16)';
const CARD_TRANSITION = { type: 'spring' as const, stiffness: 170, damping: 24 };

const FOLDER_FADE_S              = 0.35;
const CARD_OPEN_DELAY_S          = 0.18;
const CARD_CLOSE_POSITION_DELAY_S = 0.3;

/* Stage — matches Figma proportions (1320 px wide so 4 × 313 + 3 × 20 fits) */
const STAGE_W = 1320;
const STAGE_H = 500;

const FOLDER_W    = 458.258;
const FOLDER_H    = 455.224;
const FOLDER_LEFT = (STAGE_W - FOLDER_W) / 2;  // 430.87
const FOLDER_TOP  = (STAGE_H - FOLDER_H) / 2;  // 22.39

/* Row (open) layout */
const ROW_CARD_W     = 313;
const ROW_CARD_H     = 365;
const ROW_GAP        = 20;
const ROW_LEFT_START = (STAGE_W - (ROW_CARD_W * 4 + ROW_GAP * 3)) / 2; // 4
/*
 * Figma places the card row 11.27 px ABOVE the folder top (top: -11.27 relative to folder).
 * In stage coords: FOLDER_TOP(22.39) − 11.27 = 11.12
 */
const ROW_TOP = FOLDER_TOP - 11.27; // 11.12

/* ── Canvas scaler ──────────────────────────────────────────────────────── */
function useCanvasScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? designWidth;
      setScale(Math.min(1, w / designWidth));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [designWidth]);

  return [ref, scale] as const;
}

/* ── Card content ───────────────────────────────────────────────────────── */
function CardContent({ service }: { service: Service }) {
  return (
    <div className="flex size-full flex-col items-start justify-between p-[24px]">
      <div className="flex flex-col gap-[12px]">
        {/* Icon — full 72 × 72, no background container */}
        <img src={service.icon} alt="" aria-hidden className="size-[72px] shrink-0" />

        {/* Text */}
        <div className="flex flex-col gap-[8px]">
          <p className="text-[16px] font-bold leading-[1.3] text-[#0f172a]">
            {service.title}
          </p>
          <p className="text-[12px] leading-[1.5] text-[#64748b]">
            {service.description}
          </p>
        </div>
      </div>

      {/* Tag */}
      <span className="rounded-[4px] bg-[rgba(26,98,236,0.04)] px-[8px] py-[4px] text-[10px] font-semibold leading-normal text-[#1a62ec]">
        {service.tag}
      </span>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */
export function DesignServices() {
  const [active,  setActive]  = useState(0);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion  = useReducedMotion();
  const [canvasRef, scale]    = useCanvasScale(STAGE_W);
  const navigate              = useNavigate();

  /* Auto-advance indicator dots (pauses on hover) */
  useEffect(() => {
    if (hovered || prefersReducedMotion) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % services.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [active, hovered, prefersReducedMotion]);

  return (
    <section
      data-nav-tone="light"
      className="relative overflow-hidden bg-paper px-6 pb-12 pt-16 sm:min-h-[760px] sm:px-gutter-sm"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center">

        {/* ── Heading ────────────────────────────────────────────────────── */}
        <div className="relative z-30 flex flex-col items-center gap-[4px] text-center">
          <h2 className="text-display-4 font-bold leading-[1.35]">
            <span className="text-[#d9d9d9]">Our</span>
            {' '}
            <span className="text-[#0f172a]">Design Services</span>
          </h2>
          <p className="max-w-[658px] text-[16px] leading-[1.6] text-[#64748b]">
            From startups finding their voice to established brands leveling
            up &mdash; we bring structure, strategy, and stunning design to
            everything we touch.
          </p>
        </div>

        {/* ── Mobile: stacked cards ──────────────────────────────────────── */}
        <div className="mt-10 flex w-full flex-col gap-5 sm:hidden">
          {services.map((service) => (
            <div
              key={service.id}
              className="w-full overflow-hidden rounded-[22px] bg-white"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <CardContent service={service} />
            </div>
          ))}
        </div>

        {/* ── Desktop: folder composition ────────────────────────────────── */}
        <div
          ref={canvasRef}
          className="relative z-10 hidden w-full overflow-visible sm:block"
          style={{ height: STAGE_H * scale, marginTop: 51 }}
        >
          <div
            className="relative mx-auto"
            style={{
              width: STAGE_W,
              height: STAGE_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >

            {/* ── Folder outline (visible when closed) ─────────────────── */}
            <motion.img
              src={folderOutline}
              alt=""
              aria-hidden
              className="pointer-events-none absolute select-none"
              style={{
                left: FOLDER_LEFT,
                top: FOLDER_TOP,
                width: FOLDER_W,
                height: FOLDER_H,
                zIndex: 0,
              }}
              animate={{ opacity: hovered ? 0 : 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : FOLDER_FADE_S,
                ease: 'easeInOut',
              }}
            />

            {/* ── Folder front / matte cover ────────────────────────────── */}
            <motion.div
              className="pointer-events-none absolute overflow-hidden"
              style={{
                left: FOLDER_LEFT,
                top: FOLDER_TOP,
                width: FOLDER_W,
                height: FOLDER_H,
                zIndex: 25,
                borderRadius: '42px',
              }}
              animate={{ opacity: hovered ? 0 : 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : FOLDER_FADE_S,
                ease: 'easeInOut',
              }}
            >
              {/* Frosted matte body (backdrop-blur + gradient) */}
              <div
                aria-hidden
                className="absolute left-0 w-full overflow-hidden"
                style={{
                  top: 49.817,
                  height: 405.407,
                  WebkitMaskImage: `url(${folderShapeMask})`,
                  maskImage: `url(${folderShapeMask})`,
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow:
                    'inset 0 1px 3px rgba(255,255,255,0.14), inset 0 -28px 46px rgba(0,0,0,0.45)',
                }}
              >
                <img
                  src={folderMatte}
                  alt=""
                  className="absolute inset-0 size-full select-none object-cover"
                  style={{ opacity: 0.2 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(232,232,232,0.08) 0%, rgba(200,200,200,0.28) 15%, rgba(140,140,140,0.5) 35%, rgba(70,70,70,0.75) 55%, rgba(20,20,20,0.94) 78%, #000000 100%)',
                  }}
                />
              </div>

              {/* Panda avatar ring */}
              <div
                className="absolute"
                style={{
                  left: 179.633,
                  top: 201.282,
                  width: 102.478,
                  height: 102.478,
                }}
              >
                <img
                  src={pandaIcon}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 size-full opacity-90"
                />
                <img
                  src={servicesAvatar}
                  alt="PixelPandas"
                  className="absolute size-[97.717px] rounded-full object-cover"
                  style={{ left: 4.367, top: 4.718 }}
                />
              </div>

              {/* Folder footer: label + dot indicators */}
              <div
                className="absolute flex items-center justify-between"
                style={{ left: 39, top: 399, width: 383 }}
              >
                <span className="text-[15px] font-semibold leading-normal text-white">
                  What we do?
                </span>

                <div className="flex items-center gap-[12px] rounded-full bg-black/20 px-[10px] py-[8px]">
                  {services.map((svc, i) => (
                    <button
                      key={svc.id}
                      type="button"
                      aria-label={`Show ${svc.title}`}
                      aria-current={i === active}
                      onClick={() => setActive(i)}
                      tabIndex={hovered ? -1 : 0}
                      className="flex size-[12px] items-center justify-center"
                    >
                      <span
                        className="block size-[6px] rounded-full bg-white transition-opacity duration-300"
                        style={{ opacity: i === active ? 1 : 0.4 }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Service cards — fanned (closed) ↔ row (open) ─────────── */}
            {services.map((service, i) => {
              const positionTransition = prefersReducedMotion
                ? { duration: 0 }
                : hovered
                  ? { ...CARD_TRANSITION, delay: CARD_OPEN_DELAY_S }
                  : { ...CARD_TRANSITION, delay: CARD_CLOSE_POSITION_DELAY_S };

              return (
                <motion.button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    if (hovered) navigate(service.href);
                  }}
                  initial={false}
                  animate={
                    hovered
                      ? {
                          left:    ROW_LEFT_START + i * (ROW_CARD_W + ROW_GAP),
                          top:     ROW_TOP,
                          width:   ROW_CARD_W,
                          height:  ROW_CARD_H,
                          rotate:  0,
                          opacity: 1,
                        }
                      : {
                          left:    service.fan.left,
                          top:     service.fan.top,
                          width:   ROW_CARD_W,
                          height:  ROW_CARD_H,
                          rotate:  service.fan.rotate,
                          opacity: 1,
                        }
                  }
                  transition={{ default: positionTransition }}
                  style={{
                    position:      'absolute',
                    borderRadius:  22,
                    boxShadow:     CARD_SHADOW,
                    pointerEvents: hovered ? 'auto' : 'none',
                    zIndex:        hovered ? i + 1 : service.fan.zIndex,
                    background:    service.id === 'dev' ? 'rgba(255,255,255,0.8)' : '#ffffff',
                  }}
                  className="overflow-hidden text-left"
                  tabIndex={hovered ? 0 : -1}
                  aria-hidden={!hovered}
                  aria-current={i === active}
                  aria-label={`Show ${service.title}`}
                >
                  <CardContent service={service} />
                </motion.button>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
