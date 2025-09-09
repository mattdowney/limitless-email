import type { Metadata } from 'next';
import { Post } from './blog';

const SITE_URL = 'https://limitless.email';
const SITE_NAME = 'Limitless';
const COMPANY_NAME = 'Limitless Email Design';

export interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateSEOMetadata({
  title = 'Limitless - Unlimited Email Design | One Low Monthly Rate',
  description = 'Get unlimited email design requests and revisions for 70% less than the cost of a full-time designer. Professional email design on demand.',
  url = SITE_URL,
  image = '/og?type=website',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Limitless Team',
  tags = []
}: SEOProps = {}): Metadata {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: author }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    keywords: [
      'email design',
      'email marketing',
      'unlimited design',
      'email templates',
      'marketing design',
      'email campaigns',
      'responsive email',
      'email automation',
      ...tags
    ],
    openGraph: {
      type: type as 'website' | 'article',
      locale: 'en_US',
      url: fullUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: [author],
        section: 'Email Marketing',
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@limitlesshq',
      creator: '@limitlesshq',
      title,
      description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };

  return metadata;
}

export function generateBlogPostMetadata(post: Post): Metadata {
  const url = `/${post.slug}`;
  const image = `/og?type=post&slug=${post.slug}`;
  
  // Extract keywords from content
  const contentKeywords = extractKeywords(post.content + ' ' + post.title);
  
  return generateSEOMetadata({
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.excerpt || `${post.title} - Expert insights on email marketing and design strategies.`,
    url,
    image,
    type: 'article',
    publishedTime: new Date(post.date).toISOString(),
    author: post.author || 'Limitless Team',
    tags: [post.category, ...contentKeywords],
  });
}

export function generateBlogIndexMetadata(): Metadata {
  return generateSEOMetadata({
    title: 'Email Marketing Blog | Expert Tips & Strategies | Limitless',
    description: 'Expert email marketing insights, design tips, and growth strategies. Learn from industry professionals about email campaigns, automation, A/B testing, and more.',
    url: '/blog',
    image: '/og?type=blog',
    type: 'website',
    tags: [
      'email marketing blog',
      'design strategies',
      'email automation',
      'A/B testing',
      'email campaigns',
      'marketing tips'
    ],
  });
}

function extractKeywords(text: string): string[] {
  const keywords = [
    'email marketing', 'email design', 'CTA', 'call to action', 
    'A/B testing', 'split testing', 'conversion', 'audience',
    'copywriting', 'responsive design', 'content calendar',
    'automation', 'segmentation', 'personalization', 'analytics'
  ];
  
  return keywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  ).slice(0, 5);
}

export function generateStructuredData(post?: Post) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${SITE_URL}/#contact`,
    },
    sameAs: [
      'https://twitter.com/limitlesshq',
      'https://linkedin.com/company/limitless-design',
    ],
  };

  if (post) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImage ? `${SITE_URL}${post.featuredImage}` : undefined,
      datePublished: new Date(post.date).toISOString(),
      dateModified: new Date(post.date).toISOString(),
      author: {
        '@type': 'Organization',
        name: COMPANY_NAME,
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: COMPANY_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/${post.slug}`,
      },
      articleSection: post.category,
      keywords: [post.category, ...extractKeywords(post.content)].join(', '),
    };
  }

  return baseStructuredData;
}