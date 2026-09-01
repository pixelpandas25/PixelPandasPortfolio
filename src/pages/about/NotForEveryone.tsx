import windowDots from '@/assets/icons/window-dots.svg';

const notForList = [
  '"Here are five options, you pick" — with no conversation',
  'Design by committee, where nothing ever gets decided',
  'Briefs that begin and end at "make it pop"',
  'Teams looking for a vendor to boss around',
  "Projects that need weeks where we'd rather take days",
  'Anyone who wants pretty pixels over something that ships',
];

export function NotForEveryone() {
  return (
    <section data-nav-tone="light" className="section-y bg-paper px-6 sm:px-gutter-sm">
      <div className="mx-auto flex max-w-content flex-col items-center gap-5">
        <h2 className="text-center text-display-4 font-medium leading-[1.35] text-[#1d1d1f]">
          We&rsquo;re not for everyone.
        </h2>

        <div className="w-full overflow-hidden rounded-[30px] border-[1.25px] border-[#e8e3dd] bg-[#fbf9f6]/20 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <div className="flex h-[60px] items-center gap-4 border-b-[1.25px] border-[#e8e3dd] pl-5 pr-8">
            <img src={windowDots} alt="" aria-hidden className="h-[13px] w-auto" />
            <p className="text-caption font-medium text-[#7e7a75]">who-were-not.md</p>
          </div>

          <div className="flex flex-col gap-8 p-6 sm:gap-11 sm:p-12">
            <div className="flex items-center gap-2 self-start rounded-pill border border-[#d9d9d9]/50 bg-white/25 p-1">
              <span className="rounded-pill px-2.5 py-2 text-body text-muted">Who we&rsquo;re for</span>
              <span className="rounded-pill bg-black/80 px-5 py-2.5 text-body text-paper">
                Who we&rsquo;re not for
              </span>
            </div>

            <ul className="flex flex-col gap-6">
              {notForList.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="flex size-[30px] shrink-0 items-center justify-center rounded-lg bg-[#ffeae6] text-label font-bold text-[#ff7a6a]">
                    ×
                  </span>
                  <p className="text-body-lg text-[#141414]">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="max-w-2xl text-center text-body-lg text-[#8a8a93]">
          See yourself on the left? Then we&rsquo;re already aligned.{' '}
          <a href="/#contact" className="text-[#1a62ec] underline underline-offset-2">
            Reach out
          </a>
        </p>
      </div>
    </section>
  );
}
