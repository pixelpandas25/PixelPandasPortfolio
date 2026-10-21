import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/sections/ProjectCard';
import type { Project } from '@/types';

interface ProjectGridProps {
  projects: Project[];
}

// Figma's desktop grid isn't uniform columns — it alternates a wide card with a
// narrower one every other project (col-span-7 / col-span-5 of a 12-col track,
// summing to 12 so pairs auto-wrap into rows), repeating in a 4-item cycle.
// The narrow card's aspect ratio is the wide card's 16/9 scaled by 5/7 (its share
// of the same 12-col row), so both cards in a row render at the exact same height
// instead of each keeping its original Figma pixel aspect (768px vs 485px wide),
// which don't share that 7:5 ratio and would otherwise mismatch in height.
// Below lg, cards fall back to equal columns at a uniform aspect ratio.
const LAYOUT_PATTERN = [
  { span: 'lg:col-span-7', aspect: 'aspect-[4/3] lg:aspect-[16/9]' },
  { span: 'lg:col-span-5', aspect: 'aspect-[4/3] lg:aspect-[80/63]' },
  { span: 'lg:col-span-5', aspect: 'aspect-[4/3] lg:aspect-[80/63]' },
  { span: 'lg:col-span-7', aspect: 'aspect-[4/3] lg:aspect-[16/9]' },
];

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="mx-auto max-w-site px-6 py-8 sm:px-gutter-sm">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-8">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => {
            const { span, aspect } = LAYOUT_PATTERN[index % LAYOUT_PATTERN.length];
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={span}
              >
                <ProjectCard project={project} aspectClassName={aspect} captionVariant="simple" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {projects.length === 0 && (
        <p className="py-24 text-center text-body text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}
