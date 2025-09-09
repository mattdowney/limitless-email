import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { getPostsByCategory, getAllCategories, getCategorySlug, getCategoryFromSlug } from '@/lib/blog';
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: getCategorySlug(category),
  }));
}

// Generate metadata for the category page
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryName = getCategoryFromSlug(categorySlug);
  const posts = getPostsByCategory(categoryName);
  
  if (posts.length === 0) {
    notFound();
  }

  return generateSEOMetadata({
    title: `${categoryName} | Limitless Email Design Blog`,
    description: `Expert ${categoryName.toLowerCase()} insights and tips for email marketing success. Professional email design strategies and best practices.`,
    url: `/blog/category/${categorySlug}`,
    image: `/og?type=blog&category=${categorySlug}`,
    type: 'website',
    tags: [categoryName.toLowerCase(), 'email marketing', 'design tips'],
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryName = getCategoryFromSlug(categorySlug);
  const posts = getPostsByCategory(categoryName);

  if (posts.length === 0) {
    notFound();
  }

  const structuredData = generateStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Category Header - Blue Background */}
      <div className="main bg-blue w-full flex flex-col p-6 md:p-10 overflow-x-hidden">
        <Navigation variant="light" />
        
        <div className="category-hero mt-20 md:mt-16 mb-8 md:mb-16">
          {/* Breadcrumb */}
          <div className="breadcrumb w-full md:w-7/12 mx-auto mb-6">
            <nav className="flex justify-center" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/blog" className="text-white/70 hover:text-white text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="text-white/50 mx-2">/</span>
                    <span className="text-white text-sm font-medium">{categoryName}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Category Title & Description */}
          <div className="category-header w-full md:w-7/12 mx-auto text-center">
            <h1 className="text-[2.5rem] lg:text-[3rem] font-medium text-white leading-[3rem] lg:leading-[3.5rem] mb-6">
              {categoryName}
            </h1>
            <p className="text-white/80 text-lg leading-7">
              {getCategoryDescription(categoryName)}
            </p>
          </div>
        </div>
      </div>

      {/* All Blog Posts Grid - White Background */}
      <div className="blog-posts w-full md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 py-12 md:py-20 px-6 md:px-0">
        {posts.map((post) => (
          <article key={post.slug} className="mb-5">
            <Link href={`/${post.slug}`} title={post.title}>
              <div className="blog-archive-post-thumbnail h-[20rem] w-auto bg-black rounded overflow-hidden mb-6">
                {post.featuredImage && (
                  <Image 
                    src={post.featuredImage} 
                    alt={post.title}
                    width={400}
                    height={320}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </Link>

            <div className="blog-post-details">
              <div className="blog-post-intro">
                <div className="blog-post-meta">
                  <p className="hidden lg:block meta mt-1 mb-1">
                    <span className="text-black/40 font-medium text-[1rem]">
                      {post.category}
                    </span>
                  </p>
                </div>
                
                <h2 className="post-title text-[1.6rem] font-medium mb-3">
                  <Link href={`/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="mt-0">
                  <Link 
                    className="text-blue font-semibold hover:text-black transition group" 
                    href={`/${post.slug}`}
                  >
                    Read more <span className="inline-block transform translate-x-0 transition-transform group-hover:translate-x-[2px]">→</span>
                  </Link>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'Best Practice': 'Proven strategies and best practices for effective email marketing and design.',
    'Tips & Tricks': 'Practical tips and tricks to improve your email marketing campaigns.',
    'Copywriting': 'Expert copywriting techniques to craft compelling email content that converts.',
    'Agency': 'Insights from our agency and the email design industry.',
  };
  
  return descriptions[category] || `Expert insights and articles about ${category.toLowerCase()} for email marketing success.`;
}