import { Button } from '@/components/ui/Button';

export function ClosingCta() {
  return (
    <section data-nav-tone="light" className="section-y bg-paper px-6 sm:px-gutter-sm">
      <div className="mx-auto max-w-site">
        <div className="flex max-w-[1058px] flex-col items-start gap-[27px]">
          <p
            className="font-bold leading-none text-[#3a3a3a]"
            style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 4rem)' }}
          >
            Enough scrolling.
          </p>
          <h2
            className="font-bold leading-[1.2] text-ink-black"
            style={{ fontSize: 'clamp(2.5rem, 5vw + 1rem, 7.5rem)' }}
          >
            Let&rsquo;s make something worth scrolling for.
          </h2>
          <div className="flex items-center gap-[18px]">
            <Button href="mailto:hello@pixelpandas.in" variant="secondary" size="lg">
              Talk to Founder
            </Button>
            <Button href="mailto:hello@pixelpandas.in" variant="primary" size="lg">
              Book a call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
