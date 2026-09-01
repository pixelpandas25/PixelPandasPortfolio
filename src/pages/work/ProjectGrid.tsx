import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/sections/ProjectCard';
import type { Project } from '@/types';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="mx-auto max-w-site px-6 py-8 sm:px-gutter-sm">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} aspectClassName="aspect-[4/3]" captionVariant="simple" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length === 0 && (
        <p className="py-24 text-center text-body text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}
