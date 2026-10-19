import { motion, type Variants } from 'framer-motion';
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
/* PHONE PHYSICS                                                             */
/* -------------------------------------------------------------------------- */

/**
 * The handset behaves like a real weighted object attached to an elastic cord:
 *
 * DROP
 *   ↓
 * IMPACT
 *   ↓
 * LARGE SWING
 *   ↓
 * ELASTIC RECOIL
 *   ↓
 * SMALLER SWINGS
 *   ↓
 * SETTLE
 *
 * We deliberately avoid scaleX/scaleY because the handset itself should
 * remain rigid. The physical feeling comes from rotation + translation.
 */
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

      /*
       * Vertical movement:
       *
       * - Starts above the final position
       * - Slightly overshoots after impact
       * - Small vertical oscillations
       * - Finally settles at exactly y: 0
       */
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

      /*
       * Horizontal movement represents the handset's momentum.
       *
       * The progressively smaller values create the feeling of
       * an elastic cable losing energy.
       */
      x: [
        0,
        0,
        -8,
        6,
        -4,
        2.5,
        -1,
        0,
      ],

      /*
       * Main pendulum motion.
       *
       * Large initial swing:
       * +16 → -11 → +7 → -4 → +2 → -0.8 → 0
       *
       * This is much closer to a weighted handset swinging on a cable
       * than a generic "jiggle".
       */
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

        /*
         * The vertical drop happens quickly and has a slight
         * physical rebound.
         */
        y: {
          duration: 1.7,
          times: [
            0,
            0.36,
            0.47,
            0.59,
            0.7,
            0.81,
            0.91,
            1,
          ],
          ease: 'easeOut',
        },

        /*
         * Horizontal inertia.
         */
        x: {
          duration: 1.7,
          times: [
            0,
            0.36,
            0.47,
            0.59,
            0.7,
            0.81,
            0.91,
            1,
          ],
          ease: 'easeOut',
        },

        /*
         * Stronger damping gives a noticeable elastic swing,
         * but the movement still settles naturally.
         */
        rotate: {
          duration: 1.7,
          times: [
            0,
            0.36,
            0.47,
            0.59,
            0.7,
            0.81,
            0.91,
            1,
          ],
          ease: 'easeOut',
        },
      },
    },
  };
}

/* -------------------------------------------------------------------------- */
/* TEXT ANIMATION                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Individual word animation.
 *
 * Each word rises very slightly while fading in.
 * This gives a smooth editorial / premium entrance.
 */
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

/**
 * Controls the timing of the individual words.
 */
const wordContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.95,
      staggerChildren: 0.075,
    },
  },
};

/**
 * Email/social elements use a simpler entrance.
 */
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
  return (
    <section
      id="contact"
      data-nav-tone="light"
      className="section-y relative z-[60] overflow-hidden bg-paper"
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
        {/* -------------------------------------------------------------- */}
        {/* EMAIL                                                           */}
        {/* -------------------------------------------------------------- */}

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

        {/* -------------------------------------------------------------- */}
        {/* TELEPHONE HANDSET                                               */}
        {/* -------------------------------------------------------------- */}

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
          aria-hidden
          className="pointer-events-none absolute z-10 object-cover"
          style={{
            /*
             * IMPORTANT:
             * These layout values remain exactly as before.
             */
            left: '34.58%',
            top: '-39.21%',
            width: '6.99%',
            height: '93.59%',

            /*
             * The phone swings from the upper portion of the handset,
             * creating a believable cable/attachment pivot.
             */
            transformOrigin: '50% 18%',

            willChange: 'transform, opacity',
          }}
        />

        {/* -------------------------------------------------------------- */}
        {/* MAIN TEXT                                                       */}
        {/* -------------------------------------------------------------- */}

        <div
          className="absolute flex flex-col items-start"
          style={{
            left: '12.08%',
            top: '39.74%',
            gap: '1.875cqw',
          }}
        >
          {/* ------------------------------------------------------------ */}
          {/* FIRST ROW                                                     */}
          {/* ------------------------------------------------------------ */}

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

          {/* ------------------------------------------------------------ */}
          {/* SECOND + THIRD ROWS                                           */}
          {/* ------------------------------------------------------------ */}

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

        {/* -------------------------------------------------------------- */}
        {/* SOCIAL LINKS                                                    */}
        {/* -------------------------------------------------------------- */}

        <ChipList
          variants={chipVariants}
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-20"
          style={{
            top: '87.37%',
          }}
        />

        {/* -------------------------------------------------------------- */}
        {/* CTAs                                                            */}
        {/* -------------------------------------------------------------- */}

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
      {/* MOBILE / TABLET                                                    */}
      {/* ================================================================== */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="mx-auto max-w-site px-6 sm:px-gutter-sm lg:hidden"
      >
        {/* Email */}
        <motion.p
          variants={simpleTextVariants}
          className="text-body-lg text-ink-900"
        >
          hello@pixelpandas.in
        </motion.p>

        <div className="relative mt-10">
          {/* ------------------------------------------------------------ */}
          {/* MOBILE PHONE                                                  */}
          {/* ------------------------------------------------------------ */}

          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.4,
            }}
            variants={phoneVariants(-6)}
            src={phoneImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[24%] top-0 z-10 h-[190px] w-auto -translate-y-[95%]"
            style={{
              transformOrigin: '50% 18%',
              willChange: 'transform, opacity',
            }}
          />

          {/* ------------------------------------------------------------ */}
          {/* MOBILE TEXT                                                   */}
          {/* ------------------------------------------------------------ */}

          <motion.h2
            variants={wordContainerVariants}
            className="text-balance text-[clamp(2.6rem,9vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#3a3a3a]"
          >
            <AnimatedWord>We&rsquo;re</AnimatedWord>{' '}
            <AnimatedWord>the</AnimatedWord>{' '}
            <AnimatedWord>team</AnimatedWord>{' '}
            <AnimatedWord>you</AnimatedWord>{' '}
            <AnimatedWord>contact</AnimatedWord>

            <br />

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
          </motion.h2>
        </div>

        {/* Social links */}
        <ChipList
          variants={chipVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-10"
        />

        {/* CTAs */}
        <motion.div
          variants={simpleTextVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
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
    </section>
  );
}

