import { useEffect, useRef } from 'react';
import { motion, useAnimate, stagger, useReducedMotion } from 'framer-motion';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';

const cardCount = 5;
const CENTER = 2; // center card index (0-indexed in a row of 5)

/* Full fingerprint SVG path — inlined so Framer Motion can animate pathLength */
const FP_PATH =
  'M16.001 13.3315C15.2937 13.3315 14.6153 13.6125 14.1152 14.1126C13.615 14.6128 13.334 15.2911 13.334 15.9984C13.334 17.3585 13.2007 19.3453 12.9873 21.3321M18.6676 17.492C18.6676 20.6656 18.6676 25.9993 17.3341 29.3329M23.0547 28.0259C23.2147 27.2259 23.6281 24.959 23.7215 23.999M2.66602 15.9984C2.66602 13.1997 3.5466 10.472 5.18303 8.20167C6.81947 5.93129 9.12878 4.23334 11.7839 3.34834C14.439 2.46333 17.3052 2.43613 19.9766 3.27059C22.648 4.10506 24.9891 5.75888 26.6684 7.99779M2.66602 21.3321H2.67935M29.0683 21.3321C29.335 18.6652 29.243 14.1929 29.0683 13.3315M6.66641 25.9991C7.33314 23.999 7.99987 19.9987 7.99987 15.9984C7.99852 15.0901 8.15184 14.1883 8.45325 13.3315M11.5341 29.3327C11.8141 28.4526 12.1341 27.5726 12.2941 26.6658M12.0003 9.06446C13.2169 8.36204 14.5971 7.99236 16.0019 7.99258C17.4068 7.99281 18.7868 8.36293 20.0033 9.06574C21.2197 9.76855 22.2296 10.7793 22.9315 11.9962C23.6333 13.2132 24.0023 14.5935 24.0014 15.9983V18.6652';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const FP_DURATION = 1.65; // fingerprint draw duration (seconds)

export function Philosophy() {
  const [scope, animate] = useAnimate();
  const hasAnimated = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = scope.current as Element | null;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        obs.disconnect();

        // Reduced-motion: snap everything to final state instantly
        if (prefersReducedMotion) {
          animate('[data-ph="eyebrow"]',  { opacity: 1, y: 0 }, { duration: 0 });
          animate('[data-ph="text"]',     { opacity: 1, y: 0 }, { duration: 0 });
          animate('[data-ph="card"]',     { opacity: 1, y: 0 }, { duration: 0 });
          animate('.fp-path', { pathLength: 1 }, { duration: 0 });
          animate('[data-ph="bottom"]',   { opacity: 1, y: 0 }, { duration: 0 });
          return;
        }

        // Full sequence
        (async () => {
          // 1. Eyebrow fades in
          animate('[data-ph="eyebrow"]', { opacity: 1, y: 0 }, { duration: 0.4, ease: EASE_OUT });

          // 2. Heading + description slides up
          await animate('[data-ph="text"]', { opacity: 1, y: 0 }, {
            duration: 0.65,
            delay: 0.1,
            ease: EASE_OUT,
          });

          // 3. All 5 cards stagger up
          await animate('[data-ph="card"]', { opacity: 1, y: 0 }, {
            duration: 0.45,
            delay: stagger(0.08),
            ease: EASE_OUT,
          });

          // 4. Fingerprint registration:
          //    scan line sweeps top→bottom at the same time the path draws in
          animate('[data-ph="scanline"]', {
            y: ['-110%', '55%', '225%'],   // sweeps through the card
            opacity: [0, 0.9, 0],          // fades in, peaks, fades out
          }, {
            duration: FP_DURATION,
            ease: 'linear',
          });

          await animate('.fp-path', { pathLength: 1 }, {
            duration: FP_DURATION,
            ease: [0.4, 0, 0.2, 1], // ease that feels like a steady scan
          });

          // 5. Success glow pulse on the center card
          await animate('.fp-card', {
            boxShadow: [
              '0 0 0 0px rgba(57,211,83,0)',
              '0 0 0 10px rgba(57,211,83,0.38)',
              '0 0 0 0px rgba(57,211,83,0)',
            ],
          }, { duration: 0.95, ease: 'easeOut' });

          // 6. Bottom texts cascade in
          animate('[data-ph="bottom"]', { opacity: 1, y: 0 }, {
            duration: 0.45,
            delay: stagger(0.1),
            ease: EASE_OUT,
          });
        })();
      },
      { threshold: 0.2 },
    );

    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={scope}
      data-nav-tone="dark"
      className="section-y flex min-h-[120dvh] items-center bg-surface-dark px-6 sm:px-gutter-sm"
    >
      <div className="mx-auto flex max-w-content flex-col items-center gap-8 text-center">

        {/* ── 1. Eyebrow ───────────────────────────────────────────────── */}
        <motion.div data-ph="eyebrow" initial={{ opacity: 0, y: 12 }}>
          <EyebrowLabel tone="onDark">Our Philosophy</EyebrowLabel>
        </motion.div>

        {/* ── 2. Heading + description — text comes first ──────────────── */}
        <motion.div
          data-ph="text"
          initial={{ opacity: 0, y: 28 }}
          className="flex flex-col items-center gap-5"
        >
          <h2 className="text-display-3 font-bold leading-[1.25] text-paper">
            Your brand has
            <br />
            a fingerprint.
          </h2>
          <p className="max-w-xl text-body text-muted-onDark">
            Every great brand is unmistakably itself. We don&rsquo;t copy. We
            don&rsquo;t follow templates. We find what makes you you — and make
            it impossible to ignore.
          </p>
        </motion.div>

        {/* ── 3. Five cards — fingerprint scans in the center one ──────── */}
        <div className="flex items-center gap-3 sm:gap-4">
          {Array.from({ length: cardCount }).map((_, i) => {
            const isCenter = i === CENTER;

            return (
              <motion.div
                key={i}
                data-ph="card"
                initial={{ opacity: 0, y: 22 }}
                className={
                  isCenter
                    ? 'fp-card relative flex size-[84px] shrink-0 items-center justify-center overflow-hidden rounded-card border-[1.5px] border-accent bg-surface-card'
                    : 'size-[84px] shrink-0 rounded-card bg-surface-card'
                }
              >
                {isCenter && (
                  <>
                    {/* Green scanning gradient — sweeps top → bottom */}
                    <motion.div
                      data-ph="scanline"
                      aria-hidden
                      initial={{ y: '-110%', opacity: 0 }}
                      className="pointer-events-none absolute inset-x-0 h-[55%] bg-gradient-to-b from-transparent via-accent/35 to-transparent"
                    />

                    {/* Fingerprint path — draws in like a registration scan */}
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative z-10"
                      aria-hidden
                    >
                      <motion.path
                        className="fp-path"
                        d={FP_PATH}
                        stroke="#39D353"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                      />
                    </svg>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── 4. Bottom text chain — appears after the scan completes ──── */}
        <div className="flex flex-col items-center gap-2">
          <motion.p
            data-ph="bottom"
            initial={{ opacity: 0, y: 10 }}
            className="text-body text-muted-onDark"
          >
            Be yourself. Be unique.
          </motion.p>

          <motion.span
            data-ph="bottom"
            aria-hidden
            initial={{ opacity: 0, y: 6 }}
            className="h-6 w-px bg-[#dddddd]"
          />

          <motion.p
            data-ph="bottom"
            initial={{ opacity: 0, y: 10 }}
            className="text-body text-muted"
          >
            Don&rsquo;t copy others.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
