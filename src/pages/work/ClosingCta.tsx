import { Button } from '@/components/ui/Button';

export function ClosingCta() {
  return (
    <section data-nav-tone="light" className="section-y bg-paper px-6 sm:px-gutter-sm">
      <div className="mx-auto flex max-w-site flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-body-lg text-muted">Enough scrolling.</p>
          <h2 className="mt-2 text-display-3 font-bold leading-[1.1] text-[#121212]">
            Let&rsquo;s make something
            <br />
            worth scrolling for.
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Button href="mailto:hello@pixelpandas.in" variant="secondary">
            Talk to Founder
          </Button>
          <Button href="mailto:hello@pixelpandas.in" variant="primary">
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
}
