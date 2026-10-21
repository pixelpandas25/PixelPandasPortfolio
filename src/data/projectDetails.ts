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
    collaboration: 'Scapia partnered with PixelPandas for ongoing creative execution across its digital and marketing touchpoints. From social media creatives and marketing campaigns to flyers, in-app visuals, and Framer website design, we translated ideas and briefs into polished visual assets, delivering at speed and scale to support the brand\'s evolving needs.',
    industry: 'Fintech',
    services: ['Visual Creatives', 'Social Media Design'],
    website: 'https://scapia.in',
  },
  'thaat-baat': {
    images: ['01', '02', '03', '04', '05', '06'].map(f => imgs[`thaat-baat/${f}`]).filter(Boolean) as string[],
    collaboration: 'ThaatBaat partnered with PixelPandas to create a distinctive restaurant brand inspired by the vibrant culture and traditional hospitality of Rajasthan. The goal was to capture an authentic desi vibe through a memorable logo and cohesive visual identity that reflected the restaurant\'s personality. We translated this vision into branding and social media creatives, helping ThaatBaat establish a recognisable visual presence that celebrates its Rajasthani roots while appealing to modern diners.',
    industry: 'Food & Beverage',
    services: ['Logo Design', 'Branding', 'Packaging'],
    website: '',
  },
  'biopole-branding': {
    images: [
      ...['00', '01', '02', '03', '04'].map(f => imgs[`biopole-branding/${f}`]).filter(Boolean) as string[],
      ['06-01', '06-02', '06-03', '06-04', '06-05', '06-06', '06-07', '06-08', '06-09', '06-10', '06-11', '06-12', '06-13', '06-14']
        .map(f => imgs[`biopole-branding/${f}`])
        .filter(Boolean) as string[],
    ],
    collaboration: 'Biopole partnered with PixelPandas to manage the design requirements for its new venture and build a consistent visual presence across marketing, business, and event touchpoints. We worked across a wide range of creative assets, including investor presentations, brochures, social media creatives, event collateral, and print design. From national exhibitions to international events, we helped Biopole communicate its brand professionally and consistently across platforms, creating visual assets tailored to its business goals and audience.',
    industry: 'Sustainable Materials / Biotechnology',
    services: ['Visual Creatives'],
    website: 'https://biopole.in',
  },

  coreclubb: {
    images: [
      ...['01', '02', '03', '05', '07', '08', '09'].map(f => imgs[`coreclubb/${f}`]).filter(Boolean) as string[],
      ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07', '10-08']
        .map(f => imgs[`coreclubb/${f}`])
        .filter(Boolean) as string[],
    ],
    collaboration: 'CoreClubb partnered with PixelPandas to transform an early-stage vision into a cohesive brand identity for the wellness and fitness industry. Starting with just a name and a vision for the brand, we worked closely with the team to define its visual identity and bring it to life across branding, investor presentations, social media creatives, event banners, brochures, and other marketing collateral.',
    industry: 'Health & Wellness',
    services: ['Branding', 'Marketing Visuals'],
    website: '',
  },

  'biopole-platform': {
    images: ['01', '02', '03', '04', '05', '06'].map(f => imgs[`biopole-platform/${f}`]).filter(Boolean) as string[],
    collaboration: 'Biopole came to Pixel Pandas with two interconnected briefs. First, a marketing website that could represent the brand and communicate their offering to potential B2B clients. Second and more complex a full B2B platform built to manage the entire customer lifecycle: order placement and tracking, financial management, customer pipeline, and account-level visibility, all consolidated into a single operational interface.',
    problemDefinition: 'Biopole\'s existing order workflow relied heavily on email, making it difficult for customers and internal teams to maintain visibility across orders, production, payments, and invoices. With multiple stakeholders involved in the process, Biopole needed a centralized platform that could simplify order tracking, manage production projections, streamline payment and invoice workflows, and give both customers and administrators a clear view of the entire order lifecycle.',
    industry: 'Sustainable Materials / Biotechnology',
    services: ['Product UI/UX', 'B2B Platform Design', 'Website Design'],
    website: 'https://biopole.in',
  },
  'tle-eliminator': {
    carouselCardSize: { w: 960, h: 521 },
    images: [
      ...['01', '02', '03', '04'].map(f => imgs[`tle-eliminator/${f}`]).filter(Boolean) as string[],
      ['04.1-01', '04.1-02', '04.1-03', '04.1-04', '04.1-05', '04.1-06', '04.1-07']
        .map(f => imgs[`tle-eliminator/${f}`]).filter(Boolean) as string[],
      ...['05', '06'].map(f => imgs[`tle-eliminator/${f}`]).filter(Boolean) as string[],
      ['07-01', '07-02', '07-03', '07-04', '07-05', '07-06', '07-07']
        .map(f => imgs[`tle-eliminator/${f}`]).filter(Boolean) as string[],
    ],
    collaboration: 'TLE Eliminators came to Pixel Pandas with an existing platform and a growing community of competitive programmers but the product wasn\'t keeping up. They had live courses, self-paced tracks, and a motivated student base, yet the experience holding it all together was close to non-existent. We were brought in to rebuild it from the ground up: give the product a real identity, define how the platform communicates with CP students, and build a scalable foundation the team could confidently grow on.',
    problemDefinition: 'For a community of students who take precision and structure seriously (competitive programmers, by nature), an interface that felt chaotic was a direct credibility problem. There was no design system, no component logic, and no framework to build new features into. The product needed to be rebuilt not patched.',
    industry: 'EdTech / Competitive Programming',
    services: ['Product Strategy', 'UX/UI Design', 'Design System', 'Web Design'],
    website: 'https://tle-eliminators.com',
  },
  aica: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`aica/${f}`]).filter(Boolean) as string[],
    collaboration: 'AICA came to Pixel Pandas with an idea and nothing else build a fintech product that uses AI to give every user their own personalised CA. The product would help Gen Z and millennial users save smarter, invest automatically, and spend with rewards, removing the complexity of personal finance through an intelligent, conversational interface. We were involved from the very beginning product strategy to end to end.',
    problemDefinition: 'Starting from a blank page in fintech is one of the harder briefs to take on. There was no existing product, no established flows, and no brand to build from. The challenge wasn\'t just designing a good product it was first deciding what the product should be, how it should feel, what it should say, and who it should look like it was built for. Brand, strategy, and design had to move together from day one.',
    industry: 'FinTech / Personal Finance',
    services: ['Brand Identity', 'Product Strategy', 'Platform UI/UX'],
    website: 'https://meetaica.com',
  },
  'takeuforward-branding': {
    images: ['01', '02', '03', '04', '05', '06', '07', '08'].map(f => imgs[`takeuforward-branding/${f}`]).filter(Boolean) as string[],
    collaboration:
      'Raj approached us with a vision to build a brand that feels bold, futuristic, and tailored for GenZ learners. The identity had to reflect growth, clarity, and ambition, while also appealing to developers, content creators, and industry professionals who engage with the platform through YouTube, live sessions on CodeBeyond, and his roadmap content on the Striver channel.\n\n'
      + 'The branding also included multiple logo lockups, icon systems, submarks, and Instagram-friendly concepts to ensure consistency across platforms. To elevate the brand\'s visual tone, we designed a flowing, futuristic background with glowing orange highlights a nod to tech fluidity and forward motion.\n\n'
      + 'From YouTube intros to full-scale brand presence, TUF now speaks with a voice that\'s confident, clear, and compelling. It\'s more than just a logo it\'s a digital-first identity for one of India\'s most trusted learning ecosystems.',
    industry: 'EdTech',
    services: ['Logo Design', 'Brand Identity'],
    website: 'https://takeuforward.org',
  },
  supermission: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`supermission/${f}`]).filter(Boolean) as string[],
    collaboration: 'Pixel Pandas partnered with Supermission to design a digital experience for an agentic trading terminal that brings AI-powered crypto research, trading, yield discovery, and smart contract auditing into one platform. The goal was to communicate how specialized AI agents help users navigate complex crypto markets, uncover opportunities, and make more informed trading decisions.',
    problemDefinition: 'Crypto trading demands constant research, analysis, and risk assessment across multiple tools. Supermission unifies these workflows through AI agents that research tokens, trade prediction markets, discover yields, and audit smart contracts. The goal was to simplify complex capabilities into an intuitive experience that makes agentic trading accessible and understandable.',
    industry: 'AI / Crypto / Web3 / DeFi',
    services: ['Product Strategy', 'UX/UI Design', 'Design System', 'Web Design'],
    website: 'https://supermission.fun',
  },
  thegrowthplus: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`thegrowthplus/${f}`]).filter(Boolean) as string[],
    collaboration: 'The Growth Plus came to Pixel Pandas with a clear need: their existing platform wasn\'t doing justice to what they had built. Founded by Naman Deshmukh a National Award-winning creator and educator with 3M+ followers the brand had real credibility, but a website that didn\'t reflect it. We were brought in to redesign the platform into something that matched the trust, scale, and ambition of the educator behind it.',
    problemDefinition: 'The existing website failed to communicate the value of the product. Visitors largely students and aspiring professionals couldn\'t quickly understand what they were signing up for, how it would help them, or why they should trust it. Despite the founder\'s massive social proof and a community of 15,000+ learners, the website was disconnected from that credibility. Users landed on a page that looked unfinished, leaving without converting.',
    industry: 'Growth & Marketing',
    services: ['Website Design', 'Development'],
    website: '',
  },
  brocr: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`brocr/${f}`]).filter(Boolean) as string[],
    collaboration: 'Brocr is a real estate platform we built to streamline how brokers and their agents operate on the ground. The product brings together property management, lead tracking, and payment flows into a single tool giving brokers full visibility over their pipeline and giving agents a faster, simpler way to move deals forward.',
    problemDefinition: 'Real estate in India runs on relationships and phone calls most of the process is informal, fragmented, and impossible to track at scale. Brokers were managing properties across spreadsheets, leads were slipping through WhatsApp conversations, and payment flows were manual and error-prone. The challenge was designing a product for users who aren\'t used to using software for this it had to be fast to learn, hard to get wrong, and immediately useful from day one.',
    industry: 'Real Estate / PropTech',
    services: ['Product Strategy', 'Platform UI/UX'],
    website: '',
  },
  zentral: {
    images: ['01', '02', '03', '04', '05', '06', '07'].map(f => imgs[`zentral/${f}`]).filter(Boolean) as string[],
    collaboration: 'Zentral approached Pixel Pandas to design and build the digital presence for their AI-powered wealth management platform. The brief spanned the full product from their marketing website to the platform\'s UI/UX covering portfolio tracking, mortgage tools, AI-driven insights, and estate planning. Our job was to translate a technically rich product into an experience that felt premium, approachable, and trustworthy from the first click.',
    problemDefinition: 'Zentral\'s target users are financially aware adults aged 25 and above people who are starting to grow wealth and need clarity over complexity. Financial platforms tend to overwhelm by default. The challenge was designing for a user group that appreciates sophistication and data but expects interfaces that feel effortless more like a trusted advisor, less like a spreadsheet.',
    industry: 'SaaS',
    services: ['Website Design', 'Development'],
    website: '',
  },
  'takeuforward-platform': {
    images: ['00', '01', '02', '03', '04', '05', '06', '08', '07'].map(f => imgs[`takeuforward-platform/${f}`]).filter(Boolean) as string[],
    collaboration: 'takeUforward popularly known as TUF came to Pixel Pandas to reimagine the platform experience for their 18 lakh+ learners. Founded by Striver, TUF had already become the go-to destination for DSA, system design, and tech interview prep. The brief was to build a product experience worthy of that scale one that could grow with them as they expanded across DSA, Core CS, aptitude, planning tools, and beyond.',
    problemDefinition: 'takeUforward popularly known as TUF came to Pixel Pandas to reimagine the platform experience for their 18 lakh+ learners. Founded by Striver, TUF had already become the go-to destination for DSA, system design, and tech interview prep. The brief was to build a product experience worthy of that scale one that could grow with them as they expanded across DSA, Core CS, aptitude, planning tools, and beyond.',
    industry: 'EdTech',
    services: ['UI/UX'],
    website: 'https://takeuforward.org',
  },
};
