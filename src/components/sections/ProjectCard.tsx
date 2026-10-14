import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import arrowLink from '@/assets/icons/project-arrow-link.svg';

const MotionLink = motion(Link);

/** Figma default (ungrouped/un-hovered) title and meta colors for the Our Work grid. */
const GRID_TITLE_GRAY = '#3a3a3a';
const GRID_META_GRAY = '#333333';
const GRID_META_HOVER = '#000000';

interface ProjectCardProps {
  project: Project;
  aspectClassName?: string;
  className?: string;
  /**
   * 'simple' = plain label (Our Work grid). Title starts gray and switches to the
   * project's own brand color when the card is hovered; meta label darkens to black.
   * 'meta' = small uppercase tracked meta line (Home showcase). Title is always
   * brand-colored, matching that section's Figma design.
   */
  captionVariant?: 'simple' | 'meta';
}

export function ProjectCard({
  project,
  aspectClassName = 'aspect-[16/9]',
  className,
  captionVariant = 'simple',
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isGrid = captionVariant === 'simple';

  return (
    <MotionLink
      to={`/work/${project.id}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover="hover"
      className={cn('group flex flex-col items-start gap-5 overflow-hidden bg-paper', className)}
    >
      <div
        className={cn('relative w-full overflow-hidden', aspectClassName)}
        style={project.aspect ? { aspectRatio: project.aspect } : undefined}
      >
        {project.imageCrop ? (
          <motion.img
            variants={isGrid ? undefined : { hover: { scale: 1.05 } }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            src={project.image}
            alt={`${project.name} — ${project.categoryLabel}`}
            loading="lazy"
            className="absolute max-w-none"
            style={project.imageCrop}
          />
        ) : (
          <motion.img
            variants={isGrid ? undefined : { hover: { scale: 1.05 } }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            src={project.image}
            alt={`${project.name} — ${project.categoryLabel}`}
            loading="lazy"
            className="size-full object-cover"
          />
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-[11px]">
          {captionVariant === 'meta' && (
            <p className="text-caption font-medium uppercase tracking-[0.08em] text-muted-2">
              {project.categoryLabel}
            </p>
          )}
          <p
            className="text-display-5 font-bold leading-[1.1] tracking-[-0.02em] transition-colors duration-300 ease-out"
            style={{ color: isGrid ? (isHovered ? project.brandColor : GRID_TITLE_GRAY) : project.brandColor }}
          >
            {project.name}
          </p>
          {captionVariant === 'simple' && (
            <p
              className="text-nav font-medium tracking-[-0.02em] transition-colors duration-300 ease-out"
              style={{ color: isHovered ? GRID_META_HOVER : GRID_META_GRAY }}
            >
              {project.categoryLabel}
            </p>
          )}
        </div>

        <motion.span
          variants={isGrid ? undefined : { hover: { rotate: -45, backgroundColor: '#111111' } }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-surface-light"
        >
          <img src={arrowLink} alt="" aria-hidden className="size-8" />
        </motion.span>
      </div>
    </MotionLink>
  );
}
