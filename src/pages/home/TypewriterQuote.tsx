import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import typewriterImg from '@/assets/images/typewriter.webp';
import { Typewriter } from '@/components/ui/Typewriter';
import { useInView } from '@/hooks/useInView';
import { useTypewriterSound } from '@/hooks/useTypewriterSound';

const HEADING = "If they don't feel it,\nthey won't remember it.";
const BODY = "Design is not decoration.\nIt's the distance between forgettable and unforgettable.";
const SIDE_LABEL = 'Does good design really matter?';

export function TypewriterQuote() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.4 });
  const [headingDone, setHeadingDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const playClick = useTypewriterSound(!prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      data-nav-tone="light"
      className="section-y relative flex min-h-[100dvh] items-center overflow-hidden bg-paper px-6 sm:px-gutter-sm"
    >
      <div className="relative mx-auto w-full max-w-content">
        {/* pinned near the left page-gutter, independent of the (centered) typewriter block —
            fixed footprint so the rotated label doesn't reserve its unrotated (much wider) layout box.
            Static label — it isn't "typed", it just sits beside the machine. */}
        <div className="absolute left-0 top-1/2 hidden h-[300px] w-12 -translate-y-1/2 sm:block">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="inline-block -rotate-90 whitespace-nowrap text-body-lg font-semibold tracking-tight text-muted-4 sm:text-display-5">
              {SIDE_LABEL}
            </span>
          </div>
        </div>

        {/* outer frame: sized to the viewport, capped so it never forces the section taller */}
        <div
          className="relative mx-auto w-full"
          style={{
            aspectRatio: '682 / 780',
            width: 'min(1280px, 99vw, calc(min(125dvh, 1350px) * 782 / 1024))',
          }}
        >
          {/* photo-fit stage: matches the image's own aspect ratio and centers it inside the
              (differently-proportioned) frame above — this is what object-contain would render,
              made an explicit box so the text overlays can be positioned against the real photo
              instead of the frame's empty letterboxed margins. */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{ aspectRatio: '682 / 1024', width: 'auto', containerType: 'inline-size' }}
          >
            <img
              src={typewriterImg}
              alt="A vintage typewriter with a sheet of paper rolled in, ready to type"
              className="size-full object-contain"
            />

            <div className="absolute left-[49%] top-[19%] w-[62%] -translate-x-1/2 -translate-y-1/2 px-1 text-center">
              <Typewriter
                text={HEADING}
                active={inView}
                speed={42}
                startDelay={500}
                onChar={playClick}
                onDone={() => setHeadingDone(true)}
                className="break-words font-bold leading-[1.35] text-black"
                style={{ fontSize: '4.2cqw', letterSpacing: '-0.02em' }}
              />
            </div>

            <div className="absolute left-[49%] top-[33%] w-[62%] -translate-x-1/2 -translate-y-1/2 px-1 text-center">
              <Typewriter
                text={BODY}
                active={headingDone}
                speed={26}
                startDelay={250}
                onChar={playClick}
                className="break-words leading-[1.5] text-[#949494]"
                style={{ fontSize: '2.7cqw', letterSpacing: '-0.02em' }}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-caption text-muted sm:hidden">{SIDE_LABEL}</p>
    </section>
  );
}
