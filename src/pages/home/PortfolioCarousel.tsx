import { useRef, useState } from 'react';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { homeShowcaseProjects } from '@/data/projects';
import arrowLeft from '@/assets/icons/arrow-left.svg';
import arrowRight from '@/assets/icons/arrow-right.svg';

const CARD_WIDTH = 563;
const GAP = 24;
const totalPages = Math.max(1, homeShowcaseProjects.length - 1);

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
    <section data-nav-tone="dark" className="section-y bg-surface-dark">
      <div className="mx-auto max-w-site px-6 sm:px-gutter-sm">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <EyebrowLabel tone="onDark">Our Work</EyebrowLabel>
            <h2 className="mt-1 text-display-4 font-bold tracking-tight text-paper">See what we built.</h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => scrollByCards(-1)}
              className="flex size-8 items-center justify-center rounded-full border border-[#333] transition-colors duration-hover hover:border-paper"
            >
              <img src={arrowLeft} alt="" className="size-3.5" />
            </button>
            <p className="text-caption font-medium tracking-wide text-[#888]">
              {page + 1} / {totalPages}
            </p>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => scrollByCards(1)}
              className="flex size-8 items-center justify-center rounded-full border border-[#333] transition-colors duration-hover hover:border-paper"
            >
              <img src={arrowRight} alt="" className="size-3.5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {homeShowcaseProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              captionVariant="meta"
              aspectClassName="aspect-[4/3]"
              className="w-[85vw] shrink-0 snap-start p-3 sm:w-[563px]"
            />
          ))}
        </div>

        <p className="mt-5 text-body text-muted-onDark">
          From early-stage startups to established names every domain, every story worth telling.
        </p>
      </div>
    </section>
  );
}
