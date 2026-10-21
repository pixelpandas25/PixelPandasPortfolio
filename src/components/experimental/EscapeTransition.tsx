import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

import heroEscKey from '@/assets/images/hero-esc-key.webp';
import shadowArc from '@/assets/icons/hero-shadow-arc.svg';
import walkingFigure from '@/assets/icons/hero-walking-figure.svg';
import screenBroken from '@/assets/images/screenbroken.png';

/* -------------------------------------------------------------------------- */
/* ESCAPE THE ORDINARY — isolated prototype                                    */
/*                                                                            */
/* Idle = the real homepage hero (same Figma composition as Hero.tsx).        */
/* Press → break → snap → reveal → booking. On Escape the hero cuts out and    */
/* the static "broken screen" image is held, frozen (no movement), for ~5s,    */
/* then the clean message reveals and hands off to the booking frame.         */
/* Reduced motion shortens the hold. No global styles/fonts/nav/pages touched. */
/* -------------------------------------------------------------------------- */

type Stage = 'idle' | 'press' | 'crack' | 'chaos' | 'snap' | 'reveal' | 'booking';
const STAGE_ORDER: Stage[] = ['idle', 'press', 'crack', 'chaos', 'snap', 'reveal', 'booking'];
type StageMap = Partial<Record<Stage, Record<string, unknown>>>;

/** Variants where each unspecified stage carries the previous target forward. */
function sf(map: StageMap): Variants {
  const out: Record<string, unknown> = {};
  let last: Record<string, unknown> = {};
  for (const s of STAGE_ORDER) {
    if (map[s]) last = map[s] as Record<string, unknown>;
    out[s] = last;
  }
  return out as Variants;
}

// Broken image appears ~300ms after the key press and is held static for 5s.
const HOLD_MS = 5000;
const TIMELINE: [Stage, number][] = [
  ['press', 0],
  ['crack', 300],
  ['snap', 300 + HOLD_MS],
  ['reveal', 300 + HOLD_MS + 800],
  ['booking', 300 + HOLD_MS + 1800],
];
const TIMELINE_REDUCED: [Stage, number][] = [
  ['crack', 0],
  ['snap', 1600],
  ['reveal', 2100],
  ['booking', 2700],
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function EscapeTransition({
  autoPlay = false,
  showControls = true,
  onComplete,
}: {
  autoPlay?: boolean;
  showControls?: boolean;
  onComplete?: () => void;
} = {}) {
  const reduced = !!useReducedMotion();

  const [stage, setStage] = useState<Stage>('idle');
  const [runId, setRunId] = useState(0);
  const timers = useRef<number[]>([]);
  const started = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    onComplete?.();
  }, [clearTimers, onComplete]);

  const play = useCallback(() => {
    clearTimers();
    setStage('idle');
    setRunId((r) => r + 1);
    const timeline = reduced ? TIMELINE_REDUCED : TIMELINE;
    timeline.forEach(([next, at]) => {
      timers.current.push(window.setTimeout(() => setStage(next), at));
    });
    if (onComplete) {
      const lastAt = timeline[timeline.length - 1][1];
      timers.current.push(window.setTimeout(() => onComplete(), lastAt + (reduced ? 700 : 1100)));
    }
  }, [clearTimers, reduced, onComplete]);

  const skip = useCallback(() => {
    clearTimers();
    setStage('booking');
  }, [clearTimers]);

  useEffect(() => {
    if (autoPlay && !started.current) {
      started.current = true;
      play();
    }
  }, [autoPlay, play]);

  const isIdle = stage === 'idle';
  const isBooking = stage === 'booking';
  const isPlaying = !isIdle && !isBooking;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) return;

      if (autoPlay) {
        if (onComplete) {
          event.preventDefault();
          finish();
        }
        return;
      }
      if (stage !== 'idle') return;
      event.preventDefault();
      play();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stage, play, autoPlay, onComplete, finish]);

  useEffect(() => clearTimers, [clearTimers]);

  /* ----------------------------- variants ------------------------------- */

  const camera = sf({
    idle: { x: 0, y: 0 },
    press: reduced ? {} : { x: [0, -9, 8, -6, 4, 0], y: [0, 7, -5, 4, -2, 0], transition: { duration: 0.5, ease: 'easeInOut' } },
  });

  const letterVariants = sf({
    idle: { y: 0, opacity: 1 },
    press: reduced ? {} : { y: 7, transition: { duration: 0.16, ease: 'easeOut' } },
    crack: { opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } },
  });

  const keyVariants = sf({
    idle: { scale: 1, y: 0, opacity: 1 },
    press: reduced ? {} : { scale: 0.9, y: 12, transition: { duration: 0.16, ease: 'easeOut' } },
    crack: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  });

  const fadeOnCrack = sf({
    idle: { opacity: 1 },
    crack: { opacity: 0, transition: { duration: 0.2 } },
  });
  const arcVariants = sf({
    idle: { opacity: 0.7 },
    crack: { opacity: 0, transition: { duration: 0.2 } },
  });

  // The broken screen: appears fast, then held perfectly static (no transforms).
  const brokenVar = sf({
    idle: { opacity: 0 },
    crack: { opacity: 1, transition: { duration: reduced ? 0.3 : 0.1, ease: 'easeOut' } },
    snap: { opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  });

  const finalBlock = sf({
    idle: reduced ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: 'blur(6px)' },
    snap: reduced
      ? { opacity: 1, transition: { duration: 0.5 } }
      : { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_OUT } },
    booking: reduced
      ? { opacity: 0, transition: { duration: 0.4 } }
      : { opacity: 0, scale: 1.14, filter: 'blur(8px)', transition: { duration: 0.8, ease: [0.6, 0, 0.4, 1] } },
  });
  const strikeVariants = sf({
    idle: { scaleX: 0, opacity: 0 },
    reveal: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
    booking: { opacity: 0, transition: { duration: 0.3 } },
  });
  const supportVariants = sf({
    idle: { opacity: 0, y: 14 },
    reveal: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.1 } },
    booking: { opacity: 0, y: -8, transition: { duration: 0.5 } },
  });
  const bookingVariants = sf({
    idle: reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04, y: 24 },
    booking: reduced
      ? { opacity: 1, transition: { duration: 0.5 } }
      : { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
  });

  /* -------------------- hero composition (mirrors Hero.tsx) ------------- */

  const letters = 'Escape'.split('');

  const EscapeWord = (className: string, style: CSSProperties) => (
    <h1 className={className} style={style}>
      {letters.map((ch, i) => (
        <motion.span key={`${ch}-${i}`} className="inline-block" style={{ willChange: 'transform, opacity' }} initial="idle" animate={stage} variants={letterVariants}>
          {ch}
        </motion.span>
      ))}
    </h1>
  );

  const HeroKey = () => (
    <>
      <motion.img src={shadowArc} alt="" aria-hidden className="pointer-events-none absolute -left-[8%] top-[45%] w-[70%]" initial="idle" animate={stage} variants={arcVariants} />
      <div className="relative aspect-[346/306] w-full overflow-hidden">
        <img src={heroEscKey} alt="A giant Esc keyboard key, photographed at an angle" className="absolute max-w-none" style={{ left: '-78.9%', top: '-164.71%', width: '250.29%', height: '445.16%' }} />
      </div>
      <img src={walkingFigure} alt="" aria-hidden className="pointer-events-none absolute bottom-[3%] right-0 w-[24%]" />
    </>
  );

  const Tagline = (wrapperClassName: string, leadStyle: CSSProperties, wordClassName: string, wordStyle: CSSProperties) => (
    <motion.div className={wrapperClassName} initial="idle" animate={stage} variants={fadeOnCrack}>
      <p className="font-semibold text-muted" style={leadStyle}>
        from ordinary to
      </p>
      <p className={wordClassName} style={wordStyle}>
        Extraordinary
      </p>
    </motion.div>
  );

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-paper text-ink-black">
      <div key={runId} className="absolute inset-0">
        <motion.div className="absolute inset-0" initial="idle" animate={stage} variants={camera}>
          {/* ----- DESKTOP hero (Figma 1440×760 composition) ----- */}
          <div className="pointer-events-none relative mx-auto hidden h-full max-w-site items-center lg:flex">
            <div className="relative w-full" style={{ aspectRatio: '1440 / 760', containerType: 'inline-size' }}>
              {EscapeWord('absolute font-bold leading-[0.9] text-ink-black', { left: '2.64%', top: '20.66%', fontSize: '9.722cqw', letterSpacing: '-0.06em' })}
              <motion.div className="absolute" style={{ left: '39.1%', top: '26.2%', width: '26.3%', willChange: 'transform, opacity' }} initial="idle" animate={stage} variants={keyVariants}>
                <HeroKey />
              </motion.div>
              {Tagline(
                'absolute right-[4.86%] top-[79.4%] text-right',
                { fontSize: '3.333cqw', letterSpacing: '-0.02em', lineHeight: 1.1 },
                'font-bold leading-[0.95] text-ink-black',
                { fontSize: '6.667cqw', letterSpacing: '-0.04em' },
              )}
            </div>
          </div>

          {/* ----- MOBILE / TABLET hero (stacked) ----- */}
          <div className="pointer-events-none mx-auto flex h-full max-w-site flex-col items-center justify-center gap-10 px-6 text-center sm:px-gutter-sm lg:hidden">
            {EscapeWord('self-start text-display-1 font-bold leading-[0.9] tracking-tight text-ink-black', {})}
            <motion.div className="relative w-full max-w-[320px]" style={{ willChange: 'transform, opacity' }} initial="idle" animate={stage} variants={keyVariants}>
              <HeroKey />
            </motion.div>
            {Tagline(
              'self-end text-right',
              { fontSize: 'clamp(1.25rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1 },
              'text-display-2 font-bold leading-[0.95] text-ink-black',
              {},
            )}
          </div>
        </motion.div>

        {/* ----- BROKEN SCREEN (static image, held ~5s) ----- */}
        <motion.div className="pointer-events-none absolute inset-0 bg-black" initial="idle" animate={stage} variants={brokenVar}>
          <img src={screenBroken} alt="" aria-hidden className="h-full w-full object-cover" />
        </motion.div>

        {/* ----- PEAK: CLEAN MESSAGE ----- */}
        <motion.div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center" initial="idle" animate={stage} variants={finalBlock}>
          <h1 className="font-bold uppercase tracking-[-0.05em] text-ink-black" style={{ fontSize: 'clamp(2.75rem, 11vw, 9rem)', lineHeight: 0.92 }}>
            <span className="block">Escape</span>
            <span className="block">the</span>
            <span className="relative inline-block">
              Ordinary
              <motion.span className="absolute left-0 top-1/2 h-[0.08em] w-full -translate-y-1/2 rounded-full" style={{ backgroundColor: '#111111', transformOrigin: 'left center' }} initial="idle" animate={stage} variants={strikeVariants} />
            </span>
          </h1>
          <motion.p className="mt-[clamp(1.25rem,3vw,2.5rem)] font-medium text-muted" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.5rem)', letterSpacing: '-0.01em' }} initial="idle" animate={stage} variants={supportVariants}>
            Let&rsquo;s build something <span className="text-ink-black">extraordinary.</span>
          </motion.p>
        </motion.div>

        {/* ----- SIMULATED BOOKING DESTINATION ----- */}
        <motion.div className={`absolute inset-0 flex items-center justify-center bg-paper px-5 ${isBooking ? '' : 'pointer-events-none'}`} initial="idle" animate={stage} variants={bookingVariants}>
          <BookingPreview />
        </motion.div>
      </div>

      {/* ----------------------------- CONTROLS ------------------------- */}
      {showControls && (
        <>
          <div className="absolute left-4 top-4 z-50 select-none rounded-full border border-line-light bg-white/80 px-3 py-1 text-caption font-medium tracking-wide text-muted backdrop-blur">
            DEV PREVIEW · Escape the Ordinary
          </div>
          <div className="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line-light bg-white/85 px-2 py-2 shadow-sm backdrop-blur">
            <ControlButton onClick={play} disabled={isPlaying} primary>
              {isIdle ? 'Trigger (or press Esc)' : 'Playing…'}
            </ControlButton>
            <ControlButton onClick={play}>Replay</ControlButton>
            <ControlButton onClick={skip} disabled={!isPlaying}>
              Skip
            </ControlButton>
          </div>
        </>
      )}

      {!showControls && autoPlay && onComplete && (
        <button
          type="button"
          onClick={finish}
          className="absolute bottom-6 right-6 z-50 rounded-full border border-line-light bg-white/80 px-4 py-2 text-nav font-semibold text-ink-900 backdrop-blur transition-colors duration-150 hover:bg-surface-light"
        >
          Skip ›
        </button>
      )}
    </div>
  );
}

function ControlButton({
  children,
  onClick,
  disabled,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'rounded-full px-4 py-2 text-nav font-semibold leading-none transition-colors duration-150',
        'disabled:cursor-not-allowed disabled:opacity-40',
        primary ? 'bg-ink-black text-paper hover:bg-ink-soft' : 'border border-line-light bg-paper text-ink-900 hover:bg-surface-light',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

/* Simulated booking frame — static stand-in for the real Cal embed (monochrome). */
function BookingPreview() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const slots = ['10:00', '10:30', '11:00', '14:00', '15:30'];
  return (
    <div className="grid w-full max-w-[880px] grid-cols-1 overflow-hidden rounded-card border border-line-light bg-paper md:grid-cols-[300px_1fr]">
      <div className="flex flex-col gap-5 border-b border-line-light p-7 md:border-b-0 md:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-ink-black text-caption font-bold text-paper">PP</span>
          <span className="text-nav font-semibold text-muted">PixelPandas</span>
        </div>
        <div>
          <h2 className="text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-ink-black">Book a call</h2>
          <p className="mt-1 text-nav text-muted">30 min · intro & scoping</p>
        </div>
        <ul className="mt-1 flex flex-col gap-2 text-nav text-muted">
          <li>◷ 30 minutes</li>
          <li>◉ Google Meet</li>
          <li>⤷ Asia / Kolkata</li>
        </ul>
        <span className="mt-auto inline-flex w-fit items-center rounded-pill bg-ink-black px-4 py-2 text-nav font-semibold text-paper">Confirm booking</span>
      </div>
      <div className="flex flex-col gap-5 p-7">
        <div className="flex items-center justify-between">
          <span className="text-label font-semibold text-ink-black">October 2026</span>
          <span className="text-nav text-muted">‹ ›</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={`${d}-${i}`} className="py-1 text-center text-caption text-muted-3">
              {d}
            </span>
          ))}
          {days.map((d) => {
            const active = d === 22;
            const available = [8, 9, 15, 16, 22, 23, 29, 30].includes(d);
            return (
              <span
                key={d}
                className="grid aspect-square place-items-center rounded-md text-caption font-medium"
                style={active ? { backgroundColor: '#111', color: '#fff' } : available ? { backgroundColor: '#f5f5f5', color: '#111' } : { color: '#c7c7c7' }}
              >
                {d}
              </span>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {slots.map((t, i) => (
            <span key={t} className={`rounded-pill border px-4 py-2 text-nav font-medium ${i === 1 ? 'border-transparent bg-ink-black text-paper' : 'border-line-light text-ink-900'}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
