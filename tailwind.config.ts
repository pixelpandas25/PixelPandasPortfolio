import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#111111',
          soft: '#1c1c1c',
          black: '#000000',
          900: '#121212',
        },
        surface: {
          dark: '#0d0d0d',
          dark2: '#0d0d0e',
          card: '#1a1a1a',
          light: '#f5f5f5',
        },
        accent: {
          DEFAULT: '#39d353',
        },
        muted: {
          DEFAULT: '#7a7a7a',
          2: '#666666',
          3: '#9ca3af',
          4: '#d1d5db',
          onDark: '#d9d9d9',
        },
        line: {
          light: '#e5e5e5',
          dark: '#1f2937',
        },
        paper: {
          DEFAULT: '#ffffff',
          soft: '#f9fafb',
        },
      },
      fontFamily: {
        display: ['"Funnel Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // marketing display scale, matched to Figma px values
        'display-1': ['clamp(3.5rem, 4vw + 2rem, 8.75rem)', { lineHeight: '0.9', letterSpacing: '-0.06em' }], // 140px
        'display-2': ['clamp(2.75rem, 3vw + 1.5rem, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }], // 96px
        'display-3': ['clamp(2.25rem, 2.5vw + 1.25rem, 4.5rem)', { lineHeight: '1.25', letterSpacing: '-0.02em' }], // 72px
        'display-4': ['clamp(2rem, 2vw + 1.25rem, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.03125em' }], // 64px
        'display-5': ['clamp(1.75rem, 1.5vw + 1.25rem, 3rem)', { lineHeight: '1.35', letterSpacing: '0' }], // 48px
        eyebrow: ['1.25rem', { lineHeight: '1.4' }], // 20px
        'body-lg': ['1.5rem', { lineHeight: '1.35' }], // 24px
        body: ['1rem', { lineHeight: '1.6' }], // 16px
        label: ['0.9375rem', { lineHeight: '1.3' }], // 15px
        nav: ['0.875rem', { lineHeight: '1.3' }], // 14px
        caption: ['0.8125rem', { lineHeight: '1.3' }], // 13px
      },
      borderRadius: {
        card: '16px',
        squircle: '22px',
        pill: '999px',
      },
      maxWidth: {
        site: '1440px',
        content: '1300px',
      },
      spacing: {
        gutter: '80px',
        'gutter-sm': '70px',
      },
      transitionDuration: {
        hover: '150ms',
        reveal: '500ms',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        'marquee-reverse': 'marquee-reverse 34s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
