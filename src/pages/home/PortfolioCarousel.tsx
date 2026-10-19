import { useRef, useState } from 'react';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { homeShowcaseProjects } from '@/data/projects';
import arrowLeft from '@/assets/icons/arrow-left.svg';
import arrowRight from '@/assets/icons/arrow-right.svg';

const CARD_WIDTH = 563;
const GAP = 24;
const totalPages = homeShowcaseProjects.length;

export function PortfolioCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const scrollByCards = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.min(Math.max(page + direction, 0), totalPages - 1);
    setPage(next);
    el.scrollTo({ left: next * (CARD_WIDTH + GAP), behavior: 'smooth' });
  };

  return (
    <section data-nav-tone="dark" className="bg-[#0a0a0b] px-6 py-[70px] sm:px-[70px]">

      {/* Header row */}
      <div className="mb-[40px] flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-[4px]">
          <p className="text-[20px] font-medium uppercase leading-normal text-[#7a7a7a]">
            Our Work
          </p>
          <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-bold leading-[1.35] tracking-[-0.03em] text-white">
            See what we built.
          </h2>
        </div>

        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scrollByCards(-1)}
            className="flex size-[32px] items-center justify-center rounded-full border border-[#333] transition-colors duration-hover hover:border-white"
          >
            <img src={arrowLeft} alt="" className="size-[14px]" />
          </button>
          <p className="text-[12px] font-medium tracking-[0.01em] text-[#888]">
            {page + 1} / {totalPages}
          </p>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => scrollByCards(1)}
            className="flex size-[32px] items-center justify-center rounded-full border border-[#333] transition-colors duration-hover hover:border-white"
          >
            <img src={arrowRight} alt="" className="size-[14px]" />
          </button>
        </div>
      </div>

      {/* Card track */}
      <div className="flex flex-col gap-[20px]">
        <div
          ref={trackRef}
          className="overflow-x-auto overflow-y-clip [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-[24px]">
            {homeShowcaseProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                captionVariant="meta"
                aspectClassName="aspect-[4/3]"
                className="w-[85vw] shrink-0 sm:w-[563px]"
              />
            ))}
          </div>
        </div>

        <p className="text-[14px] leading-[1.6] text-[#d9d9d9]">
          From early-stage startups to established names every domain, every story worth telling.
        </p>
      </div>

    </section>
  );
}
