import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ProjectGalleryProps {
  images: (string | string[])[];
  projectName: string;
}

function CardImage({ src, alt }: { src: string; alt: string }) {
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
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function HorizontalScrollGroup({
  images,
  projectName,
  indexOffset,
}: {
  images: string[];
  projectName: string;
  indexOffset: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const CARD_W   = 648;  // px — natural exported width
  const CARD_H   = 810;  // px — natural exported height
  const GAP      = 24;   // px between cards
  const steps    = images.length - 1;
  const SECTION_H = CARD_H + 200; // card + 100px top & bottom padding

  // Numeric transform → spring for smooth horizontal movement
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -steps * (CARD_W + GAP)]);
  const x = useSpring(rawX, { stiffness: 100, damping: 30, mass: 0.5 });

  // 40vh per step (halved from 80vh) reduces trailing white space after last card
  const outerHeight = `calc(min(${SECTION_H}px, 95vh) + ${steps * 40}vh)`;

  return (
    <div ref={ref} data-nav-tone="light" className="mt-[100px]" style={{ height: outerHeight }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 flex items-center overflow-hidden bg-paper py-[100px]"
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
              style={{ width: `${CARD_W}px`, height: `${CARD_H}px` }}
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

export function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  if (images.length === 0) return null;

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
            />
          );
        }

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
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
