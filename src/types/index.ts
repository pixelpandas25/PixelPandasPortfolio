export interface NavLink {
  label: string;
  to: string;
}

export type ProjectCategory = 'Branding' | 'UI/UX' | 'Website Designs';

/**
 * Some Figma project cards show a zoomed-in crop of a larger source image
 * (e.g. CoreClubb's card is just the billboard corner of a 2x2 collage), not
 * a plain `object-fit: cover` of the whole asset. When present, ProjectCard
 * positions the image with these exact percentages instead of covering.
 */
export interface ImageCrop {
  left: string;
  top: string;
  width: string;
  height: string;
}

export interface Project {
  id: string;
  name: string;
  brandColor: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string;
  imageCrop?: ImageCrop;
  /** overrides the card's default aspect ratio, e.g. '844.5 / 422' — matches Figma when a card isn't the standard 4:3 */
  aspect?: string;
  href?: string;
}

export interface ProjectDetail {
  /** Regular images are strings. A nested string[] renders as a scroll-hijacked horizontal strip. */
  images: (string | string[])[];
  collaboration?: string;
  problemDefinition?: string;
  industry?: string;
  services?: string[];
  website?: string;
}

export interface Testimonial {
  id: string;
  quote?: string;
  name: string;
  role: string;
  avatar?: string;
  image?: string;
  variant: 'text' | 'media';
}

export interface TeamMember {
  id: string;
  name: string;
  photo: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}
