import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { WorkHeader } from './work/WorkHeader';
import { ProjectGrid } from './work/ProjectGrid';
import { ClosingCta } from './work/ClosingCta';
import { workProjects } from '@/data/projects';
import type { ProjectCategory } from '@/types';

export default function Work() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [active, setActive] = useState<ProjectCategory | 'All'>(
    (categoryParam as ProjectCategory | null) ?? 'All',
  );

  const handleChange = (value: ProjectCategory | 'All') => {
    setActive(value);
    if (value === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredProjects = useMemo(
    () => (active === 'All' ? workProjects : workProjects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <>
      <Seo
        title="Our Work — PixelPandas"
        description="See what PixelPandas has built for startups and established brands across branding, UI/UX, and web design."
        path="/work"
      />
      <WorkHeader active={active} onChange={handleChange} />
      <ProjectGrid projects={filteredProjects} />
      <ClosingCta />
    </>
  );
}
