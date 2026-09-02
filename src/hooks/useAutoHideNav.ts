import { useEffect, useRef, useState } from 'react';

const IDLE_DELAY = 2400;

export function useAutoHideNav() {
  const [visible, setVisible] = useState(true);
  const visibleRef = useRef(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTicking = useRef(false);
  const pointerTicking = useRef(false);
  const hoveringNav = useRef(false);

  useEffect(() => {
    const clearIdleTimer = () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
    };

    // Re-arms the hide countdown; a no-op while the pointer rests on the nav.
    const armIdleTimer = () => {
      clearIdleTimer();
      if (hoveringNav.current) return;
      idleTimer.current = setTimeout(() => {
        visibleRef.current = false;
        setVisible(false);
      }, IDLE_DELAY);
    };

    const show = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      armIdleTimer();
    };

    const handleScroll = () => {
      if (scrollTicking.current) return;
      scrollTicking.current = true;
      requestAnimationFrame(() => {
        show();
        scrollTicking.current = false;
      });
    };

    const handlePointerMove = () => {
      if (pointerTicking.current) return;
      pointerTicking.current = true;
      requestAnimationFrame(() => {
        show();
        pointerTicking.current = false;
      });
    };

    const handleActivity = () => show();

    const handleNavPointerEnter = () => {
      hoveringNav.current = true;
      show();
    };

    const handleNavPointerLeave = () => {
      hoveringNav.current = false;
      armIdleTimer();
    };

    const nav = document.querySelector('[data-site-nav]');

    show();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity);
    nav?.addEventListener('pointerenter', handleNavPointerEnter);
    nav?.addEventListener('pointerleave', handleNavPointerLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      nav?.removeEventListener('pointerenter', handleNavPointerEnter);
      nav?.removeEventListener('pointerleave', handleNavPointerLeave);
      clearIdleTimer();
    };
  }, []);

  return visible;
}
