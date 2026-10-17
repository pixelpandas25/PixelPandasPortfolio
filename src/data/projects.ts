import type { Project } from '@/types';

import scapia from '@/assets/images/project-scapia.webp';
import thaatBaat from '@/assets/images/project-thaatbaat.webp';
import biopole from '@/assets/images/project-biopole.webp';
import tle from '@/assets/images/project-tle.webp';
import aica from '@/assets/images/project-aica.webp';
import takeUforward1 from '@/assets/images/project-takeuforward1.webp';
import coreclubb from '@/assets/images/project-coreclubb.webp';
import supermission from '@/assets/images/project-supermission.webp';
import growthPlus from '@/assets/images/project-growthplus.webp';
import broCr from '@/assets/images/project-brocr.webp';
import zentral from '@/assets/images/project-zentral.webp';
import takeUforward2 from '@/assets/images/project-takeuforward2.webp';

import scapiaCarousel from '@/assets/images/project-scapia-carousel.webp';
import coreclubbCarousel from '@/assets/images/project-coreclubb-carousel.webp';
import biopoleCarousel from '@/assets/images/project-biopole-carousel.webp';
import takeUforwardCarousel from '@/assets/images/project-takeuforward-carousel.webp';
import thaatBaatCarousel from '@/assets/images/project-thaatbaat-carousel.webp';

export const workProjects: Project[] = [
  {
    id: 'scapia',
    name: 'Scapia',
    brandColor: '#f87a3a',
    category: 'Branding',
    categoryLabel: 'Visual Creatives',
    image: scapia,
  },
  {
    id: 'thaat-baat',
    name: 'Thaat Baat',
    brandColor: '#67262c',
    category: 'Branding',
    categoryLabel: 'Logo & Branding',
    image: thaatBaat,
  },
  {
    id: 'biopole',
    name: 'Biopole',
    brandColor: '#a8175d',
    category: 'Branding',
    categoryLabel: 'Marketing Visuals',
    image: biopole,
  },
  {
    id: 'tle-eliminator',
    name: 'TLE Eliminator',
    brandColor: '#1a62ec',
    category: 'UI/UX',
    categoryLabel: 'EdTech UI/UX',
    image: tle,
  },
  {
    id: 'aica',
    name: 'AICA',
    brandColor: '#4d376d',
    category: 'UI/UX',
    categoryLabel: 'Branding & UI/UX',
    image: aica,
  },
  {
    id: 'takeuforward-branding',
    name: 'takeUforward',
    brandColor: '#fb6d2b',
    category: 'Branding',
    categoryLabel: 'Logo & Branding',
    image: takeUforward1,
  },
  {
    id: 'coreclubb',
    name: 'coreclubb',
    brandColor: '#0273d5',
    category: 'Branding',
    categoryLabel: 'Branding & Marketing Visuals',
    image: coreclubb,
    // Figma zooms this card's image in slightly (142.06% height, offset -0.1% from top)
    // rather than a plain object-fit: cover of the source asset.
    imageCrop: { left: '0%', top: '0.1%', width: '100%', height: '142.06%' },
  },
  {
    id: 'supermission',
    name: 'Supermission',
    brandColor: '#111111',
    category: 'UI/UX',
    categoryLabel: 'Web3 UI/UX',
    image: supermission,
  },
  {
    id: 'thegrowthplus',
    name: 'TheGrowthPlus',
    brandColor: '#94379f',
    category: 'Website Designs',
    categoryLabel: 'Website Design & Development',
    image: growthPlus,
  },
  {
    id: 'brocr',
    name: 'BroCr',
    brandColor: '#5351dd',
    category: 'UI/UX',
    categoryLabel: 'UI/UX App',
    image: broCr,
  },
  {
    id: 'zentral',
    name: 'Zentral',
    brandColor: '#111111',
    category: 'Website Designs',
    categoryLabel: 'Website Design & Development',
    image: zentral,
  },
  {
    id: 'takeuforward-platform',
    name: 'takeuforward',
    brandColor: '#eb895b',
    category: 'UI/UX',
    categoryLabel: 'Platform Design Edtech',
    image: takeUforward2,
    // Figma zooms this card's image in (126.53% height, offset -13.26% from top).
    imageCrop: { left: '0%', top: '-13.26%', width: '100%', height: '126.53%' },
  },
  {
    id: 'biopole-uiux',
    name: 'Biopole',
    brandColor: '#a8175d',
    category: 'UI/UX',
    categoryLabel: 'UX Design',
    image: biopole,
  },
];

export const homeShowcaseProjects: Project[] = [
  {
    id: 'showcase-scapia',
    name: 'Scapia',
    brandColor: '#f87a3a',
    category: 'Branding',
    categoryLabel: '2025-TILL NOW · FINTECH · VISUAL CREATIVES',
    image: scapiaCarousel,
  },
  {
    id: 'showcase-coreclubb',
    name: 'CoreClubb',
    brandColor: '#095fef',
    category: 'Branding',
    categoryLabel: '2025 · HEALTH & WELLNESS · BRANDING',
    image: coreclubbCarousel,
    // Figma zooms into the billboard corner of the 2x2 collage source image. The zoom
    // window (844.5x422) is wider than the card that clips it (563px), so the visible
    // crop is the left 563/844.5 of that window — percentages rescaled accordingly.
    aspect: '563 / 422',
    imageCrop: { left: '-166.5%', top: '0.05%', width: '310.35%', height: '222.68%' },
  },
  {
    id: 'showcase-biopole',
    name: 'Biopole',
    brandColor: '#af377b',
    category: 'Branding',
    categoryLabel: '2025 · SUSTAINABLE · UX DESIGN & VISUAL CREATIVES',
    image: biopoleCarousel,
  },
  {
    id: 'showcase-takeuforward',
    name: 'TakeUForward',
    brandColor: '#3a3a3a',
    category: 'UI/UX',
    categoryLabel: '2024 · ED-TECH PLATFORM · UX DESIGN & REDESIGN',
    image: takeUforwardCarousel,
  },
  {
    id: 'showcase-thaatbaat',
    name: 'Thaat Baat',
    brandColor: '#3a3a3a',
    category: 'Branding',
    categoryLabel: '2024 · FOOD BRAND · BRANDING',
    image: thaatBaatCarousel,
  },
];
