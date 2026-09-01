import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import servicesAvatar from '@/assets/images/services-avatar.webp';
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
  // resting transform for this card when it is fanned out behind the folder cover
  fan: { x: number; y: number; rotate: number };
}

// fan angles/offsets match the Figma "design service folder" composite (638:4816)
const services: Service[] = [
  {
    id: 'dev',
    title: 'Web & App Design & Development',
    description: 'Design-led development for fast, responsive & modern solutions.',
    tag: '.dev',
    icon: iconDev,
    fan: { x: 74, y: -50, rotate: 15 },
  },
  {
    id: 'social',
    title: 'Social Media Creatives',
    description: 'Scroll-stopping creatives that engage and convert.',
    tag: '.social',
    icon: iconSocial,
    fan: { x: -96, y: -22, rotate: -18 },
  },
  {
    id: 'brand',
    title: 'Brand Design',
    description: 'Build a strong identity that represents your brand, perfectly.',
    tag: '.brand',
    icon: iconBrand,
    fan: { x: 96, y: -12, rotate: 20 },
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description: 'User-centered designs that create seamless experiences.',
    tag: '.design',
    icon: iconUiux,
    fan: { x: -46, y: -58, rotate: -10 },
  },
];

const AUTO_ADVANCE_MS = 4000;
const CARD_SHADOW = '0 9px 9px 6px rgba(68,68,68,0.16)';

function CardBody({ service, muted }: { service: Service; muted: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-start gap-6 p-7 text-left">
      <div className="flex size-11 items-center justify-center rounded-lg bg-[#1a62ec]/5">
        <img src={service.icon} alt="" className="size-6" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-body font-bold text-[#0f172a]">{service.title}</p>
        <p
          className="text-caption leading-relaxed text-[#64748b] transition-opacity duration-reveal"
          style={{ opacity: muted ? 0 : 1 }}
        >
          {service.description}
        </p>
      </div>
      <span
        className="rounded bg-[#1a62ec]/[0.04] px-2 py-1 text-[10px] font-semibold text-[#1a62ec] transition-opacity duration-reveal"
        style={{ opacity: muted ? 0 : 1 }}
      >
        {service.tag}
      </span>
    </div>
  );
}

export function DesignServices() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (hovered || prefersReducedMotion) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % services.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [hovered, prefersReducedMotion]);

  return (
    <section data-nav-tone="light" className="section-y bg-paper px-6 sm:px-gutter-sm">
      <div className="mx-auto flex max-w-content flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-display-4 font-bold leading-[1.35]">
            <span className="text-muted-4">Our</span> <span className="text-ink-black">Design Services</span>
          </h2>
          <p className="max-w-2xl text-body text-[#64748b]">
            From startups finding their voice to established brands leveling up — we bring structure, strategy,
            and stunning design to everything we touch.
          </p>
        </div>

        <div
          className="relative h-[460px] w-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* closed folder: fanned cards behind a dark cover, cycles automatically */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-reveal"
            style={{ opacity: hovered ? 0 : 1, pointerEvents: hovered ? 'none' : 'auto' }}
            aria-hidden={hovered}
          >
            <div className="relative h-[350px] w-[300px]">
              {services.map((service, i) => {
                const isActive = i === active;
                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    onClick={() => setActive(i)}
                    initial={false}
                    animate={
                      isActive
                        ? { x: 0, y: 0, rotate: 0, scale: 1 }
                        : { x: service.fan.x, y: service.fan.y, rotate: service.fan.rotate, scale: 0.94 }
                    }
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    style={{ zIndex: isActive ? 20 : 10 - i, boxShadow: CARD_SHADOW }}
                    className="absolute inset-0 rounded-squircle bg-white"
                    aria-current={isActive}
                    aria-label={`Show ${service.title}`}
                  >
                    <CardBody service={service} muted />
                  </motion.button>
                );
              })}

              {/* folder cover: fades the front card into black, matching the Figma composite */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-squircle"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 22%, rgba(0,0,0,0.98) 40%, #000 55%, #000 100%)',
                  }}
                />
              </div>

              <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center overflow-hidden rounded-squircle">
                <div className="relative mt-11 size-[92px]">
                  <img src={pandaIcon} alt="" aria-hidden className="absolute inset-0 size-full opacity-90" />
                  <img
                    src={servicesAvatar}
                    alt="PixelPandas"
                    className="absolute inset-0 m-auto size-[88px] rounded-full object-cover"
                  />
                </div>

                <div className="mt-auto flex w-[85%] items-center justify-between pb-7">
                  <span className="text-label font-semibold text-white">What we do?</span>
                  <div className="pointer-events-auto flex items-center gap-2 rounded-pill bg-black/20 px-2.5 py-2">
                    {services.map((service, i) => (
                      <button
                        key={service.id}
                        type="button"
                        aria-label={`Show ${service.title}`}
                        aria-current={i === active}
                        onClick={() => setActive(i)}
                        className="flex size-3 items-center justify-center"
                      >
                        <span
                          className="block size-1.5 rounded-full bg-white transition-opacity duration-300"
                          style={{ opacity: i === active ? 1 : 0.4 }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* open folder: hovering reveals every service card in full */}
          <div
            className="absolute inset-0 grid grid-cols-2 gap-4 transition-opacity duration-reveal sm:grid-cols-4 sm:gap-5"
            style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? 'auto' : 'none' }}
            aria-hidden={!hovered}
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="h-[350px] w-full rounded-squircle bg-white"
                style={{ boxShadow: CARD_SHADOW }}
              >
                <CardBody service={service} muted={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
