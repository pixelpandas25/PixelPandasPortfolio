import {
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

const bullets = [
  { glyph: '+', label: 'Experience' },
  { glyph: '○', label: 'Consistency' },
  { glyph: '✦', label: 'Quality' },
  { glyph: '□', label: 'Dedication' },
];

const stats = [
  { value: '120+', label: 'Completed projects for growing brands' },
  { value: '96%', label: 'Client retention rate over the past 2 years' },
  { value: '1M+', label: "Users reached through websites we've designed" },
];

function AnimatedCounter({ value }: { value: string }) {
  const [ref, isInView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  const isMillion = value.includes('M');
  const isPercentage = value.includes('%');

  /*
   * Normal counters:
   * 120+ -> 0 to 120
   * 96%  -> 0 to 96
   *
   * Million counter:
   * Instead of animating 0 -> 1,000,000,
   * use a normalized 0 -> 100 value.
   *
   * This lets us display:
   * 0 -> 100K -> 200K -> ... -> 900K -> 1M+
   */
  const targetValue = isMillion
    ? 100
    : parseInt(value.replace(/[^0-9]/g, ''), 10);

  const count = useMotionValue(0);

  const springCount = useSpring(count, {
    stiffness: 45,
    damping: 18,
    mass: 1,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = springCount.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return unsubscribe;
  }, [springCount]);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayValue(targetValue);
      return;
    }
    count.set(targetValue);
  }, [isInView, prefersReducedMotion, count, targetValue]);

  let formattedValue = '';

  if (isMillion) {
    /*
     * Normalized value:
     *
     * 0   -> 0
     * 10  -> 100K
     * 20  -> 200K
     * ...
     * 90  -> 900K
     * 100 -> 1M+
     */
    if (displayValue >= 99.5) {
      formattedValue = '1M+';
    } else if (displayValue >= 10) {
      formattedValue = `${Math.round(displayValue * 10)}K`;
    } else {
      formattedValue = `${Math.round(displayValue)}`;
    }
  } else {
    formattedValue = `${Math.round(displayValue)}`;
  }

  const suffix = isMillion
    ? ''
    : isPercentage
      ? '%'
      : '+';

  return (
    <span ref={ref}>
      {formattedValue}
      {suffix}
    </span>
  );
}

export function WhyUsStats() {
  return (
    <section
      data-nav-tone="light"
      className="bg-paper px-6 pb-16 pt-10 sm:px-gutter sm:pb-[80px] sm:pt-[40px]"
    >
      <div className="mx-auto flex max-w-site flex-col gap-14 lg:flex-row lg:gap-20">
        {/* Left column */}
        <div className="flex shrink-0 flex-col gap-14 lg:w-[340px]">
          <h2 className="text-display-3 font-medium leading-[1.05] text-[#1d1d1f] lg:text-[80px]">
            Why
            <br />
            us
          </h2>

          <ul className="flex flex-col gap-4">
            {bullets.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-3"
              >
                <span className="text-body font-medium text-[#1d1d1f]">
                  {b.glyph}
                </span>

                <span className="text-label text-[#3a3a3c]">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="flex flex-1 flex-col gap-12">
          <p className="text-body-lg font-medium leading-[1.45] text-[#1d1d1f] sm:text-[26px]">
            We design and build tailored digital experiences that not only
            elevate your brand visually but also deliver measurable results
            that support long-term business growth.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="relative flex h-[300px] flex-col justify-between overflow-hidden rounded-card bg-[#f4f4f4] p-8 shadow-[0_8px_16px_rgba(0,0,0,0.02)] sm:h-[360px]"
              >
                {/* Background number */}
                <p
                  aria-hidden
                  className="absolute -top-[28px] right-0 select-none text-[70px] font-bold tracking-[0.05em] text-white opacity-60 sm:-top-[38px] sm:text-[90px]"
                >
                  {stat.value}
                </p>

                {/* Animated number */}
                <p className="relative text-display-5 font-semibold text-[#1d1d1f] sm:text-[56px]">
                  <AnimatedCounter value={stat.value} />
                </p>

                {/* Description */}
                <p className="relative text-body text-[#515154]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}