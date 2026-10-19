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
      className="fixed inset-x-0 top-6 z-[70] flex justify-center px-4"
    >
      <nav
        aria-label="Primary"
        className="flex w-auto items-center gap-4 rounded-pill bg-[rgba(28,28,28,0.2)] p-[6px] backdrop-blur-md lg:w-full lg:max-w-[572px] lg:gap-8"
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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-[76px] rounded-card bg-paper p-4 shadow-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <RouterNavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-body font-medium text-ink-900 hover:bg-surface-light"
                  >
                    {link.label}
                  </RouterNavLink>
                </li>
              ))}
              <li>
                <RouterNavLink
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-pill bg-ink-black px-3 py-3 text-center text-body font-medium text-paper"
                >
                  Let&rsquo;s Talk
                </RouterNavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
