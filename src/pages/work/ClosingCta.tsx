import {
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useInView } from '@/hooks/useInView';

const headingText = "Let’s make something worth scrolling for.";

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
      className="section-y bg-paper px-6 sm:px-gutter-sm"
    >
      <div className="mx-auto max-w-site">
        <div className="flex max-w-[1058px] flex-col items-start gap-[27px]">

          {/* SMALL TEXT */}
          <p
            className="font-bold leading-none text-[#3a3a3a]"
            style={{
              fontSize: 'clamp(2rem, 3vw + 1rem, 4rem)',
            }}
          >
            Enough scrolling.
          </p>

          {/* HEADLINE */}
          {prefersReducedMotion ? (
            <h2
              className="font-bold leading-[1.2] text-ink-black"
              style={{
                fontSize: 'clamp(2.5rem, 5vw + 1rem, 7.5rem)',
              }}
            >
              {words.map((word, wordIndex) => (
                <span
                  key={`${word}-${wordIndex}`}
                  className="inline-block whitespace-nowrap"
                >
                  {word}
                  {wordIndex < words.length - 1 && ' '}
                </span>
              ))}
            </h2>
          ) : (
            <motion.h2
              variants={headingVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-bold leading-[1.2] text-ink-black"
              style={{
                fontSize: 'clamp(2.5rem, 5vw + 1rem, 7.5rem)',
              }}
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
                      style={{
                        willChange: 'transform, opacity',
                      }}
                    >
                      {character}
                    </motion.span>
                  ))}

                  {/* Preserve the space between words */}
                  {wordIndex < words.length - 1 && (
                    <span aria-hidden="true">&nbsp;</span>
                  )}
                </span>
              ))}
            </motion.h2>
          )}

          {/* BUTTONS */}
          <div className="flex items-center gap-[18px]">
            <Button
              href="mailto:hello@pixelpandas.in"
              variant="secondary"
              size="lg"
            >
              Talk to Founder
            </Button>

            <Button
              href="mailto:hello@pixelpandas.in"
              variant="primary"
              size="lg"
            >
              Book a call
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
