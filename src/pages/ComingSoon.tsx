import { useLocation } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';

const copy: Record<string, { title: string; description: string }> = {
  '/services': {
    title: 'Services',
    description: 'Our full services page is almost ready. In the meantime, take a look at the work — or let’s talk about what you need.',
  },
};

export default function ComingSoon() {
  const { pathname } = useLocation();
  const page = copy[pathname] ?? {
    title: 'Coming soon',
    description: 'This page is still in motion. Check back shortly, or jump home in the meantime.',
  };

  return (
    <div
      data-nav-tone="light"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 py-32 text-center"
    >
      <Seo
        title={`${page.title} — PixelPandas`}
        description={page.description}
        path={pathname}
      />
      <p className="text-caption font-medium uppercase tracking-wide text-muted">Coming soon</p>
      <h1 className="text-display-3 font-bold text-ink-900">{page.title}</h1>
      <p className="max-w-md text-body text-muted">{page.description}</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button to="/">Back home</Button>
        <Button to="/#contact" variant="secondary">
          Let&rsquo;s Talk
        </Button>
      </div>
    </div>
  );
}
