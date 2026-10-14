import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProjectGalleryProps {
  images: (string | string[])[];
  projectName: string;
}

// Matches Figma frame "04": cards at ~75vw wide, 2 partially visible at a time.
// Vertical scroll is hijacked and drives horizontal translation through all cards.
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

  // N-1 transitions so the last card also ends up fully in view
  const steps = images.length - 1;
  const CARD_W = 75;  // vw — matches 1080/1440 Figma proportion
  const GAP_W = 1.5;  // vw — matches 91px at 1440px viewport

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${steps * (CARD_W + GAP_W)}vw`]
  );

  // Outer height = sticky section height + scroll room (80vh per card transition)
  const outerHeight = `calc(90vh + ${steps * 80}vh)`;

  return (
    <div ref={ref} data-nav-tone="light" style={{ height: outerHeight }}>
      <div className="sticky top-0 flex h-[90vh] items-center overflow-hidden bg-paper">
        <motion.div
          style={{ x }}
          className="flex h-[85vh] gap-[1.5vw] pl-6 sm:pl-[70px]"
        >
          {images.map((src, i) => (
            <div
              key={src || i}
              className="h-full flex-shrink-0 overflow-hidden rounded-[32px]"
              style={{ width: `${CARD_W}vw` }}
            >
              <img
                src={src}
                alt={`${projectName} — project visual ${indexOffset + i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </motion.div>
      </div>
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
