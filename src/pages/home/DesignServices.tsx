import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

import servicesAvatar from '@/assets/images/services-avatar.webp';
import folderOutline from '@/assets/icons/services-folder-outline.svg';
import folderMatte from '@/assets/images/services-folder-matte.webp';
import folderShapeMask from '@/assets/images/services-folder-shape-mask.webp';
import pandaIcon from '@/assets/icons/services-panda-icon.svg';

import iconDev from '@/assets/icons/svc-icon-dev.svg';
import iconSocial from '@/assets/icons/svc-icon-social.svg';
import iconBrand from '@/assets/icons/svc-icon-brand.svg';
import iconUiux from '@/assets/icons/svc-icon-uiux.svg';

interface Service {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  slot: {
    x: number;
    y: number;
    rotate: number;
  };
}

const services: Service[] = [
  {
    id: 'dev',
    title: 'Web & App Design & Development',
    description:
      'Design-led development for fast, responsive & modern solutions.',
    tag: '.dev',
    icon: iconDev,
    slot: {
      x: 4,
      y: -8,
      rotate: 15.27,
    },
  },
  {
    id: 'social',
    title: 'Social Media Creatives',
    description:
      'Scroll-stopping creatives that engage and convert.',
    tag: '.social',
    icon: iconSocial,
    slot: {
      x: -32,
      y: 6,
      rotate: -20,
    },
  },
  {
    id: 'brand',
    title: 'Brand Design',
    description:
      'Build a strong identity that represents your brand, perfectly.',
    tag: '.brand',
    icon: iconBrand,
    slot: {
      x: 28,
      y: 10,
      rotate: 20,
    },
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description:
      'User-centered designs that create seamless experiences.',
    tag: '.design',
    icon: iconUiux,
    slot: {
      x: -6,
      y: 14,
      rotate: -10,
    },
  },
];

const AUTO_ADVANCE_MS = 4000;

const CARD_SHADOW =
  '0px 8.54px 8.54px 6.405px rgba(68,68,68,0.16)';

const CARD_TRANSITION = {
  type: 'spring' as const,
  stiffness: 170,
  damping: 24,
};

/*
 * Open/close sequencing. FOLDER_FADE_S is how long the cover
 * itself takes to fade. The fan cards are ALWAYS opacity: 1 — in
 * the closed pose they sit stacked and rotated behind the folder,
 * so only their corners peek out past the folder's silhouette
 * (through the frosted top sliver and past the matte's rounded
 * edges), exactly like the fanned-photo reference. Opening: cards
 * wait until the cover is well past halfway faded before they
 * start moving into the row layout. Closing: the position reset
 * to the stacked pose is delayed until the cover has visually
 * finished closing, so nothing is seen snapping into place through
 * the still-translucent cover.
 */
const FOLDER_FADE_S = 0.35;
const CARD_OPEN_DELAY_S = 0.18;
const CARD_CLOSE_POSITION_DELAY_S = 0.3;

/*
 * Figma reference canvas.
 */
const STAGE_W = 980;
const STAGE_H = 460;

const FOLDER_W = 458.258;
const FOLDER_H = 455.224;

const FOLDER_LEFT = (STAGE_W - FOLDER_W) / 2;
const FOLDER_TOP = (STAGE_H - FOLDER_H) / 2;

/*
 * True (unrotated) card size behind the folder, derived from the
 * Figma node's rotated bounding box (638:4816) — every fan card
 * shares this footprint, only position/rotation differ per slot.
 */
const FAN_CARD_W = 420;
const FAN_CARD_H = 395;

const FAN_LEFT = FOLDER_LEFT + (FOLDER_W - FAN_CARD_W) / 2;
const FAN_TOP =
  FOLDER_TOP + (FOLDER_H - FAN_CARD_H) / 2 - 80;

const ROW_GAP = 24;
const ROW_CARD_W = (STAGE_W - ROW_GAP * 3) / 4;
const ROW_CARD_H = 420;
const ROW_TOP = (STAGE_H - ROW_CARD_H) / 2;

function useCanvasScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width =
        entries[0]?.contentRect.width ?? designWidth;

      setScale(Math.min(1, width / designWidth));
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [designWidth]);

  return [ref, scale] as const;
}

function CardContent({
  service,
}: {
  service: Service;
}) {
  return (
    <div className="flex size-full flex-col items-start justify-between p-[30px] text-left">
      {/* Top content */}
      <div className="flex flex-col items-start gap-6">
        {/* Icon */}
        <div className="flex size-11 items-center justify-center rounded-lg bg-[#1a62ec]/5">
          <img
            src={service.icon}
            alt=""
            className="size-6"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-start gap-2">
          <p className="text-[16px] font-bold leading-[1.3] text-[#0f172a]">
            {service.title}
          </p>

          <p className="text-[12px] leading-[1.5] text-[#64748b]">
            {service.description}
          </p>
        </div>
      </div>

      {/* Tag */}
      <span className="rounded bg-[#1a62ec]/[0.04] px-2 py-1 text-[10px] font-semibold text-[#1a62ec]">
        {service.tag}
      </span>
    </div>
  );
}

export function DesignServices() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  const [canvasRef, scale] =
    useCanvasScale(STAGE_W);

  /*
   * Auto rotate through the service cards.
   * Pauses while the user is hovering over the
   * desktop composition. Depends on `active` so that
   * a manual click (card or dot) restarts the countdown
   * instead of being overridden moments later by a
   * stale auto-advance tick.
   */
  useEffect(() => {
    if (hovered || prefersReducedMotion) {
      return;
    }

    const id = setInterval(() => {
      setActive((i) => (i + 1) % services.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(id);
  }, [active, hovered, prefersReducedMotion]);

  return (
    <section
      data-nav-tone="light"
      className="relative overflow-hidden bg-paper px-6 py-16 sm:min-h-[760px] sm:px-gutter-sm sm:pb-12 sm:pt-16"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center">

        {/* =========================================================
            Heading
        ========================================================== */}
        <div className="relative z-30 flex flex-col items-center gap-1 text-center">
          <h2 className="text-display-4 font-bold leading-[1.35]">
            <span className="text-[#7A7A7A]">
              Our
            </span>{' '}

            <span className="text-ink-black">
              Design Services
            </span>
          </h2>

          <p className="max-w-2xl text-body text-[#64748b] sm:max-w-[658px]">
            From startups finding their voice to established
            brands leveling up — we bring structure, strategy,
            and stunning design to everything we touch.
          </p>
        </div>

        {/* =========================================================
            Mobile
        ========================================================== */}
        <div className="mt-10 flex w-full flex-col gap-5 sm:hidden">
          {services.map((service) => (
            <div
              key={service.id}
              className="w-full overflow-hidden rounded-[22px] bg-white"
              style={{
                boxShadow: CARD_SHADOW,
              }}
            >
              <CardContent service={service} />
            </div>
          ))}
        </div>

        {/* =========================================================
            Desktop / Tablet
        ========================================================== */}
        <div
          ref={canvasRef}
          className="relative z-10 hidden w-full overflow-visible sm:block"
          style={{
            /*
             * Matches the 51px gap between the paragraph and the
             * folder in the Figma composition (638:4816).
             */
            height: STAGE_H * scale,
            marginTop: 51,
          }}
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

            {/* =====================================================
                Background folder outline
            ====================================================== */}
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
              animate={{
                opacity: hovered ? 0 : 1,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : FOLDER_FADE_S,
                ease: 'easeInOut',
              }}
            />

            {/* =====================================================
                Folder Front / Matte Shade
            ====================================================== */}
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
              animate={{
                opacity: hovered ? 0 : 1,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : FOLDER_FADE_S,
                ease: 'easeInOut',
              }}
            >
              {/* ---------------------------------------------------
                  Matte folder surface: a backdrop-blur pass so the
                  fanned cards read as soft, frosted shapes through
                  the top of the folder, a low-opacity pass of the
                  real Figma pixels for grain/texture, and a
                  hand-tuned matte gradient on top (near-transparent
                  at the very top so blurred card color bleeds
                  through, deepening smoothly to solid matte black
                  by the bottom — no hard bands, no glossy sheen).
                  All three share one mask so they're clipped to the
                  folder-tab silhouette.
              ---------------------------------------------------- */}
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

              {/* =================================================
                  Panda
              ================================================== */}
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
                  style={{
                    left: 4.367,
                    top: 4.718,
                  }}
                />
              </div>

              {/* =================================================
                  Folder Footer
              ================================================== */}
              <div
                className="absolute flex items-center justify-between"
                style={{
                  left: 39,
                  top: 399,
                  width: 383,
                }}
              >
                <span className="text-[15px] font-semibold text-white">
                  What we do?
                </span>

                <div className="flex items-center gap-[12px] rounded-pill bg-black/20 px-[10px] py-[8px]">
                  {services.map((service, i) => (
                    <button
                      key={service.id}
                      type="button"
                      aria-label={`Show ${service.title}`}
                      aria-current={i === active}
                      onClick={() => setActive(i)}
                      tabIndex={hovered ? -1 : 0}
                      className={cn(
                        'flex size-[12px] items-center justify-center',
                        !hovered && 'pointer-events-auto',
                      )}
                    >
                      <span
                        className="block size-[6px] rounded-full bg-white transition-opacity duration-300"
                        style={{
                          opacity:
                            i === active ? 1 : 0.4,
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* =====================================================
                Service Cards
            ====================================================== */}
            {services.map((service, i) => {
              const isActive = i === active;

              /*
               * Cards are always opacity: 1 — visibility comes from
               * the z-index stack instead (cards sit above the
               * folder outline but below the opaque/blurred folder
               * front). In the closed pose they're stacked and
               * rotated behind the folder, so only slivers of each
               * card peek out past the folder's silhouette, just
               * like the fanned reference. Opening: position waits
               * until the cover has had time to visibly fade.
               * Closing: position waits to reset until the cover
               * has visually finished closing, so nothing is seen
               * snapping back into the stack through the
               * still-translucent cover.
               */
              const positionTransition = prefersReducedMotion
                ? { duration: 0 }
                : hovered
                  ? { ...CARD_TRANSITION, delay: CARD_OPEN_DELAY_S }
                  : {
                      ...CARD_TRANSITION,
                      delay: CARD_CLOSE_POSITION_DELAY_S,
                    };

              return (
                <motion.button
                  key={service.id}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={false}
                  animate={
                    hovered
                      ? {
                          /*
                           * Expanded four-card row. Cards only
                           * start moving here once the folder cover
                           * has had time to visibly fade (see
                           * CARD_OPEN_DELAY_S below).
                           */
                          left:
                            i *
                            (ROW_CARD_W +
                              ROW_GAP),
                          top: ROW_TOP,
                          width: ROW_CARD_W,
                          height: ROW_CARD_H,
                          x: 0,
                          y: 0,
                          rotate: 0,
                          opacity: 1,
                        }
                      : {
                          /*
                           * Hidden, stacked pose behind the closed
                           * folder. Opacity reaches 0 almost
                           * immediately on close so nothing is seen
                           * moving through the still-translucent
                           * cover; the position reset is delayed
                           * until the cover has visually finished
                           * closing (CARD_CLOSE_POSITION_DELAY_S).
                           */
                          left: FAN_LEFT,
                          top: FAN_TOP,
                          width: FAN_CARD_W,
                          height: FAN_CARD_H,

                          x: service.slot.x,
                          y: service.slot.y,
                          rotate: service.slot.rotate,
                          opacity: 1,
                        }
                  }
                  transition={{
                    default: positionTransition,
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: i + 1,
                    boxShadow: CARD_SHADOW,
                    borderRadius: 20,

                    /*
                     * Fully inert while stacked behind the closed
                     * folder — visible as a peeking sliver, but not
                     * clickable/focusable until the folder opens.
                     */
                    pointerEvents: hovered ? 'auto' : 'none',
                  }}
                  className={cn(
                    'overflow-hidden text-left',
                    service.id === 'dev' ? 'bg-white/80' : 'bg-white',
                  )}
                  tabIndex={hovered ? 0 : -1}
                  aria-hidden={!hovered}
                  aria-current={isActive}
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