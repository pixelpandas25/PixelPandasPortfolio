import shipFast from '@/assets/images/shortcut-ship-fast.webp';
import killChaos from '@/assets/images/shortcut-kill-chaos.webp';
import speakProduct from '@/assets/images/shortcut-speak-product.webp';

const columns = [
  {
    title: 'Ship fast',
    image: shipFast,
    text: 'Minimum turnaround. We move at the speed of your roadmap instead of fighting it — first drafts in days, not weeks.',
  },
  {
    title: 'Kill the chaos',
    image: killChaos,
    text: 'You hand us the mess the half-briefs, the "make it pop", the 2am Slack. We hand back clarity. Design chaos, under Ctrl.',
  },
  {
    title: 'Speak product',
    image: speakProduct,
    text: 'Our designers come from tech backgrounds. We know your constraints before you explain them so the handoff actually ships.',
  },
];

export function Shortcuts() {
  return (
    <section data-nav-tone="light" className="section-y bg-paper px-6 sm:px-gutter-sm">
      <div
        className="relative mx-auto max-w-content overflow-hidden rounded-[32px] bg-[#121210] px-8 py-16 shadow-[0_24px_48px_rgba(0,0,0,0.15)] sm:px-20 sm:py-20"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '67px 53px',
        }}
      >
        <div className="relative flex flex-col gap-4">
          <p className="text-eyebrow font-medium uppercase text-[#b3b3b3]">Why us?</p>
          <h2 className="text-display-5 font-semibold tracking-tight text-white">Shortcuts we live by.</h2>
          <p className="text-nav text-[#b3b3b3]">three keys that explain how we work</p>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col items-start gap-6">
              <img src={col.image} alt="" aria-hidden className="h-[100px] w-auto object-contain" />
              <div className="flex flex-col gap-3">
                <p className="text-body-lg font-bold text-white">{col.title}</p>
                <p className="text-caption leading-relaxed text-[#b3b3b3]">{col.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
