import type { ProjectDetail } from '@/types';

// imgs["takeuforward-platform/01-hero"] → url  (all per-project subfolders in one glob)
const imgs = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>(
      '../assets/images/*/*',
      { eager: true, query: '?url', import: 'default' }
    )
  ).map(([p, src]) => {
    const parts = p.split('/');
    return [
      `${parts.at(-2)}/${parts.at(-1)!.replace(/\.[^.]+$/, '')}`,
      src,
    ];
  })
);

export const projectDetails: Record<string, ProjectDetail> = {
  scapia: {
    images: (() => {
      const s = (f: string) => imgs[`scapia/${f}`] as string | undefined;
      const carousel1 = ['04-01', '04-02', '04-03', '04-04', '04-05', '04-06', '04-07']
        .map(s).filter(Boolean) as string[];
      const carousel2 = ['06-01', '06-02', '06-03', '06-07', '06-08', '06-09', '06-10', '06-11', '06-12', '06-13', '06-14', '06-15', '06-16', '06-17']
        .map(s).filter(Boolean) as string[];
      return [
        s('01'), s('02'), s('03'),
        carousel1.length > 0 ? carousel1 : null,
        s('05'),
        carousel2.length > 0 ? carousel2 : null,
      ].filter((v): v is string | string[] =>
        Array.isArray(v) ? v.length > 0 : Boolean(v)
      );
    })(),
    collaboration: 'Scapia',
    problemDefinition: 'Building a distinct visual identity for a fintech credit card brand that needed to feel premium yet approachable to a young, travel-savvy audience.',
    industry: 'Fintech',
    services: ['Visual Creatives', 'Social Media Design'],
    website: 'https://scapia.in',
  },
  'thaat-baat': {
    images: ['01', '02', '03', '04', '05', '06'].map(f => imgs[`thaat-baat/${f}`]).filter(Boolean) as string[],
    collaboration: 'Thaat Baat',
    problemDefinition: 'Creating a warm, culturally rich brand identity for an Indian food brand that celebrates heritage while feeling contemporary.',
    industry: 'Food & Beverage',
    services: ['Logo Design', 'Branding', 'Packaging'],
    website: '',
  },
  'biopole-branding': {
    images: [
      ...['01', '02'].map(f => imgs[`biopole-branding/${f}`]).filter(Boolean) as string[],
      ['03', '04', '05', '06'].map(f => imgs[`biopole-branding/${f}`]).filter(Boolean) as string[],
    ],
    collaboration: 'Biopole',
    problemDefinition: 'Designing marketing visuals for a sustainable brand that needed to communicate science-backed credibility alongside its eco-first mission.',
    industry: 'Sustainable / Health',
    services: ['Marketing Visuals', 'UX Design'],
    website: '',
  },
  'biopole-platform': {
    images: ['01', '02', '03', '04', '05', '06'].map(f => imgs[`biopole-platform/${f}`]).filter(Boolean) as string[],
    collaboration: 'Biopole',
    problemDefinition: 'Designing an intuitive UX for a sustainable health brand that needed to balance science-backed credibility with a seamless, user-first digital experience.',
    industry: 'Sustainable / Health',
    services: ['UX Design', 'Product Design'],
    website: '',
  },
  'tle-eliminator': {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`tle-eliminator/${f}`]).filter(Boolean) as string[],
    collaboration: 'TLE Eliminator',
    problemDefinition: 'Redesigning the UI/UX of a competitive programming platform to reduce cognitive load and help students focus on what matters — solving problems.',
    industry: 'EdTech',
    services: ['UI/UX Design', 'Product Design'],
    website: '',
  },
  aica: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`aica/${f}`]).filter(Boolean) as string[],
    collaboration: 'AICA',
    problemDefinition: 'Crafting a cohesive brand identity and UI system for an AI startup that needed to project intelligence, clarity and trust from day one.',
    industry: 'Artificial Intelligence',
    services: ['Branding', 'UI/UX Design'],
    website: '',
  },
  'takeuforward-branding': {
    images: ['01', '02', '03', '04', '05', '06', '07', '08'].map(f => imgs[`takeuforward-branding/${f}`]).filter(Boolean) as string[],
    collaboration: 'takeUforward',
    problemDefinition: "Refreshing the brand identity of one of India's most-followed coding education platforms to match its scale and ambition.",
    industry: 'EdTech',
    services: ['Logo Design', 'Brand Identity'],
    website: 'https://takeuforward.org',
  },
  coreclubb: {
    images: [
      ...['01', '02', '03', '05', '07', '08', '09'].map(f => imgs[`coreclubb/${f}`]).filter(Boolean) as string[],
      ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07', '10-08']
        .map(f => imgs[`coreclubb/${f}`])
        .filter(Boolean) as string[],
    ],
    collaboration: 'coreclubb',
    problemDefinition: 'Building a full brand system and marketing visuals for a health & wellness startup that wanted to feel energetic, premium and community-first.',
    industry: 'Health & Wellness',
    services: ['Branding', 'Marketing Visuals'],
    website: '',
  },
  supermission: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`supermission/${f}`]).filter(Boolean) as string[],
    collaboration: 'Supermission',
    problemDefinition: 'Designing a Web3 product interface that makes decentralised mechanics legible and exciting without compromising on aesthetic quality.',
    industry: 'Web3 / Blockchain',
    services: ['UI/UX Design', 'Product Design'],
    website: '',
  },
  thegrowthplus: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`thegrowthplus/${f}`]).filter(Boolean) as string[],
    collaboration: 'TheGrowthPlus',
    problemDefinition: 'Designing and developing a high-converting marketing website for a growth consultancy that needed to command authority and drive action.',
    industry: 'Growth & Marketing',
    services: ['Website Design', 'Development'],
    website: '',
  },
  brocr: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`brocr/${f}`]).filter(Boolean) as string[],
    collaboration: 'BroCr',
    problemDefinition: 'Designing a mobile app that makes peer-to-peer lending simple, transparent and trustworthy for a new-age fintech audience.',
    industry: 'Fintech',
    services: ['UI/UX Design', 'App Design'],
    website: '',
  },
  zentral: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`zentral/${f}`]).filter(Boolean) as string[],
    collaboration: 'Zentral approached Pixel Pandas to design and build the digital presence for their AI-powered wealth management platform. The brief spanned the full product from their marketing website to the platform\'s UI/UX covering portfolio tracking, mortgage tools, AI-driven insights, and estate planning. Our job was to translate a technically rich product into an experience that felt premium, approachable, and trustworthy from the first click.',
    problemDefinition: 'Building a fully designed and developed website for a SaaS product that needed to convey calm control and enterprise confidence.',
    industry: 'SaaS',
    services: ['Website Design', 'Development'],
    website: '',
  },
  'takeuforward-platform': {
    images: ['00', '01', '02', '03', '04', '05', '06', '08', '07'].map(f => imgs[`takeuforward-platform/${f}`]).filter(Boolean) as string[],
    collaboration: 'takeUforward popularly known as TUF came to Pixel Pandas to reimagine the platform experience for their 18 lakh+ learners. Founded by Striver, TUF had already become the go-to destination for DSA, system design, and tech interview prep. The brief was to build a product experience worthy of that scale — one that could grow with them as they expanded across DSA, Core CS, aptitude, planning tools, and beyond.',
    problemDefinition: 'The existing design had no room to breathe. Features, content, and navigation were packed into every surface — scattered information with no visual hierarchy and no consistent language across the platform. There was no design system, no shared components, and no framework to build on.',
    industry: 'EdTech',
    services: ['UI/UX'],
    website: 'https://takeuforward.org',
  },
};
