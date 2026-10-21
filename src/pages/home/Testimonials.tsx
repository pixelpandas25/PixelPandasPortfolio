import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import type { Testimonial } from '@/types';
import { testimonials } from '@/data/testimonials';

/* ── Video Lightbox ─────────────────────────────────────────────────────── */

function VideoModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:scale-110"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-[20px] bg-black shadow-2xl"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={testimonial.video}
          poster={testimonial.image}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="w-full"
          style={{ maxHeight: 'calc(100vh - 200px)', objectFit: 'contain' }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Testimonial Card ───────────────────────────────────────────────────── */

function TestimonialCard({
  testimonial,
  onPlay,
}: {
  testimonial: Testimonial;
  onPlay?: (t: Testimonial) => void;
}) {
  if (testimonial.variant === 'media') {
    return (
      <div
        role={testimonial.video ? 'button' : undefined}
        tabIndex={testimonial.video ? 0 : undefined}
        aria-label={testimonial.video ? `Play ${testimonial.name}'s testimonial` : undefined}
        onClick={() => testimonial.video && onPlay?.(testimonial)}
        onKeyDown={(e) => e.key === 'Enter' && testimonial.video && onPlay?.(testimonial)}
        className={`group relative h-[460px] w-[340px] shrink-0 overflow-hidden rounded-[20px] shadow-lg ${testimonial.video ? 'cursor-pointer' : ''}`}
      >
        <img
          src={testimonial.image}
          alt={`${testimonial.name}, ${testimonial.role}`}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-ink-black/35" />

        {testimonial.video && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-white/30 transition-transform duration-200 group-hover:scale-110">
              <svg className="ml-1 size-7 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-b from-black/25 to-black p-6">
          <p className="text-body-lg text-paper">{testimonial.name}</p>
          <p className="text-caption font-medium text-[#e5e5ea]">{testimonial.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[460px] w-[340px] shrink-0 flex-col justify-between rounded-[20px] bg-[#f5f5f6] p-8 shadow-[0_12px_12px_rgba(0,0,0,0.02)]">
      <div className="flex flex-1 flex-col gap-8">
        <img src={testimonial.avatar} alt="" className="size-16 rounded-full object-cover" />
        <p className="text-nav leading-[1.6] text-[#3a3a3c]">{testimonial.quote}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-body-lg font-medium text-[#1d1d1f]">{testimonial.name}</p>
        <p className="text-nav text-[#8a8a93]">{testimonial.role}</p>
      </div>
    </div>
  );
}

/* ── Mobile Carousel ────────────────────────────────────────────────────── */

const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0   }),
  center:              ({ x: '0%',   opacity: 1   }),
  exit:   (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0   }),
};

function MobileCarousel({
  items,
  onPlay,
}: {
  items: Testimonial[];
  onPlay: (t: Testimonial) => void;
}) {
  const count = items.length;
  const [idx, setIdx]       = useState(0);
  const [dir, setDir]       = useState(1);
  const [paused, setPaused] = useState(false);

  const touchStartX = useRef(0);
  // Resume auto-play 3 s after last interaction
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (next: number) => {
    const clamped = (next + count) % count;
    setDir(clamped === (idx + 1) % count ? 1 : -1);
    setIdx(clamped);
  };

  // Auto-advance every 4 s, pauses on hover / touch
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % count);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, count]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      const next = (idx + (dx < 0 ? 1 : -1) + count) % count;
      setDir(dx < 0 ? 1 : -1);
      setIdx(next);
    }
    // Resume auto-play after 3 s of inactivity
    resumeTimer.current = setTimeout(() => setPaused(false), 3000);
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Card track */}
      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout" custom={dir} initial={false}>
          <motion.div
            key={idx}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center px-6"
          >
            <TestimonialCard testimonial={items[idx]} onPlay={onPlay} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full bg-[#1d1d1f] transition-all duration-300 ${
              i === idx ? 'w-5 opacity-100' : 'w-2 opacity-20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */

export function Testimonials() {
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);

  return (
    <section id="testimonials" data-nav-tone="light" className="section-y bg-paper">
      <div className="mx-auto flex max-w-site flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-2 pl-6 sm:pl-gutter-sm">
          <EyebrowLabel>Testimonials</EyebrowLabel>
          <h2 className="text-display-4 font-bold leading-none text-[#1d1d1f]">What our clients say.</h2>
        </div>

        {/* Mobile: auto-carousel */}
        <div className="sm:hidden">
          <MobileCarousel items={testimonials} onPlay={setActiveVideo} />
        </div>

        {/* Desktop: horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden gap-6 overflow-x-auto pb-4 pl-gutter-sm pr-6 [scrollbar-width:thin] sm:flex sm:pr-gutter-sm"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onPlay={setActiveVideo}
            />
          ))}
        </motion.div>

      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal testimonial={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
