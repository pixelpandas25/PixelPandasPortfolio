import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Native IntersectionObserver-based "has this scrolled into view yet" hook.
 * Framer Motion's `whileInView` proved unreliable for scroll-triggered reveals
 * in this app, so section entrances use plain `animate` instead — this hook
 * exists for effects (like starting a typewriter) that genuinely need a
 * one-time "now visible" signal rather than a mount-time animation.
 */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.35 },
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return [ref, inView];
}
