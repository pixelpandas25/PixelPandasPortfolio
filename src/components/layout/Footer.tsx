import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { footerLinks } from '@/data/navLinks';
import logo from '@/assets/images/logo.webp';
import keyboardArt from '@/assets/images/footer-keyboard.webp';
import iconX from '@/assets/icons/social-x.svg';
import iconInstagram from '@/assets/icons/social-instagram.svg';
import iconLinkedin from '@/assets/icons/social-linkedin.svg';

const socials = [
  { label: 'X (Twitter)', href: 'https://x.com/PixelPandas_in', icon: iconX },
  { label: 'Instagram', href: 'https://instagram.com/pixelpandas.in', icon: iconInstagram },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/PixelPandas', icon: iconLinkedin },
];

export function Footer() {
  return (
    <footer className="relative z-[60] overflow-hidden bg-surface-dark2 pt-16 text-paper" data-nav-tone="dark">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 100px), repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 100px)',
        }}
      />

      <div className="relative mx-auto max-w-site px-6 sm:px-gutter-sm">
        <h2 className="text-balance text-center text-display-5 font-bold uppercase">
          Every great project starts with pressing
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto mt-10 w-full max-w-[874px] overflow-hidden"
          style={{ aspectRatio: '874 / 380.907' }}
        >
          <img
            src={keyboardArt}
            alt="A keyboard with a tiny figure walking down a red-lit staircase inside the glowing Enter key"
            className="absolute max-w-none"
            style={{ left: '-24.44%', top: '-69.18%', width: '147.46%', height: '169.18%' }}
          />
        </motion.div>

        <p className="mx-auto mt-10 max-w-md text-center text-body-lg text-muted sm:max-w-none sm:whitespace-nowrap">
          We&rsquo;ll handle everything that comes after.
        </p>
      </div>

      <div className="relative mt-12 border-t border-line-dark px-gutter-sm py-5">
        <div className="mx-auto flex max-w-site flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="" className="size-11 rounded-squircle object-cover" />
            <span className="text-nav font-bold tracking-wide text-paper-soft">PixelPandas</span>
          </Link>

          <ul className="flex flex-wrap items-center justify-center gap-7 text-nav font-medium text-muted-4">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="transition-colors duration-hover hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-6">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="block size-6 opacity-90 transition-opacity duration-hover hover:opacity-100"
                >
                  <img src={social.icon} alt="" className="size-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-5 max-w-site border-t border-line-dark pt-5">
          <p className="text-center text-caption font-medium text-muted-3">
            © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
