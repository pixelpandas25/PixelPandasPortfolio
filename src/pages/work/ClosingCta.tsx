import {
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';

const headingText = "Let's make something worth scrolling for.";

const letterVariants: Variants = {
  hidden: (index: number) => ({
    x: 220 + (index % 5) * 18,
    y: Math.sin(index * 0.8) * 90,
    rotate: Math.sin(index * 0.7) * 12,
    opacity: 0,
  }),

  visible: {
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1,

    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const headingVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

export function ClosingCta() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.35 });
  const prefersReducedMotion = useReducedMotion();

  // Split into words so individual words can never break
  const words = headingText.split(' ');

  // Single-pass global character index per word, for the wave scatter pattern
  let globalIndex = 0;
  const wordsWithIndex = words.map((word, wordIndex) => {
    const startIndex = globalIndex;
    globalIndex += word.length + 1;
    return { word, wordIndex, startIndex };
  });

  return (
    <section
      ref={sectionRef}
      data-nav-tone="light"
      className="overflow-hidden bg-paper px-4 py-5 sm:px-gutter-sm sm:py-14"
    >
      <div className="mx-auto max-w-site">
        <div className="flex max-w-[1058px] flex-col items-start gap-5 sm:gap-[27px]">

          {/* TEXT GROUP — 8px gap between eyebrow/heading on mobile, 27px on desktop */}
          <div className="flex w-full flex-col items-start gap-2 sm:gap-[27px]">

            {/* SMALL TEXT */}
            <p className="text-[16px] font-bold leading-none text-[#3a3a3a] sm:text-[clamp(2rem,_3vw_+_1rem,_4rem)]">
              Enough scrolling.
            </p>

            {/* HEADLINE */}
            {prefersReducedMotion ? (
              <h2 className="text-[2rem] font-bold leading-[1.35] text-ink-black sm:text-[clamp(2.5rem,_5vw_+_1rem,_7.5rem)] sm:leading-[1.2]">
                {words.map((word, wordIndex) => (
                  <span
                    key={`${word}-${wordIndex}`}
                    className="inline-block whitespace-nowrap"
                  >
                    {word}
                    {wordIndex < words.length - 1 && ' '}
                  </span>
                ))}
              </h2>
            ) : (
              <motion.h2
                variants={headingVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="text-[2rem] font-bold leading-[1.35] text-ink-black sm:text-[clamp(2.5rem,_5vw_+_1rem,_7.5rem)] sm:leading-[1.2]"
                aria-label={headingText}
              >
                {wordsWithIndex.map(({ word, wordIndex, startIndex }) => (
                  <span
                    key={`${word}-${wordIndex}`}
                    className="inline-block whitespace-nowrap"
                  >
                    {Array.from(word).map((character, charIndex) => (
                      <motion.span
                        key={`${character}-${wordIndex}-${charIndex}`}
                        custom={startIndex + charIndex}
                        variants={letterVariants}
                        aria-hidden="true"
                        className="inline-block"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        {character}
                      </motion.span>
                    ))}

                    {wordIndex < words.length - 1 && (
                      <span aria-hidden="true">&nbsp;</span>
                    )}
                  </span>
                ))}
              </motion.h2>
            )}

          </div>

          {/* BUTTONS — mobile: compact pill; desktop: large pill */}
          <div className="flex items-center gap-[12px] sm:gap-[18px]">
            {/* Secondary */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="tel:+917389994443"
              className="inline-flex items-center justify-center rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-[16px] py-[12px] text-[12px] font-semibold leading-none text-[#121212] transition-colors duration-hover hover:bg-[#ebebeb] sm:rounded-pill sm:px-9 sm:py-6 sm:text-[22.5px]"
            >
              Talk to founder
            </motion.a>

            {/* Primary */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex">
              <Link
                to="/contact#cal-embed"
                className="inline-flex items-center justify-center rounded-full bg-ink-black px-[16px] py-[12px] text-[12px] font-semibold leading-none text-paper transition-colors duration-hover hover:bg-ink-soft sm:rounded-pill sm:px-9 sm:py-6 sm:text-[22.5px]"
              >
                Book a call
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
