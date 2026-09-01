import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.pixelpandas.in';
const SITE_NAME = 'PixelPandas';
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.png`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

export function Seo({ title, description, path }: SeoProps) {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
  );
}
