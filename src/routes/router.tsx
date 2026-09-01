import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Work = lazy(() => import('@/pages/Work'));
const Testimonials = lazy(() => import('@/pages/Testimonials'));
const ComingSoon = lazy(() => import('@/pages/ComingSoon'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={null}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <PageShell />,
    children: [
      { path: '/', element: withSuspense(<Home />) },
      { path: '/about', element: withSuspense(<About />) },
      { path: '/work', element: withSuspense(<Work />) },
      { path: '/services', element: withSuspense(<ComingSoon />) },
      { path: '/testimonials', element: withSuspense(<Testimonials />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
]);
