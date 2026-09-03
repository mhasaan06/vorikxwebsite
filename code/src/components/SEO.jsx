import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'VORIKX — Software & Technologies',
  description = 'VORIKX engineers digital products, custom software, and scalable web platforms. We turn your business into a high-performance digital product.',
  url = 'https://vorikx.com',
  image = '/og-image.png',
  type = 'website',
  schemaJson = null,
}) {
  const fullTitle = title.includes('VORIKX') ? title : `${title} | VORIKX`;
  const canonicalUrl = url.startsWith('http') ? url : `https://vorikx.com${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://vorikx.com${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Structured Data (JSON-LD) */}
      {schemaJson && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  );
}
