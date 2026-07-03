import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = "AeroCart - Everything You Need, Delivered Fast. Shop the best deals on electronics, fashion, and more.",
  ogTitle,
  ogDescription,
  ogImage = "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
  ogType = "website",
  canonicalUrl,
}) => {
  const siteTitle = "AeroCart";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const currentOgTitle = ogTitle || fullTitle;
  const currentOgDescription = ogDescription || description;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph tags */}
      <meta property="og:title" content={currentOgTitle} />
      <meta property="og:description" content={currentOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentOgTitle} />
      <meta name="twitter:description" content={currentOgDescription} />
      <meta name="twitter:image" content={ogImage} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};

export default SEO;
