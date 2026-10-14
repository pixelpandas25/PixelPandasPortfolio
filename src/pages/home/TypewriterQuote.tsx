
import typewriterImg from '@/assets/images/typewriter.webp';
import { Typewriter } from '@/components/ui/Typewriter';
import { useInView } from '@/hooks/useInView';


const HEADING = "If they don't feel it,\nthey won't remember it.";
const BODY_LINE_1 = 'Design is not decoration.';
const BODY_LINE_2 = "It's the distance between forgettable and unforgettable.";
const SIDE_LABEL = 'Does good design really matter?';

/**
 * The photo + its two text overlays, sized entirely in cqw/% of its own box
 * so the same markup reproduces the Figma crop (image top -13.68%, height
 * 126.8% of the frame) and text anchors at any breakpoint — only the frame's
 * own width/height differ between the desktop and mobile wrappers below.
 */
function TypewriterPaper({ headingActive, onChar }: { headingActive: boolean; onChar: () => void }) {
  return (
    <div className="relative size-full overflow-hidden" style={{ containerType: 'inline-size' }}>
      <img
        src={typewriterImg}
        alt="A vintage typewriter with a sheet of paper rolled in, ready to type"
        className="absolute left-0 w-full max-w-none"
        style={{ top: '-13.68%', height: '126.8%' }}
      />

      <div className="absolute left-[52.31%] top-[12.99%] w-[52.61%] -translate-x-1/2 -translate-y-1/2 px-1 text-center">
        <Typewriter
          text={HEADING}
          active={headingActive}
          speed={46}
          jitter={60}
          startDelay={600}
          onChar={onChar}
          className="break-words font-bold leading-[1.35] text-ink"
          style={{ fontSize: '3.52cqw', letterSpacing: '-0.02em' }}
        />
      </div>

      {/* Static — present in its final position from the start, never typed
          or faded, and unaffected by the heading's typing animation. */}
      <p
        className="absolute left-[50.19%] top-[31.6%] w-[52.61%] -translate-x-1/2 -translate-y-1/2 px-1 text-center leading-[1.5] text-[#949494]"
        style={{ fontSize: '2.05cqw', letterSpacing: '-0.02em' }}
      >
        {BODY_LINE_1}
        <br />
        {BODY_LINE_2}
      </p>
    </div>
  );
}

export function TypewriterQuote() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.4 });
  const playClick = () => {};

  return (
    <section ref={sectionRef} data-nav-tone="light" className="relative overflow-hidden bg-paper">
      {/* Desktop: exact Figma 1440x760 composition, full width up to the site's max */}
      <div className="relative mx-auto hidden w-full max-w-site lg:block" style={{ aspectRatio: '1440 / 760' }}>
        <div
          className="absolute flex items-center justify-center"
          style={{ left: '3.75%', top: '4.47%', width: '7.22%', height: '90.66%' }}
        >
          <span className="-rotate-90 whitespace-nowrap text-display-5 font-semibold tracking-[-0.02em] text-muted-onDark">
            {SIDE_LABEL}
          </span>
        </div>

        <div className="absolute" style={{ left: '29.17%', top: '4.47%', width: '41.67%', height: '93.42%' }}>
          <TypewriterPaper headingActive={inView} onChar={playClick} />
        </div>
      </div>

      {/* Mobile / tablet: same composition, scaled to fit a narrower viewport */}
      <div className="mx-auto flex max-w-site flex-col items-center gap-5 px-6 py-12 sm:px-gutter-sm sm:py-16 lg:hidden">
        <div className="relative mx-auto w-full max-w-[420px]" style={{ aspectRatio: '600 / 710' }}>
          <TypewriterPaper headingActive={inView} onChar={playClick} />
        </div>
        <p className="text-center text-caption text-muted">{SIDE_LABEL}</p>
      </div>
    </section>
  );
}
