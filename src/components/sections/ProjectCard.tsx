import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import arrowLink from '@/assets/icons/project-arrow-link.svg';

interface ProjectCardProps {
  project: Project;
  aspectClassName?: string;
  className?: string;
  /** 'simple' = plain label (Our Work grid). 'meta' = small uppercase tracked meta line (Home showcase). */
  captionVariant?: 'simple' | 'meta';
}

export function ProjectCard({
  project,
  aspectClassName = 'aspect-[16/9]',
  className,
  captionVariant = 'simple',
}: ProjectCardProps) {
  return (
    <motion.a
      href={project.href ?? '#'}
      whileHover="hover"
      className={cn('group flex flex-col items-start gap-5 overflow-hidden bg-paper', className)}
    >
      <div
        className={cn('relative w-full overflow-hidden', aspectClassName)}
        style={project.aspect ? { aspectRatio: project.aspect } : undefined}
      >
        {project.imageCrop ? (
          <motion.img
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            src={project.image}
            alt={`${project.name} — ${project.categoryLabel}`}
            loading="lazy"
            className="absolute max-w-none"
            style={project.imageCrop}
          />
        ) : (
          <motion.img
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            src={project.image}
            alt={`${project.name} — ${project.categoryLabel}`}
            loading="lazy"
            className="size-full object-cover"
          />
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-2.5">
          {captionVariant === 'meta' && (
            <p className="text-caption font-medium uppercase tracking-[0.08em] text-muted-2">
              {project.categoryLabel}
            </p>
          )}
          <p
            className="text-display-5 font-bold leading-[1.1] tracking-tight"
            style={{ color: project.brandColor }}
          >
            {project.name}
          </p>
          {captionVariant === 'simple' && (
            <p className="text-nav font-medium tracking-tight text-ink-black">{project.categoryLabel}</p>
          )}
        </div>

        <motion.span
          variants={{ hover: { rotate: -45, backgroundColor: '#111111' } }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-surface-light"
        >
          <img src={arrowLink} alt="" aria-hidden className="size-8" />
        </motion.span>
      </div>
    </motion.a>
  );
}
