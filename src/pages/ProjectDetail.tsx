import { useParams, Navigate } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { ClosingCta } from './work/ClosingCta';
import { ProjectHero } from './work/ProjectHero';
import { ProjectInfo } from './work/ProjectInfo';
import { ProjectGallery } from './work/ProjectGallery';
import { workProjects } from '@/data/projects';
import { projectDetails } from '@/data/projectDetails';

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();

  const project = workProjects.find((p) => p.id === projectId);
  const detail = projectId ? projectDetails[projectId] : undefined;

  if (!project || !detail) {
    return <Navigate to="/work" replace />;
  }

  const heroImage = detail.images[0] as string;
  const galleryImages = detail.images.slice(1);

  return (
    <>
      <Seo
        title={`${project.name} — PixelPandas`}
        description={detail.problemDefinition ?? `${project.name} — ${project.categoryLabel} by PixelPandas.`}
        path={`/work/${project.id}`}
      />
      <ProjectHero project={project} heroImage={heroImage} />
      <ProjectInfo project={project} detail={detail} />
      <ProjectGallery images={galleryImages} projectName={project.name} carouselCardSize={detail.carouselCardSize} />
      <ClosingCta />
    </>
  );
}
