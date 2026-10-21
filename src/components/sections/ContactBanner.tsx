import { motion, type Variants } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

import phoneImg from '@/assets/images/contact-phone.webp';
import iconLinkedin from '@/assets/icons/social-linkedin-dark.webp';
import iconInstagram from '@/assets/icons/social-instagram-dark.webp';
import iconX from '@/assets/icons/social-x-dark.webp';

const chips = [
  {
    label: 'PixelPandas',
    icon: iconLinkedin,
    href: 'https://linkedin.com/company/PixelPandas',
  },
  {
    label: 'pixelpandas.in',
    icon: iconInstagram,
    href: 'https://instagram.com/pixelpandas.in',
  },
  {
    label: 'PixelPandas_in',
    icon: iconX,
    href: 'https://x.com/PixelPandas_in',
  },
];

/* -------------------------------------------------------------------------- */
/* PHONE PHYSICS                                                              */
/* -------------------------------------------------------------------------- */

function phoneVariants(restRotate: number): Variants {
  return {
    hidden: {
      opacity: 0,
      x: 0,
      y: '-22%',
      rotate: restRotate + 16,
    },

    visible: {
      opacity: 1,
      y: [
        '-22%',
        '0%',
        '2.2%',
        '-1.2%',
        '0.65%',
        '-0.3%',
        '0.12%',
        '0%',
      ],
      x: [0, 0, -8, 6, -4, 2.5, -1, 0],
      rotate: [
        restRotate + 16,
        restRotate,
        restRotate - 11,
        restRotate + 7,
        restRotate - 4,
        restRotate + 2,
        restRotate - 0.8,
        restRotate,
      ],

      transition: {
        opacity: {
          duration: 0.22,
          ease: 'easeOut',
        },
        y: {
          duration: 1.7,
          times: [0, 0.36, 0.47, 0.59, 0.7, 0.81, 0.91, 1],
          ease: 'easeOut',
        },
        x: {
          duration: 1.7,
          times: [0, 0.36, 0.47, 0.59, 0.7, 0.81, 0.91, 1],
          ease: 'easeOut',
        },
        rotate: {
          duration: 1.7,
          times: [0, 0.36, 0.47, 0.59, 0.7, 0.81, 0.91, 1],
          ease: 'easeOut',
        },
      },
    },
  };
}

/* -------------------------------------------------------------------------- */
/* TEXT ANIMATION                                                             */
/* -------------------------------------------------------------------------- */

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const wordContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.95,
      staggerChildren: 0.075,
    },
  },
};

const simpleTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const chipVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/* -------------------------------------------------------------------------- */
/* WORD COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

function AnimatedWord({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.span
      variants={wordVariants}
      className="inline-block"
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/* CHIP LIST                                                                  */
/* -------------------------------------------------------------------------- */

function ChipList({
  className,
  style,
  variants,
}: {
  className?: string;
  style?: CSSProperties;
  variants?: Variants;
}) {
  return (
    <motion.ul
      className={className}
      style={style}
      variants={variants}
    >
      {chips.map((chip) => (
        <li key={chip.label}>
          <a
            href={chip.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[7px] whitespace-nowrap text-body-lg leading-[1.6] text-muted transition-colors duration-hover hover:text-ink-900"
          >
            <img
              src={chip.icon}
              alt=""
              className="size-6"
            />
            {chip.label}
          </a>
        </li>
      ))}
    </motion.ul>
  );
}

/* -------------------------------------------------------------------------- */
/* CONTACT BANNER                                                             */
/* -------------------------------------------------------------------------- */

export function ContactBanner() {
  const rowRef = useRef<HTMLDivElement>(null);
  const theRef = useRef<HTMLSpanElement>(null);
  const teamRef = useRef<HTMLSpanElement>(null);

  const [phoneLeft, setPhoneLeft] = useState<number | null>(null);

  /*
   * Dynamically position the phone between "the" and "team".
   * Recalculate when the text dimensions or viewport changes.
   */

  useLayoutEffect(() => {
    const row = rowRef.current;
    const the = theRef.current;
    const team = teamRef.current;

    if (!row || !the || !team) return;

    const updatePhonePosition = () => {
      const rowRect = row.getBoundingClientRect();
      const theRect = the.getBoundingClientRect();
      const teamRect = team.getBoundingClientRect();

      const midpoint = (theRect.right + teamRect.left) / 2;

      setPhoneLeft(midpoint - rowRect.left);
    };

    updatePhonePosition();

    const observer = new ResizeObserver(updatePhonePosition);

    observer.observe(row);
    observer.observe(the);
    observer.observe(team);

    window.addEventListener('resize', updatePhonePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePhonePosition);
    };
  }, []);

  return (
    <section
      id="contact"
      data-nav-tone="light"
      className="pb-10 sm:py-14 relative z-[60] overflow-hidden bg-paper"
    >
      {/* ================================================================== */}
      {/* DESKTOP                                                             */}
      {/* ================================================================== */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="relative mx-auto hidden w-full max-w-site lg:block"
        style={{
          aspectRatio: '1440 / 760',
          containerType: 'inline-size',
        }}
      >
        {/* EMAIL */}

        <motion.p
          variants={simpleTextVariants}
          className="absolute text-body-lg leading-[1.6] text-ink-900"
          style={{
            left: '12.08%',
            top: '11.05%',
          }}
        >
          hello@pixelpandas.in
        </motion.p>

        {/* TELEPHONE HANDSET */}

        <motion.img
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.4,
          }}
          variants={phoneVariants(0)}
          src={phoneImg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute z-10 object-cover"
          style={{
            left: '34.58%',
            top: '-39.21%',
            width: '6.99%',
            height: '93.59%',
            transformOrigin: '50% 18%',
            willChange: 'transform, opacity',
          }}
        />

        {/* MAIN TEXT */}

        <div
          className="absolute flex flex-col items-start"
          style={{
            left: '12.08%',
            top: '39.74%',
            gap: '1.875cqw',
          }}
        >
          {/* FIRST ROW */}

          <motion.div
            variants={wordContainerVariants}
            className="flex items-center"
            style={{
              gap: '12.08cqw',
            }}
          >
            <span
              className="whitespace-nowrap font-bold leading-none tracking-[-0.04em] text-[#3a3a3a]"
              style={{
                fontSize: '4.444cqw',
                wordSpacing: '0.08em',
              }}
            >
              <AnimatedWord>We&rsquo;re</AnimatedWord>{' '}
              <AnimatedWord>the</AnimatedWord>
            </span>

            <span
              className="whitespace-nowrap font-bold leading-none tracking-[-0.04em] text-[#3a3a3a]"
              style={{
                fontSize: '4.444cqw',
                wordSpacing: '0.08em',
              }}
            >
              <AnimatedWord>team</AnimatedWord>{' '}
              <AnimatedWord>you</AnimatedWord>{' '}
              <AnimatedWord>contact</AnimatedWord>
            </span>
          </motion.div>

          {/* SECOND + THIRD ROWS */}

          <motion.p
            variants={wordContainerVariants}
            className="font-bold leading-[1.35] tracking-[-0.04em] text-[#3a3a3a]"
            style={{
              fontSize: '4.444cqw',
              wordSpacing: '0.08em',
            }}
          >
            <AnimatedWord>When</AnimatedWord>{' '}
            <AnimatedWord>your</AnimatedWord>{' '}
            <AnimatedWord>product</AnimatedWord>{' '}
            <AnimatedWord>needs</AnimatedWord>

            <br />

            <AnimatedWord>More</AnimatedWord>{' '}
            <AnimatedWord>than</AnimatedWord>{' '}
            <AnimatedWord>just</AnimatedWord>{' '}
            <AnimatedWord>good</AnimatedWord>{' '}
            <AnimatedWord>design</AnimatedWord>
          </motion.p>
        </div>

        {/* SOCIAL LINKS */}

        <ChipList
          variants={chipVariants}
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-20"
          style={{
            top: '87.37%',
          }}
        />

        {/* CTAS */}

        <motion.div
          variants={simpleTextVariants}
          className="absolute flex items-center gap-[12px]"
          style={{
            left: '73.82%',
            top: '4.01%',
          }}
        >
          <a
            href="mailto:hello@pixelpandas.in"
            className="rounded-[100px] border border-[#e5e5e5] bg-[#f5f5f5] px-6 py-4 text-[15px] font-semibold leading-none text-[#121212] transition-colors duration-hover hover:bg-[#ebebeb]"
          >
            Send a mail
          </a>

          <Link
            to="/contact#cal-embed"
            className="rounded-[100px] bg-black px-6 py-4 text-[15px] font-semibold leading-none text-white transition-colors duration-hover hover:bg-[#1a1a1a]"
          >
            Book a call
          </Link>
        </motion.div>
      </motion.div>

      {/* ================================================================== */}
      {/* MOBILE / TABLET                                                     */}
      {/* ================================================================== */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="relative min-h-[275px] w-full overflow-hidden lg:hidden"
      >
        {/* EMAIL */}

        <motion.p
          variants={simpleTextVariants}
          className="absolute right-3 top-[18px] whitespace-nowrap text-[12px] leading-[1.6] text-[#121212] sm:right-5"
        >
          hello@pixelpandas.in
        </motion.p>

        {/* CONTENT BLOCK */}

        <div className="absolute left-3 right-3 top-[83px] flex flex-col gap-[17px] sm:left-5 sm:right-5">
          <motion.div
            variants={wordContainerVariants}
            className="flex flex-col gap-3 font-semibold text-[#3a3a3a]"
          >
            {/* FIRST ROW */}

            <div
              ref={rowRef}
              className="relative flex items-center text-[clamp(16px,5.3vw,20px)] leading-none"
            >
              <span className="whitespace-nowrap">
                <AnimatedWord>We&rsquo;re</AnimatedWord>{' '}

                <span
                  ref={theRef}
                  className="inline-block"
                >
                  <AnimatedWord>the</AnimatedWord>
                </span>
              </span>

              <span
                ref={teamRef}
                className="ml-[clamp(32px,10vw,44px)] whitespace-nowrap"
              >
                <AnimatedWord>team</AnimatedWord>{' '}
                <AnimatedWord>you</AnimatedWord>{' '}
                <AnimatedWord>contact</AnimatedWord>
              </span>

              {/* DYNAMICALLY POSITIONED PHONE */}

              {phoneLeft !== null && (
                <div
                  className="pointer-events-none absolute z-10"
                  style={{
                    left: phoneLeft - 12,
                    top: '-176px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <motion.img
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    variants={phoneVariants(-6)}
                    src={phoneImg}
                    alt=""
                    aria-hidden="true"
                    className="h-[clamp(175px,58vw,217px)] w-auto"
                    style={{
                      transformOrigin: '50% 18%',
                      willChange: 'transform, opacity',
                    }}
                  />
                </div>
              )}
            </div>

            {/* SECOND + THIRD ROWS */}

            <div className="text-[clamp(16px,5.3vw,20px)]">
              <p className="leading-[1.5]">
                <AnimatedWord>When</AnimatedWord>{' '}
                <AnimatedWord>your</AnimatedWord>{' '}
                <AnimatedWord>product</AnimatedWord>{' '}
                <AnimatedWord>needs</AnimatedWord>
              </p>

              <p className="leading-[1.5]">
                <AnimatedWord>More</AnimatedWord>{' '}
                <AnimatedWord>than</AnimatedWord>{' '}
                <AnimatedWord>just</AnimatedWord>{' '}
                <AnimatedWord>good</AnimatedWord>{' '}
                <AnimatedWord>design</AnimatedWord>
              </p>
            </div>
          </motion.div>

          {/* CTAS */}

          <motion.div
            variants={simpleTextVariants}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="mailto:hello@pixelpandas.in"
              className="rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-3 py-2 text-[10px] font-semibold leading-none text-[#121212] transition-colors duration-hover hover:bg-[#ebebeb]"
            >
              Send a mail
            </a>

            <Link
              to="/contact#cal-embed"
              className="rounded-full bg-black px-3 py-2 text-[10px] font-semibold leading-none text-white transition-colors duration-hover hover:bg-[#1a1a1a]"
            >
              Book a call
            </Link>
          </motion.div>

          {/* SOCIAL LINKS */}

          <motion.div
            variants={chipVariants}
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            {chips.map((chip) => (
              <a
                key={chip.label}
                href={chip.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[3px] whitespace-nowrap transition-opacity duration-hover hover:opacity-70"
              >
                <img
                  src={chip.icon}
                  alt=""
                  className="size-[10px]"
                />

                <span className="text-[11px] leading-[1.6] text-[#7a7a7a]">
                  {chip.label}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
