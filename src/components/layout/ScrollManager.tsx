import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const NAV_SCROLL_MARGIN = 24;

// Keyed by location.key (unique per history entry) so the same path visited
// twice each gets its own saved position.
const scrollPositions = new Map<string, number>();

function scrollToHash(hash: string, attempt = 0) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    const nav = document.querySelector('[data-site-nav]');
    const navOffset = nav instanceof HTMLElement ? nav.offsetTop + nav.offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset - NAV_SCROLL_MARGIN;
    window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: 'smooth' });
    return;
  }
  if (attempt < 30) {
    requestAnimationFrame(() => scrollToHash(hash, attempt + 1));
  }
}

export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  // Track scroll position for the current history entry continuously.
  useEffect(() => {
    scrollPositions.set(key, window.scrollY);
    const handleScroll = () => {
      scrollPositions.set(key, window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [key]);

  useLayoutEffect(() => {
    if (hash) {
      scrollToHash(hash);
      return;
    }

    if (navigationType === 'POP') {
      const savedY = scrollPositions.get(key);
      if (savedY !== undefined) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: savedY, left: 0, behavior: 'auto' });
        });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash, navigationType, key]);

  return null;
}
