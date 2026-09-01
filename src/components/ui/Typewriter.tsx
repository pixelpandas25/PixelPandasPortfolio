import { useReducedMotion } from 'framer-motion';
import { useEffect, type CSSProperties } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  text: string;
  /** Starts typing once true (e.g. scrolled into view, or the previous line finished). */
  active: boolean;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  startDelay?: number;
  showCursor?: boolean;
  onChar?: () => void;
  onDone?: () => void;
  as?: 'p' | 'span';
}

/**
 * Character-by-character "typed on a typewriter" text reveal, reusable
 * anywhere on the site. Respects `prefers-reduced-motion` by rendering the
 * full string immediately instead of animating it.
 */
export function Typewriter({
  text,
  active,
  className,
  style,
  speed,
  startDelay,
  showCursor = true,
  onChar,
  onDone,
  as: Tag = 'p',
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const { text: typed, done: typedDone } = useTypewriter(text, {
    active: active && !prefersReducedMotion,
    speed,
    startDelay,
    onChar,
  });

  // with reduced motion, the underlying char-by-char hook never runs — the
  // full string appears (and "done" fires) as soon as this instance activates
  const done = prefersReducedMotion ? active : typedDone;

  useEffect(() => {
    if (done) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const display = prefersReducedMotion ? (active ? text : '') : typed;

  return (
    <Tag className={cn('whitespace-pre-line', className)} style={style}>
      {display}
      {showCursor && active && !done && !prefersReducedMotion && (
        <span
          aria-hidden
          className="ml-0.5 inline-block w-[0.5em] animate-pulse bg-current align-baseline"
          style={{ height: '0.9em' }}
        />
      )}
    </Tag>
  );
}
