import { useState } from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '@/data/navLinks';
import { cn } from '@/lib/utils';
import { useNavTone } from '@/hooks/useNavTone';
import { useAutoHideNav } from '@/hooks/useAutoHideNav';
import logo from '@/assets/images/logo.webp';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const tone = useNavTone();
  const autoHideVisible = useAutoHideNav();
  const visible = autoHideVisible || mobileOpen;
  const { pathname } = useLocation();
  const onDark = tone === 'dark';

  const scrollHomeToTop = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  };

  return (
    <motion.header
      data-site-nav
      initial={false}
      animate={visible ? 'visible' : 'hidden'}
      variants={{
        visible: { y: '0%', opacity: 1 },
        hidden: { y: '-150%', opacity: 0 },
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      className="fixed inset-x-0 top-6 z-[70] flex justify-center px-5"
    >
      <nav
        aria-label="Primary"
        className="flex w-full items-center gap-4 rounded-pill bg-[rgba(28,28,28,0.2)] p-[6px] backdrop-blur-md lg:max-w-[572px] lg:gap-8"
      >
        <RouterNavLink
          to="/"
          aria-label="PixelPandas home"
          onClick={scrollHomeToTop}
          className="size-11 shrink-0 overflow-hidden rounded-squircle"
        >
          <img src={logo} alt="PixelPandas logo" className="size-full object-cover" />
        </RouterNavLink>

        <ul className="hidden flex-1 items-center gap-4 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <RouterNavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'relative px-2 py-1 text-nav font-medium transition-colors duration-hover',
                    onDark ? 'text-paper after:bg-paper' : 'text-ink-900 after:bg-ink-900',
                    'after:absolute after:inset-x-2 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-hover hover:after:scale-x-100',
                    isActive && !link.to.includes('#') && 'after:scale-x-100',
                  )
                }
              >
                {link.label}
              </RouterNavLink>
            </li>
          ))}
        </ul>

        <RouterNavLink
          to="/contact"
          className="ml-auto hidden shrink-0 rounded-pill bg-paper px-5 py-3 text-nav font-medium text-ink-900 transition-colors duration-hover hover:bg-surface-light lg:inline-flex"
        >
          Let&rsquo;s Talk
        </RouterNavLink>

        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="ml-auto flex size-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full bg-paper lg:hidden"
        >
          <span
            className={cn(
              'h-0.5 w-4 bg-ink-900 transition-transform duration-hover',
              mobileOpen && 'translate-y-2 rotate-45',
            )}
          />
          <span
            className={cn('h-0.5 w-4 bg-ink-900 transition-opacity duration-hover', mobileOpen && 'opacity-0')}
          />
          <span
            className={cn(
              'h-0.5 w-4 bg-ink-900 transition-transform duration-hover',
              mobileOpen && '-translate-y-2 -rotate-45',
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[75] flex flex-col bg-black lg:hidden"
          >
            {/* Overlay header */}
            <div className="flex items-center justify-between px-6 pt-7">
              <RouterNavLink
                to="/"
                aria-label="PixelPandas home"
                onClick={() => { setMobileOpen(false); scrollHomeToTop(); }}
                className="size-11 overflow-hidden rounded-squircle"
              >
                <img src={logo} alt="PixelPandas logo" className="size-full object-cover" />
              </RouterNavLink>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex size-10 items-center justify-center"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                  <path d="M17 5L5 17M5 5l12 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <ul className="mt-[67px] flex flex-col gap-[36px] px-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <RouterNavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block px-2 py-1 text-[32px] font-medium uppercase leading-none transition-colors duration-hover',
                        isActive ? 'text-white' : 'text-[#999]',
                      )
                    }
                  >
                    {link.label}
                  </RouterNavLink>
                </motion.li>
              ))}
            </ul>

            {/* Let's Talk CTA */}
            <div className="mt-auto px-5 pb-10">
              <RouterNavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-full bg-white py-3 text-center text-[24px] font-medium text-[#1c1c1c]"
              >
                Let&rsquo;s Talk
              </RouterNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
