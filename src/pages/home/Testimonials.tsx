import { motion } from 'framer-motion';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import type { Testimonial } from '@/types';
import { testimonials } from '@/data/testimonials';

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.variant === 'media') {
    return (
      <div className="relative h-[460px] w-[340px] shrink-0 overflow-hidden rounded-[20px] shadow-lg">
        <img
          src={testimonial.image}
          alt={`${testimonial.name}, ${testimonial.role}`}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-black/35" />
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

export function Testimonials() {
  return (
    <section id="testimonials" data-nav-tone="light" className="section-y bg-paper">
      <div className="mx-auto flex max-w-site flex-col gap-12 pl-6 sm:pl-gutter-sm">
        <div className="flex flex-col gap-2">
          <EyebrowLabel>Testimonials</EyebrowLabel>
          <h2 className="text-display-4 font-bold leading-none text-[#1d1d1f]">What our clients say.</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex gap-6 overflow-x-auto pb-4 pr-6 [scrollbar-width:thin] sm:pr-gutter-sm"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
