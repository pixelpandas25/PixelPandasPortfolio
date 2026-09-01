import { useEffect, useRef, useState } from 'react';

interface UseTypewriterOptions {
  /** Only starts (and re-starts) typing while true. */
  active: boolean;
  /** Base ms delay between characters. */
  speed?: number;
  /** Extra random jitter (0..jitter ms) added per character, for a more organic feel. */
  jitter?: number;
  /** Extra pause (ms) held after characters matching this pattern. */
  pauseAfter?: RegExp;
  pauseMs?: number;
  /** ms to wait before the first character. */
  startDelay?: number;
  /** Called once per newly-revealed character — e.g. to trigger a key-click sound. */
  onChar?: (char: string) => void;
}

/**
 * Reveals `text` one character at a time. Reusable by any "typed" copy on the
 * site (typewriter paper, rotated side label, ...) instead of duplicating a
 * per-component setTimeout chain.
 */
export function useTypewriter(text: string, options: UseTypewriterOptions) {
  const { active, speed = 45, jitter = 35, pauseAfter = /[.,!?]/, pauseMs = 220, startDelay = 300 } = options;
  const [output, setOutput] = useState('');
  const done = output.length >= text.length;

  const onCharRef = useRef(options.onChar);
  onCharRef.current = options.onChar;

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let index = 0;
    setOutput('');

    const step = () => {
      if (cancelled || index >= text.length) return;
      index += 1;
      const nextChar = text[index - 1];
      setOutput(text.slice(0, index));
      if (nextChar.trim()) onCharRef.current?.(nextChar);

      if (index >= text.length) return;
      const extraPause = pauseAfter.test(nextChar) ? pauseMs : 0;
      const delay = speed + Math.random() * jitter + extraPause;
      timeoutId = setTimeout(step, delay);
    };

    timeoutId = setTimeout(step, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, text]);

  return { text: output, done };
}
