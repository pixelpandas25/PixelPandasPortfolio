import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Work = lazy(() => import('@/pages/Work'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Contact = lazy(() => import('@/pages/Contact'));
const Services = lazy(() => import('@/pages/Services'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<div className="min-h-screen flex-1" />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <PageShell />,
    children: [
      { path: '/', element: withSuspense(<Home />) },
      { path: '/about', element: withSuspense(<About />) },
      { path: '/work', element: withSuspense(<Work />) },
      { path: '/work/:projectId', element: withSuspense(<ProjectDetail />) },
      { path: '/contact', element: withSuspense(<Contact />) },
      { path: '/services', element: withSuspense(<Services />) },
      // Client-side redirect only — not a server HTTP 301. /testimonials was
      // never listed in public/sitemap.xml, so no canonical URL is lost, but a
      // crawler/bot that doesn't execute JS (or ignores history.replaceState)
      // won't see this. If that matters, add a real 301 at the hosting layer
      // (e.g. Vercel `redirects`, Netlify `_redirects`) for /testimonials -> /.
      { path: '/testimonials', element: <Navigate to="/#testimonials" replace /> },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
]);
