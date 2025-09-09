import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Blog post data - hardcoded for Edge Runtime compatibility
const BLOG_POSTS = {
  'limitless-subscription-based-email-design-agency-company': {
    title: 'Meet Limitless: A subscription-based email design services company',
    excerpt: 'Get unlimited email design requests and revisions for 70% less than the cost of a full-time designer.',
    featuredImage: '/images/introducing-limitless.jpg'
  },
  'effective-call-to-action-strategies': {
    title: 'Mastering the CTA: Transform your email marketing with effective call-to-action strategies',
    excerpt: 'Discover how to master the art of crafting compelling CTAs for your email marketing campaigns.',
    featuredImage: '/images/cta.jpg'
  },
  'ab-testing-split-testing': {
    title: 'Mastering A/B testing for effective email marketing',
    excerpt: 'Learn how A/B testing can transform your email marketing campaigns and boost conversion rates.',
    featuredImage: '/images/ab-testing.jpg'
  },
  'understanding-your-audience-an-email-marketing-guide-for-startups-and-smbs': {
    title: 'Understanding your audience: An email marketing guide for startups and SMBs',
    excerpt: 'Learn how to understand your audience and create email campaigns that truly resonate.',
    featuredImage: '/images/email-marketing.jpg'
  },
  'email-copywriting-effective-writing-cta': {
    title: 'Email copywriting: A guide to effective email writing and CTAs',
    excerpt: 'Discover how to captivate your audience through mastering email copywriting.',
    featuredImage: '/images/email-copywriting.jpg'
  },
  'responsive-email-design': {
    title: 'Unlocking the power of responsive email design for effective marketing',
    excerpt: 'Learn how responsive email design can significantly boost your marketing results.',
    featuredImage: '/images/responsive-email-design.jpg'
  },
  'content-calendar-email-marketing': {
    title: 'How a content calendar turns good ideas into great email marketing campaigns',
    excerpt: 'Discover how a well-planned content calendar can transform your email marketing strategy.',
    featuredImage: '/images/content-calendar.jpg'
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const type = searchParams.get('type') || 'blog';

    // Default values
    let title = 'Limitless - Unlimited Email Design';
    let description = 'Professional email design on demand';
    let featuredImage = null;

    // Get blog post data if slug provided
    if (slug && type === 'post') {
      const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];
      if (post) {
        title = post.title;
        description = post.excerpt;
        featuredImage = post.featuredImage;
      }
    } else if (type === 'blog') {
      title = 'Email Marketing Blog | Limitless';
      description = 'Expert email marketing insights, design tips, and growth strategies';
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0009FF',
            backgroundImage: featuredImage 
              ? `linear-gradient(rgba(0, 9, 255, 0.8), rgba(0, 9, 255, 0.8))`
              : 'linear-gradient(135deg, #0009FF 0%, #9709E4 100%)',
            position: 'relative',
          }}
        >
          {/* Background image if available */}
          {featuredImage && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(https://limitless.email${featuredImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3,
              }}
            />
          )}
          
          {/* Content overlay */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: slug ? '48px' : '64px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '24px',
                maxWidth: '900px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '24px',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.4,
                marginBottom: '40px',
                maxWidth: '800px',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {description}
            </p>

            {/* Brand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#0009FF',
                }}
              >
                Limitless
              </div>
              {slug && (
                <div
                  style={{
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  limitless.email
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}