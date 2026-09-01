import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type NavTone = 'light' | 'dark';

const SAMPLE_Y = 48;

function toneAtNavbar(): NavTone {
  const header = document.querySelector('[data-site-nav]');
  const previous = header instanceof HTMLElement ? header.style.pointerEvents : '';
  if (header instanceof HTMLElement) header.style.pointerEvents = 'none';

  const el = document.elementFromPoint(window.innerWidth / 2, SAMPLE_Y);
  const toneEl = el?.closest('[data-nav-tone]') as HTMLElement | null;

  if (header instanceof HTMLElement) header.style.pointerEvents = previous;

  return toneEl?.dataset.navTone === 'dark' ? 'dark' : 'light';
}

export function useNavTone(): NavTone {
  const { pathname } = useLocation();
  const [tone, setTone] = useState<NavTone>('light');

  useEffect(() => {
    const update = () => setTone(toneAtNavbar());
    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [pathname]);

  return tone;
}
