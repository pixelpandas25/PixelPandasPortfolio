import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/* -------------------------------------------------------------------------- */
/* BREAK THE RULES — isolated kinetic-typography prototype                     */
/*                                                                            */
/* Typography IS the experience. "ESCAPE" disassembles, then THINK / EXPLORE  */
/* / BUILD / REPEAT arrive with distinct motion, converging into the final    */
/* LESS ORDINARY. / MORE EXTRAORDINARY. before a text-wipe into a simulated    */
/* booking frame. ~4.8s. Everything is driven off a single `stage` string;    */
/* each element declares a variant per stage and `sf` carries unspecified     */
/* stages forward. Reduced motion collapses to an opacity crossfade.          */
/*                                                                            */
/* Fully self-contained: no global styles, fonts, routing, or page touched.   */
/* -------------------------------------------------------------------------- */

const ORANGE = '#f87a3a';

type Stage =
  | 'idle'
  | 'disassemble'
  | 'think'
  | 'explore'
  | 'build'
  | 'repeat'
  | 'final'
  | 'booking';

const STAGE_ORDER: Stage[] = [
  'idle',
  'disassemble',
  'think',
  'explore',
  'build',
  'repeat',
  'final',
  'booking',
];

type StageMap = Partial<Record<Stage, Record<string, unknown>>>;

/** Variants where each unspecified stage carries the previous target forward. */
function sf(map: StageMap): Variants {
  const out: Record<string, unknown> = {};
  let last: Record<string, unknown> = {};
  for (const stage of STAGE_ORDER) {
    if (map[stage]) last = map[stage] as Record<string, unknown>;
    out[stage] = last;
  }
  return out as Variants;
}

// Choreography (ms). Pace tightens through the word run, then resolves.
const TIMELINE: [Stage, number][] = [
  ['disassemble', 0],
  ['think', 620],
  ['explore', 1240],
  ['build', 1820],
  ['repeat', 2380],
  ['final', 3080],
  ['booking', 4200],
];

const TIMELINE_REDUCED: [Stage, number][] = [
  ['final', 0],
  ['booking', 700],
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Hand-authored break-apart vectors for E,S,C,A,P,E. vw/vh so it scales with
// the viewport; scaleX/scaleY give the "stretch" without losing legibility.
const LETTER_BREAK = [
  { x: '-30vw', y: '-14vh', r: -10, sx: 1.1, sy: 2.2 },
  { x: '-10vw', y: '16vh', r: 14, sx: 2.4, sy: 0.8 },
  { x: '8vw', y: '-22vh', r: -20, sx: 0.8, sy: 1.8 },
  { x: '26vw', y: '12vh', r: 12, sx: 1.9, sy: 1.1 },
  { x: '-20vw', y: '26vh', r: -16, sx: 1.3, sy: 1.6 },
  { x: '34vw', y: '-8vh', r: 20, sx: 2.0, sy: 0.9 },
];

export function BreakTheRules({
  autoPlay = false,
  showControls = true,
  onComplete,
}: {
  autoPlay?: boolean;
  showControls?: boolean;
  onComplete?: () => void;
} = {}) {
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

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
    setRunId((r) => r + 1); // remount the keyed layer → clean reset
    const timeline = reduced ? TIMELINE_REDUCED : TIMELINE;
    timeline.forEach(([next, at]) => {
      timers.current.push(window.setTimeout(() => setStage(next), at));
    });
    if (onComplete) {
      const lastAt = timeline[timeline.length - 1][1];
      timers.current.push(window.setTimeout(() => onComplete(), lastAt + (reduced ? 700 : 1000)));
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

  // Escape triggers a run from idle; mid-sequence it becomes a "skip". Never
  // hijacked while typing. Listener lives here, so it is only active while the
  // prototype is mounted.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el?.isContentEditable) {
        return;
      }

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

  const escapeLetter = (i: number): Variants =>
    sf({
      idle: { x: 0, y: 0, rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 },
      disassemble: reduced
        ? { opacity: 0, transition: { duration: 0.4 } }
        : {
            x: LETTER_BREAK[i].x,
            y: LETTER_BREAK[i].y,
            rotate: LETTER_BREAK[i].r,
            scaleX: LETTER_BREAK[i].sx,
            scaleY: LETTER_BREAK[i].sy,
            opacity: 1,
            transition: { duration: 0.85, ease: EASE, delay: i * 0.04 },
          },
      think: { opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
    });

  const think = sf({
    idle: { opacity: 0, x: reduced ? 0 : '-35vw', skewX: reduced ? 0 : -6 },
    think: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.5, ease: EASE } },
    explore: reduced
      ? { opacity: 0, transition: { duration: 0.3 } }
      : { opacity: 0, x: '10vw', transition: { duration: 0.35, ease: 'easeIn' } },
  });

  const explore = sf({
    idle: { opacity: 0, scale: reduced ? 1 : 0.25, rotate: reduced ? 0 : -4 },
    explore: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, scale: 1, rotate: -3, transition: { duration: 0.5, ease: EASE } },
    build: reduced
      ? { opacity: 0, transition: { duration: 0.3 } }
      : { opacity: 0, scale: 1.55, transition: { duration: 0.35, ease: 'easeIn' } },
  });

  const build = sf({
    idle: { opacity: 0, scale: reduced ? 1 : 2.3 },
    build: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.2, 1.3, 0.4, 1] } },
    repeat: reduced
      ? { opacity: 0, transition: { duration: 0.3 } }
      : { opacity: 0, y: '-18vh', transition: { duration: 0.35, ease: 'easeIn' } },
  });

  const repeat = sf({
    idle: { opacity: 0, clipPath: reduced ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' },
    repeat: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.5, ease: EASE } },
    final: { opacity: 0, transition: { duration: 0.3 } },
  });

  const finalLine = (delay: number): Variants =>
    sf({
      idle: reduced
        ? { opacity: 0 }
        : { opacity: 0, y: '0.5em', clipPath: 'inset(0 0 100% 0)' },
      final: reduced
        ? { opacity: 1, transition: { duration: 0.5, delay } }
        : {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            transition: { duration: 0.6, ease: EASE, delay },
          },
      booking: reduced
        ? { opacity: 0, transition: { duration: 0.3 } }
        : { opacity: 0, y: '-0.3em', transition: { duration: 0.4, ease: 'easeIn' } },
    });

  const finalBlock = sf({
    idle: { opacity: 1 },
    booking: reduced
      ? { opacity: 0, transition: { duration: 0.3 } }
      : { opacity: 0, scale: 1.06, transition: { duration: 0.55, ease: [0.6, 0, 0.4, 1] } },
  });

  const bookingLayer = sf({
    idle: reduced ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
    booking: reduced
      ? { opacity: 1, transition: { duration: 0.5 } }
      : { opacity: 1, clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.7, ease: EASE } },
  });

  const escapeLetters = 'ESCAPE'.split('');

  // Each word: text + an orange trailing period. Positioned for editorial spread.
  const words: { key: Stage; text: string; variants: Variants; className: string }[] = [
    { key: 'think', text: 'THINK', variants: think, className: 'left-[5%] top-[16%] text-left' },
    { key: 'explore', text: 'EXPLORE', variants: explore, className: 'right-[6%] top-[40%] text-right' },
    { key: 'build', text: 'BUILD', variants: build, className: 'left-[9%] top-[54%] text-left' },
    { key: 'repeat', text: 'REPEAT', variants: repeat, className: 'right-[7%] bottom-[14%] text-right' },
  ];

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-paper text-ink-black">
      <div key={runId} className="absolute inset-0">
        {/* ----------------------- "ESCAPE" (breaks apart) ----------------- */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="font-bold uppercase leading-none tracking-[-0.05em] text-ink-black"
            style={{ fontSize: 'clamp(3.5rem, 15vw, 14rem)' }}
          >
            {escapeLetters.map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                className="inline-block"
                style={{ willChange: 'transform, opacity' }}
                initial="idle"
                animate={stage}
                variants={escapeLetter(i)}
              >
                {ch}
              </motion.span>
            ))}
          </div>
        </div>

        {/* --------------------- THINK / EXPLORE / BUILD / REPEAT ---------- */}
        {words.map(({ key, text, variants, className }) => (
          <motion.div
            key={key}
            className={`pointer-events-none absolute font-bold uppercase leading-[0.85] tracking-[-0.04em] text-ink-black ${className}`}
            style={{ fontSize: 'clamp(3rem, 14vw, 12rem)', willChange: 'transform, opacity, clip-path' }}
            initial="idle"
            animate={stage}
            variants={variants}
          >
            <span className="whitespace-nowrap">
              {text}
              <span style={{ color: ORANGE }}>.</span>
            </span>
          </motion.div>
        ))}

        {/* --------------------------- FINAL MESSAGE ----------------------- */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
          initial="idle"
          animate={stage}
          variants={finalBlock}
        >
          <motion.h1
            className="overflow-hidden font-bold uppercase leading-[0.9] tracking-[-0.05em] text-ink-black"
            style={{ fontSize: 'clamp(1.5rem, 7.8vw, 6.75rem)' }}
            initial="idle"
            animate={stage}
            variants={finalLine(0)}
          >
            <span className="whitespace-nowrap">
              Less <span className="text-muted">Ordinary.</span>
            </span>
          </motion.h1>
          <motion.h1
            className="overflow-hidden font-bold uppercase leading-[0.9] tracking-[-0.05em] text-ink-black"
            style={{ fontSize: 'clamp(1.5rem, 7.8vw, 6.75rem)' }}
            initial="idle"
            animate={stage}
            variants={finalLine(0.12)}
          >
            <span className="whitespace-nowrap">
              More <span style={{ color: ORANGE }}>Extraordinary.</span>
            </span>
          </motion.h1>
        </motion.div>

        {/* --------------------- SIMULATED BOOKING STATE ------------------- */}
        <motion.div
          className={`absolute inset-0 flex items-center justify-center bg-paper px-5 ${
            isBooking ? '' : 'pointer-events-none'
          }`}
          style={{ willChange: 'clip-path, opacity' }}
          initial="idle"
          animate={stage}
          variants={bookingLayer}
        >
          <BookingPreview />
        </motion.div>
      </div>

      {/* ----------------------------- CONTROLS ------------------------- */}
      {showControls && (
        <>
          <div className="absolute left-4 top-4 z-50 select-none rounded-full border border-line-light bg-white/80 px-3 py-1 text-caption font-medium tracking-wide text-muted backdrop-blur">
            DEV PREVIEW · Break the Rules
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
        primary
          ? 'bg-ink-black text-paper hover:bg-ink-soft'
          : 'border border-line-light bg-paper text-ink-900 hover:bg-surface-light',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Simulated booking frame — static stand-in for the real Cal embed.           */
/* -------------------------------------------------------------------------- */

function BookingPreview() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const slots = ['10:00', '10:30', '11:00', '14:00', '15:30'];

  return (
    <div className="grid w-full max-w-[880px] grid-cols-1 overflow-hidden rounded-card border border-line-light bg-paper md:grid-cols-[300px_1fr]">
      <div className="flex flex-col gap-5 border-b border-line-light p-7 md:border-b-0 md:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-ink-black text-caption font-bold text-paper">
            PP
          </span>
          <span className="text-nav font-semibold text-muted">PixelPandas</span>
        </div>
        <div>
          <h2 className="text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-ink-black">
            Book a call
          </h2>
          <p className="mt-1 text-nav text-muted">30 min · intro & scoping</p>
        </div>
        <ul className="mt-1 flex flex-col gap-2 text-nav text-muted">
          <li>◷ 30 minutes</li>
          <li>◉ Google Meet</li>
          <li>⤷ Asia / Kolkata</li>
        </ul>
        <span
          className="mt-auto inline-flex w-fit items-center rounded-pill px-4 py-2 text-nav font-semibold text-paper"
          style={{ backgroundColor: ORANGE }}
        >
          Confirm booking
        </span>
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
                style={
                  active
                    ? { backgroundColor: ORANGE, color: '#fff' }
                    : available
                      ? { backgroundColor: '#f5f5f5', color: '#111' }
                      : { color: '#c7c7c7' }
                }
              >
                {d}
              </span>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {slots.map((t, i) => (
            <span
              key={t}
              className={`rounded-pill border px-4 py-2 text-nav font-medium ${
                i === 1
                  ? 'border-transparent bg-ink-black text-paper'
                  : 'border-line-light text-ink-900'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
