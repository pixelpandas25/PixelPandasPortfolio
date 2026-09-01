import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollToHash(hash: string, attempt = 0) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
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
