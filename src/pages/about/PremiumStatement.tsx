import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { useRef } from 'react';

type ScrollFillLineProps = {
  children: ReactNode;
  progress: MotionValue<number>;
  className?: string;
  style?: CSSProperties;
  inactiveColor: string;
  activeColor: string;
};

function ScrollFillLine({
  children,
  progress,
  className,
  style,
  inactiveColor,
  activeColor,
}: ScrollFillLineProps) {
  const reducedMotion = useReducedMotion();

  const clipPath = useTransform(
    progress,
    [0, 1],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
  );

  if (reducedMotion) {
    return (
      <div
        className={className}
        style={{
          ...style,
          color: activeColor,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`relative ${className ?? ''}`}
      style={style}
    >
      {/* Complete dim text is always visible */}
      <div style={{ color: inactiveColor }}>
        {children}
      </div>

      {/* Bright text progressively fills over the dim text */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          color: activeColor,
          clipPath,
          willChange: 'clip-path',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function PremiumStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* ---------------------------------------------------------------------- */
  /* MAIN HEADLINE                                                          */
  /* ---------------------------------------------------------------------- */

  // Headline completes first.
  const headlineProgress = useTransform(
    scrollYProgress,
    [0, 0.42],
    [0, 1],
    { clamp: true },
  );

  /* ---------------------------------------------------------------------- */
  /* SUPPORTING TEXT                                                        */
  /* ---------------------------------------------------------------------- */

  // Supporting text begins after the headline has mostly completed.
  const supportingProgress = useTransform(
    scrollYProgress,
    [0.42, 1],
    [0, 1],
    { clamp: true },
  );

  /*
   * Figma supporting text layout:
   *
   * More time. More thinking. More craft. More care. Because great products
   * aren't created by doing just enough and your product deserves more than
   * that.
   *
   * Each line receives one-third of the supporting animation timeline.
   */

  const supportingLine1Progress = useTransform(
    supportingProgress,
    [0, 0.333],
    [0, 1],
    { clamp: true },
  );

  const supportingLine2Progress = useTransform(
    supportingProgress,
    [0.333, 0.666],
    [0, 1],
    { clamp: true },
  );

  const supportingLine3Progress = useTransform(
    supportingProgress,
    [0.666, 1],
    [0, 1],
    { clamp: true },
  );

  return (
    <section
      ref={sectionRef}
      data-nav-tone="dark"
      className="relative min-h-[180vh] bg-[#121212]"
    >
      {/* Sticky canvas */}
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-6 sm:px-gutter-sm">
        <div className="mx-auto w-full max-w-[1157px]">
          <div className="flex w-full flex-col items-start gap-6 text-left sm:gap-8">
            {/* ========================================================== */}
            {/* MAIN HEADLINE                                              */}
            {/* ========================================================== */}

            <ScrollFillLine
              progress={headlineProgress}
              inactiveColor="#3f3f3f"
              activeColor="#ffffff"
              className="text-display-4 leading-[1.5]"
            >
              <>
                Yes, we charge &ldquo;
                <span className="font-semibold">Premium</span>
                &rdquo; So we can do more
              </>
            </ScrollFillLine>

            {/* ========================================================== */}
            {/* FIGMA SUPPORTING TEXT — EXACTLY 3 LINES                    */}
            {/* ========================================================== */}

            <div
              className="
                w-full
                max-w-[1137px]
                text-body-lg
                leading-relaxed
                tracking-[-0.02em]
                sm:text-[32px]
              "
            >
              {/* LINE 1 */}
              <ScrollFillLine
                progress={supportingLine1Progress}
                inactiveColor="#3a3a3a"
                activeColor="#b3b3b3"
              >
                More time. More thinking. More craft. More care. Because great
                products
              </ScrollFillLine>

              {/* LINE 2 */}
              <ScrollFillLine
                progress={supportingLine2Progress}
                inactiveColor="#3a3a3a"
                activeColor="#b3b3b3"
              >
                aren&rsquo;t created by doing just enough and your product
                deserves more than
              </ScrollFillLine>

              {/* LINE 3 */}
              <ScrollFillLine
                progress={supportingLine3Progress}
                inactiveColor="#3a3a3a"
                activeColor="#b3b3b3"
              >
                that.
              </ScrollFillLine>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

