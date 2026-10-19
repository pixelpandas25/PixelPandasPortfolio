import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ProjectGalleryProps {
  images: (string | string[])[];
  projectName: string;
  carouselCardSize?: { w: number; h: number };
}

function CardImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-full w-full">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-[24px] bg-surface-light" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? 'eager' : 'lazy'}
        // @ts-expect-error — fetchpriority is not yet in React's type defs
        fetchpriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </div>
  );
}

function HorizontalScrollGroup({
  images,
  projectName,
  indexOffset,
  cardW = 648,
  cardH = 810,
}: {
  images: string[];
  projectName: string;
  indexOffset: number;
  cardW?: number;
  cardH?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const GAP       = 24;
  const steps     = images.length - 1;
  const SECTION_H = cardH + 200;

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -steps * (cardW + GAP)]);
  const x    = useSpring(rawX, { stiffness: 100, damping: 30, mass: 0.5 });

  const outerHeight = `calc(min(${SECTION_H}px, 95vh) + ${steps * 40}vh)`;

  return (
    <div ref={ref} data-nav-tone="light" className="mt-[100px]" style={{ height: outerHeight }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 flex items-center overflow-hidden bg-paper py-[50px]"
        style={{ height: `min(${SECTION_H}px, 95vh)` }}
      >
        <motion.div
          style={{ x, gap: `${GAP}px` }}
          className="flex flex-shrink-0 pl-6 sm:pl-[70px]"
        >
          {images.map((src, i) => (
            <div
              key={src || i}
              className="flex-shrink-0 overflow-hidden rounded-[24px]"
              style={{ width: `${cardW}px`, height: `${cardH}px` }}
            >
              <CardImage
                src={src}
                alt={`${projectName} — project visual ${indexOffset + i + 1}`}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ProjectGallery({ images, projectName, carouselCardSize }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  let firstImageSeen = false;

  return (
    <section data-nav-tone="light" className="bg-paper pb-20 sm:pb-32">
      {images.map((item, index) => {
        if (Array.isArray(item)) {
          if (item.length === 0) return null;
          return (
            <HorizontalScrollGroup
              key={index}
              images={item}
              projectName={projectName}
              indexOffset={index}
              cardW={carouselCardSize?.w}
              cardH={carouselCardSize?.h}
            />
          );
        }

        const isFirst = !firstImageSeen;
        firstImageSeen = true;

        return (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
            className="mx-auto mt-8 max-w-site px-6 sm:px-gutter-sm"
          >
            <div className="overflow-hidden rounded-card">
              <img
                src={item}
                alt={`${projectName} — project visual ${index + 1}`}
                className="w-full object-cover"
                loading={isFirst ? 'eager' : 'lazy'}
                // @ts-expect-error — fetchpriority is not yet in React's type defs
                fetchpriority={isFirst ? 'high' : 'auto'}
                decoding={isFirst ? 'sync' : 'async'}
              />
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
