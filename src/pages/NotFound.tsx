import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div
      data-nav-tone="light"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 py-32 text-center"
    >
      <Helmet>
        <title>Page not found — PixelPandas</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <p className="text-display-2 font-bold text-ink-900">404</p>
      <p className="max-w-md text-body text-muted">
        This page escaped a little too far. Let&rsquo;s get you back to something extraordinary.
      </p>
      <Button to="/">Back home</Button>
    </div>
  );
}
