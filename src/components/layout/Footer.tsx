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
    <footer
      className="relative z-[60] overflow-hidden bg-surface-dark2 pt-9 text-paper sm:pt-16"
      data-nav-tone="dark"
    >
      {/* Grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 100px), repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 100px)',
        }}
      />

      <div className="relative mx-auto max-w-site px-6 sm:px-gutter-sm">
        {/* Heading */}
        <h2 className="text-balance text-center text-[13px] font-bold uppercase sm:text-display-5">
          Every great project starts with pressing
        </h2>

        {/* Keyboard art */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto mt-2 w-full max-w-[238px] overflow-hidden sm:mt-10 sm:max-w-[874px]"
          style={{ aspectRatio: '874 / 380.907' }}
        >
          <img
            src={keyboardArt}
            alt="A keyboard with a tiny figure walking down a red-lit staircase inside the glowing Enter key"
            className="absolute max-w-none"
            style={{ left: '-24.44%', top: '-69.18%', width: '147.46%', height: '169.18%' }}
          />
        </motion.div>

        {/* Subtitle */}
        <p className="mx-auto mt-2 text-center text-[12px] text-muted sm:mt-10 sm:max-w-none sm:whitespace-nowrap sm:text-body-lg">
          We&rsquo;ll handle everything that comes after.
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative mt-8 border-t border-line-dark px-6 py-2 sm:mt-12 sm:px-gutter-sm sm:py-5">
        <div className="mx-auto flex max-w-site flex-col items-center gap-6 sm:flex-row sm:justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={logo}
              alt=""
              className="size-[18px] rounded-[9px] object-cover sm:size-11 sm:rounded-squircle"
            />
            <span className="text-[21px] font-bold tracking-[0.42px] text-paper-soft sm:text-nav sm:tracking-wide">
              PixelPandas
            </span>
          </Link>

          {/* Nav links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-[12px] font-normal text-muted-4 sm:gap-7 sm:text-nav sm:font-medium">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="transition-colors duration-hover hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <ul className="flex items-center gap-[13px] sm:gap-6">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="block size-[13px] opacity-90 transition-opacity duration-hover hover:opacity-100 sm:size-6"
                >
                  <img src={social.icon} alt="" className="size-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright */}
        <div className="mx-auto mt-5 max-w-site border-t border-line-dark pt-2 sm:pt-5">
          <p className="text-center text-[10px] font-normal text-muted-3 sm:text-caption sm:font-medium">
            © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
