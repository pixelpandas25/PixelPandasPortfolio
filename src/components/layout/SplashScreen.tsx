import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/images/logo.webp';

const MIN_MS   = 500;   // just enough to avoid a flash on very fast connections
const BAR_MS   = 3000;  // bar fills to 88 % over an estimated 3 s load window
const QUOTE_MS = 1800;

const quotes = [
  { text: 'Good design is good business.', author: 'Thomas Watson Jr. — IBM' },
  { text: 'Design is not just what it looks like and feels like. Design is how it works.', author: 'Steve Jobs — Apple' },
  { text: 'Design is the silent ambassador of your brand.', author: 'Paul Rand' },
  { text: 'The details are not the details. They make the design.', author: 'Charles Eames' },
  { text: 'Design creates culture. Culture shapes values. Values determine the future.', author: 'Robert L. Peters' },
  { text: 'Design is intelligence made visible.', author: 'Alina Wheeler' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { text: 'People ignore design that ignores people.', author: 'Frank Chimero' },
  { text: 'Design is thinking made visual.', author: 'Saul Bass' },
  { text: "Design is so simple. That's why it's so complicated.", author: 'Paul Rand' },
  { text: 'Every great design begins with an even better story.', author: 'Lorinda Mamo' },
  { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs — Apple' },
  { text: 'To design is to communicate clearly by whatever means you can control or master.', author: 'Milton Glaser' },
  { text: 'In design, the best ideas come from solving real human problems.', author: 'Jony Ive — Apple' },
  { text: 'Make it simple, but significant.', author: 'Don Draper' },
];

function randomStart() {
  return Math.floor(Math.random() * quotes.length);
}

export function SplashScreen() {
  const [visible,  setVisible]  = useState(true);
  const [quoteIdx, setQuoteIdx] = useState(randomStart);
  const [barDone,  setBarDone]  = useState(false);

  /* ── Dismiss: wait for both min time AND page load ─────────────────────── */
  useEffect(() => {
    let cancelled = false;

    const minDelay = new Promise<void>(resolve => setTimeout(resolve, MIN_MS));

    const pageLoad = new Promise<void>(resolve => {
      /* Already loaded (fast connection or load event already fired) */
      if (document.readyState === 'complete') { resolve(); return; }
      /* Otherwise wait, with a 30 s hard cap so we never block forever */
      const onLoad = () => resolve();
      window.addEventListener('load', onLoad, { once: true });
      setTimeout(resolve, 30_000);
    });

    Promise.all([minDelay, pageLoad]).then(() => {
      if (cancelled) return;
      setBarDone(true);           // snap bar to 100 %
      setTimeout(() => {
        if (!cancelled) setVisible(false);
      }, 350);                    // give bar 0.3 s + small buffer
    });

    return () => { cancelled = true; };
  }, []);

  /* ── Quote cycling ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % quotes.length), QUOTE_MS);
    return () => clearInterval(t);
  }, []);

  const q = quotes[quoteIdx];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper"
        >
          {/* Water-fill logo */}
          <div className="relative size-24 overflow-hidden rounded-squircle">
            <img
              src={logo}
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover"
              style={{ filter: 'grayscale(1)', opacity: 0.1 }}
            />
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 3.8, delay: 0.3, ease: [0.22, 0.1, 0.36, 1] }}
            >
              <img src={logo} alt="PixelPandas" className="size-full object-cover" />
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-[3px] bg-white/30"
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ duration: 3.8, delay: 0.3, ease: [0.22, 0.1, 0.36, 1] }}
                style={{ transform: 'translateY(-100%)' }}
              />
            </motion.div>
          </div>

          {/* Studio name */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
            className="mt-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#888]"
          >
            PixelPandas
          </motion.p>

          {/* One quote at a time */}
          <div className="mt-10 flex min-h-[88px] max-w-[360px] flex-col items-center justify-center px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <p className="text-[13px] font-normal leading-[1.65] text-[#3a3a3a]">
                  &ldquo;{q.text}&rdquo;
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[#aaa]">
                  {q.author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[#1d1d1f]"
            initial={{ width: '0%' }}
            animate={{ width: barDone ? '100%' : '88%' }}
            transition={
              barDone
                ? { duration: 0.3, ease: 'easeOut' }
                : { duration: BAR_MS / 1000, ease: 'linear' }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
