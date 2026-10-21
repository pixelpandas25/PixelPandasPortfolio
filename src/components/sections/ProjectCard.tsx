import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import arrowLink from '@/assets/icons/project-arrow-link.svg';
import carouselArrow from '@/assets/icons/project-carousel-arrow.svg';

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

  /* ── Home carousel (meta) variant ─────────────────────────────────────── */
  if (captionVariant === 'meta') {
    return (
      <MotionLink
        to={project.href ?? `/work/${project.id}`}
        className={cn(
          // flex flex-col is required — <a> is inline by default; without it bg-white
          // padding doesn't create the visible white frame around the image.
          'group relative flex flex-col bg-white',
          // Mobile: no rounded corners, no overflow on outer card (Figma 1445:174911)
          'pt-[7px] px-[7px] pb-[10px]',
          // Desktop: overflow-clip clips absolute arrow within card boundary (Figma 638:4838)
          'sm:pt-[12px] sm:px-[12px] sm:pb-[16px] sm:overflow-clip',
          className,
        )}
      >
        {/* Image — overflow-hidden only on image container */}
        <div
          className={cn('relative w-full overflow-hidden', aspectClassName)}
          style={project.aspect ? { aspectRatio: project.aspect } : undefined}
        >
          {project.imageCrop ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              src={project.image}
              alt={`${project.name} — ${project.categoryLabel}`}
              loading="lazy"
              className="absolute max-w-none"
              style={project.imageCrop}
            />
          ) : (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              src={project.image}
              alt={`${project.name} — ${project.categoryLabel}`}
              loading="lazy"
              className="size-full object-cover"
            />
          )}
        </div>

        {/* Card bottom: divider + meta + name */}
        {/* Mobile gap: 8px (Figma 7.81px); Desktop: 13px */}
        <div className="mt-[8px] flex flex-col gap-[10px] sm:mt-[13px] sm:gap-[16px]">
          <div className="h-px w-full bg-[#e5e5e5]" />
          {/* Mobile gap between meta & title: 7px; Desktop: 12px */}
          {/* No pr needed — title is whitespace-nowrap and card clips overflow on desktop */}
          <div className="flex flex-col gap-[7px] sm:gap-[12px]">
            <p className="whitespace-pre-wrap text-[10px] font-medium uppercase leading-normal tracking-[0.9px] text-[#888] sm:text-[12px] sm:tracking-[1.5px]">
              {project.categoryLabel}
            </p>
            <p
              className="whitespace-nowrap text-[24px] font-bold leading-[1.1] tracking-[-0.48px] sm:text-[48px] sm:tracking-[-0.96px]"
              style={{ color: project.brandColor }}
            >
              {project.name}
            </p>
          </div>
        </div>

        {/* Arrow — absolute bottom-right */}
        {/* Mobile: 36px at bottom-[15px] right-[7px] (Figma: left-[309px] top-[281px] in 352.67×332.55px card) */}
        <img
          src={carouselArrow}
          alt=""
          aria-hidden
          className="absolute bottom-[15px] right-[7px] size-[36px] sm:bottom-[16px] sm:right-[12px] sm:size-[60px]"
        />
      </MotionLink>
    );
  }

  /* ── Work grid (simple) variant ───────────────────────────────────────── */
  return (
    <MotionLink
      to={project.href ?? `/work/${project.id}`}
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
        <div className="flex flex-col items-start gap-[11px]">
          <p
            className="text-display-5 font-bold leading-[1.1] tracking-[-0.02em] transition-colors duration-300 ease-out"
            style={{ color: isHovered ? project.brandColor : GRID_TITLE_GRAY }}
          >
            {project.name}
          </p>
          <p
            className="text-nav font-medium tracking-[-0.02em] transition-colors duration-300 ease-out"
            style={{ color: isHovered ? GRID_META_HOVER : GRID_META_GRAY }}
          >
            {project.categoryLabel}
          </p>
        </div>

        <motion.span
          animate={
            isHovered
              ? { rotate: -45, backgroundColor: project.brandColor }
              : { rotate: 0, backgroundColor: '#f5f5f5' }
          }
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex size-[60px] shrink-0 items-center justify-center rounded-full"
        >
          <motion.img
            src={arrowLink}
            alt=""
            aria-hidden
            animate={{ filter: isHovered ? 'brightness(0) invert(1)' : 'brightness(1) invert(0)' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="size-8"
          />
        </motion.span>
      </div>
    </MotionLink>
  );
}
