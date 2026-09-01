const bullets = [
  { glyph: '+', label: 'Experience' },
  { glyph: '○', label: 'Consistency' },
  { glyph: '✦', label: 'Quality' },
  { glyph: '□', label: 'Dedication' },
];

const stats = [
  { value: '120+', label: 'Completed projects for growing brands' },
  { value: '96%', label: 'Client retention rate over the past 2 years' },
  { value: '1M+', label: "Users reached through websites we've designed" },
];

export function WhyUsStats() {
  return (
    <section data-nav-tone="light" className="bg-paper px-6 pb-16 pt-10 sm:px-gutter sm:pb-[80px] sm:pt-[40px]">
      <div className="mx-auto flex max-w-site flex-col gap-14 lg:flex-row lg:gap-20">
        <div className="flex shrink-0 flex-col gap-14 lg:w-[340px]">
          <h2 className="text-display-3 font-medium leading-[1.05] text-[#1d1d1f] lg:text-[80px]">
            Why
            <br />
            us
          </h2>
          <ul className="flex flex-col gap-4">
            {bullets.map((b) => (
              <li key={b.label} className="flex items-center gap-3">
                <span className="text-body font-medium text-[#1d1d1f]">{b.glyph}</span>
                <span className="text-label text-[#3a3a3c]">{b.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-1 flex-col gap-12">
          <p className="text-body-lg font-medium leading-[1.45] text-[#1d1d1f] sm:text-[26px]">
            We design and build tailored digital experiences that not only elevate your brand visually but also
            deliver measurable results that support long-term business growth.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="relative flex h-[300px] flex-col justify-between overflow-hidden rounded-card bg-[#f4f4f4] p-8 shadow-[0_8px_16px_rgba(0,0,0,0.02)] sm:h-[360px]"
              >
                <p
                  aria-hidden
                  className="absolute -top-[28px] right-0 select-none text-[70px] font-bold tracking-[0.05em] text-white opacity-60 sm:-top-[38px] sm:text-[90px]"
                >
                  {stat.value}
                </p>
                <p className="relative text-display-5 font-semibold text-[#1d1d1f] sm:text-[56px]">{stat.value}</p>
                <p className="relative text-body text-[#515154]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
