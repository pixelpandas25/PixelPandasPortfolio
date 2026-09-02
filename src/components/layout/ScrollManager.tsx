import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAV_SCROLL_MARGIN = 24;

function scrollToHash(hash: string, attempt = 0) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    // offsetTop/offsetHeight reflect the navbar's resting layout position and
    // are unaffected by its auto-hide transform (unlike getBoundingClientRect,
    // which would read a translated-off-screen or mid-transition position).
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
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      scrollToHash(hash);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
