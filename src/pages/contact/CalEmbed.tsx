import Cal, { getCalApi } from '@calcom/embed-react';
import { Component, useEffect } from 'react';
import type { ReactNode } from 'react';

/* -------------------------------------------------------------------------- */
/* ERROR BOUNDARY                                                              */
/* -------------------------------------------------------------------------- */

class CalErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="flex flex-col items-center gap-4 rounded-card border border-line-light bg-surface-light px-8 py-16 text-center">
          <p className="text-body-lg font-medium text-ink-900">
            Couldn&rsquo;t load the booking widget.
          </p>
          <p className="text-body text-muted">
            Try refreshing, or reach us directly at{' '}
            <a
              href="mailto:hello@pixelpandas.in"
              className="font-medium text-ink-900 underline underline-offset-4 transition-opacity duration-hover hover:opacity-70"
            >
              hello@pixelpandas.in
            </a>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

/* -------------------------------------------------------------------------- */
/* CAL EMBED                                                                   */
/* -------------------------------------------------------------------------- */

function CalWidget() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: { light: { 'cal-brand': '#000000' }, dark: { 'cal-brand': '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <Cal
      namespace="30min"
      calLink="panda-pixel-jbb3uz/30min"
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{
        layout: 'month_view',
        useSlotsViewOnSmallScreen: 'true',
        theme: 'light',
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* EXPORT                                                                      */
/* -------------------------------------------------------------------------- */

export function CalEmbed() {
  return (
    <section id="cal-embed" data-nav-tone="light" className="bg-paper px-6 pb-20 sm:px-gutter-sm sm:pb-32">
      <div className="mx-auto max-w-content">
        <CalErrorBoundary>
          <CalWidget />
        </CalErrorBoundary>
      </div>
    </section>
  );
}
