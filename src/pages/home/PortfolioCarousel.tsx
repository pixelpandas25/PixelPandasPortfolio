import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { homeShowcaseProjects } from '@/data/projects';
import tagArrowUpRight from '@/assets/icons/tag-arrow-up-right.svg';

const CARD_WIDTH  = 563;
const GAP         = 24;
const totalPages  = homeShowcaseProjects.length;

const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
  center:              ({ x: '0%',   opacity: 1 }),
  exit:   (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
};

export function PortfolioCarousel() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const [page, setPage]     = useState(0);
  const [dir,  setDir]      = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMobileRef = useRef(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );
  useEffect(() => {
    const handle = () => { isMobileRef.current = window.innerWidth < 640; };
    window.addEventListener('resize', handle, { passive: true });
    return () => window.removeEventListener('resize', handle);
  }, []);

  const go = (nextPage: number) => {
    const wrapped = ((nextPage % totalPages) + totalPages) % totalPages;
    setDir(nextPage >= page ? 1 : -1);
    setPage(wrapped);
    const el = trackRef.current;
    if (el) el.scrollTo({ left: wrapped * (CARD_WIDTH + GAP), behavior: 'smooth' });
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      if (!isMobileRef.current) return;
      setDir(1);
      setPage((p) => (p + 1) % totalPages);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      const d = dx < 0 ? 1 : -1;
      setDir(d);
      setPage((p) => ((p + d) % totalPages + totalPages) % totalPages);
    }
    resumeTimer.current = setTimeout(() => setPaused(false), 3000);
  };

  return (
    <section
      data-nav-tone="dark"
      // Mobile: px-5 (20px) matches Figma left-[20px] title offset
      // Desktop: px-[70px] py-[70px] unchanged
      className="bg-[#0a0a0b] px-5 pt-10 pb-7 sm:px-[70px] sm:py-[70px]"
    >
      {/* ── Header ── */}
      {/* Mobile mb-6 (24px) → card starts at ~131px from section top ≈ Figma 129px */}
      <div className="mb-6 flex items-start justify-between sm:mb-[40px]">
        <div className="flex flex-col gap-[4px]">
          <p className="text-[20px] font-medium uppercase leading-normal text-[#7a7a7a]">
            Our Work
          </p>
          {/* Mobile: 32px matches Figma exactly; tracking-[-0.03em] = -0.96px at 32px ✓ */}
          <h2 className="text-[32px] font-bold leading-[1.35] tracking-[-0.03em] text-white sm:text-[clamp(2.5rem,4vw,4rem)]">
            See what we built.
          </h2>
        </div>

        {/* View more link — desktop only (Figma: text + up-right arrow, no nav arrows) */}
        <Link
          to="/work"
          className="hidden items-center gap-[2px] text-[16px] font-medium text-white transition-opacity duration-hover hover:opacity-70 sm:flex"
        >
          View more
          <img src={tagArrowUpRight} alt="" aria-hidden className="size-[20px]" />
        </Link>
      </div>

      {/* ── Mobile: animated carousel ── */}
      <div
        className="flex w-full flex-col overflow-x-hidden sm:hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Card — w-full fills section content (viewport − px-5×2 = 20px gap each side) */}
        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            <motion.div
              key={page}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                project={homeShowcaseProjects[page]}
                captionVariant="meta"
                aspectClassName="aspect-[4/3]"
                className="w-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots — mt-5 (20px) ≈ Figma gap of ~19px from card bottom to dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {homeShowcaseProjects.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to project ${i + 1}`}
              onClick={() => go(i)}
              className={`h-[7px] rounded-full bg-[#888] transition-all duration-300 ${
                i === page ? 'w-[28px] opacity-100' : 'w-[7px] opacity-40'
              }`}
            />
          ))}
        </div>

        {/* View more — Figma: full-width pill, bg white/10, py-[12px] text-[16px] */}
        {/* mt-[34px] = Figma gap from dots bottom (479+14=493) to button top (527) */}
        <Link
          to="/work"
          className="mt-[34px] flex w-full items-center justify-center rounded-full bg-white/10 px-5 py-3 text-[16px] font-medium text-white transition-colors duration-hover hover:bg-white/[0.15]"
        >
          View more
        </Link>

        {/* Caption — mt-[18px] = Figma gap from button bottom (567) to caption (585) */}
        <p className="mt-[18px] text-[12px] leading-[1.6] text-[#d9d9d9]">
          From early-stage startups to established names — every domain, every story worth telling.
        </p>
      </div>

      {/* ── Desktop: horizontal scroll ── */}
      <div className="hidden flex-col gap-[20px] sm:flex">
        <div
          ref={trackRef}
          className="sm:h-[562px] overflow-x-auto overflow-y-clip [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-[24px]">
            {homeShowcaseProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                captionVariant="meta"
                aspectClassName="aspect-[4/3]"
                className="w-[563px] shrink-0"
              />
            ))}
          </div>
        </div>

        <p className="text-[14px] leading-[1.6] text-[#d9d9d9]">
          From early-stage startups to established names — every domain, every story worth telling.
        </p>
      </div>
    </section>
  );
}
