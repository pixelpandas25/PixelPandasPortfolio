import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import arrowLeft from '@/assets/icons/project-arrow-link.svg';

interface ProjectHeroProps {
  project: Project;
  heroImage: string;
}

export function ProjectHero({ project, heroImage }: ProjectHeroProps) {
  return (
    <section data-nav-tone="light" className="bg-paper pt-28 sm:pt-32">
      <div className="mx-auto max-w-site px-6 sm:px-gutter-sm">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-3"
        >
          <Link
            to="/work"
            className="flex items-center gap-2 text-nav font-medium text-muted transition-colors duration-hover hover:text-ink-900"
          >
            <img
              src={arrowLeft}
              alt=""
              aria-hidden
              className="size-4 rotate-180 opacity-60"
            />
            All Projects
          </Link>
          <span className="text-nav text-muted">/</span>
          <span
            className="text-nav font-medium"
            style={{ color: project.brandColor }}
          >
            {project.name}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="overflow-hidden rounded-card"
        >
          <img
            src={heroImage}
            alt={`${project.name} — ${project.categoryLabel}`}
            className="w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </motion.div>
      </div>
    </section>
  );
}
