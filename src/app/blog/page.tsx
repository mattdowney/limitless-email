import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { getAllPosts, getCategorySlug } from '@/lib/blog';
import { generateBlogIndexMetadata, generateStructuredData } from '@/lib/seo';

export const metadata = generateBlogIndexMetadata();

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0]; // First post as featured
  const remainingPosts = posts.slice(1); // Rest of the posts

  if (posts.length === 0) {
    return (
      <>
        <div className="main bg-white w-full flex flex-col p-6 md:p-10 overflow-x-hidden">
          <Navigation variant="dark" />
          <div className="text-center py-20">
            <p className="text-black/60">No blog posts yet. Check back soon!</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const structuredData = generateStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Featured Post Hero Section - Blue Background */}
      <div className="main bg-blue w-full flex flex-col p-6 md:p-10 overflow-x-hidden">
        <Navigation variant="light" />
        
        <div className="blog-hero mt-20 md:mt-16 mb-8 md:mb-16">
          <div className="featured-post-title-container w-full md:w-7/12 mx-auto">
            <div className="category-label mt-8">
              <Link 
                href={`/blog/category/${getCategorySlug(featuredPost.category)}`}
                className="text-white/70 font-medium text-[1rem] transition hover:text-white"
              >
                {featuredPost.category}
              </Link>
            </div>

            <div className="featured-post-meta-container grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-20 mb-8 w-full mx-auto items-center mt-3">
              <div className="featured-post-title col-span-1 lg:col-span-9">
                <h2 className="post-title text-[1.75rem] lg:text-[2.25rem] font-medium text-white leading-[2.2rem] lg:leading-[2.75rem]">
                  <Link href={`/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>
              </div>

              <div className="featured-post-meta col-span-1 lg:col-span-3 my-4 lg:my-0 mb-0 md:mb-0">
                <ul className="flex justify-start lg:justify-end">
                  <li>
                    <a 
                      className="flex items-center justify-center bg-white rounded-full w-7 h-7 lg:w-9 lg:h-9 text-base hover:bg-white transform hover:-translate-y-1 transition-transform duration-300 ease-out" 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(featuredPost.title)}&url=${encodeURIComponent(`https://limitless.email/${featuredPost.slug}`)}`}
                      target="_blank" 
                      rel="nofollow noopener noreferrer"
                    >
                      <svg className="w-4 h-4 text-blue" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </li>

                  <li className="ml-4">
                    <a 
                      className="flex items-center justify-center bg-white w-7 h-7 lg:w-9 lg:h-9 rounded-full text-base hover:bg-white transform hover:-translate-y-1 transition-transform duration-300 ease-out" 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://limitless.email/${featuredPost.slug}`)}`}
                      target="_blank" 
                      rel="nofollow noopener noreferrer"
                    >
                      <svg className="w-4 h-4 text-blue" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </li>

                  <li className="ml-4">
                    <a 
                      className="flex items-center justify-center bg-white w-7 h-7 lg:w-9 lg:h-9 rounded-full text-base hover:bg-white transform hover:-translate-y-1 transition-transform duration-300 ease-out" 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://limitless.email/${featuredPost.slug}`)}`}
                      target="_blank" 
                      rel="nofollow noopener noreferrer"
                    >
                      <svg className="w-4 h-4 text-blue" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {featuredPost.featuredImage && (
            <div className="featured-post-thumb mb-6 md:mb-8 rounded overflow-hidden w-full md:w-8/12 mx-auto">
              <Link href={`/${featuredPost.slug}`}>
                <Image 
                  src={featuredPost.featuredImage} 
                  alt={featuredPost.title}
                  width={800}
                  height={400}
                  className="w-full h-auto"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Cp9XWSt1YuNYxaFsb9gLcQfs="
                />
              </Link>
            </div>
          )}

          <div className="featured-post-excerpt-container w-full md:w-7/12 mx-auto">
            <div className="featured-post-excerpt text-white text-[1.2rem] leading-8 mb-4">
              <p className="mb-0 text-white/80 inline">
                {featuredPost.excerpt} 
                <Link 
                  className="text-white font-semibold transition group inline ml-1" 
                  href={`/${featuredPost.slug}`}
                >
                  Read more <span className="inline-block transform translate-x-0 transition-transform group-hover:translate-x-[2px]">→</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid - White Background */}
      <div className="blog-posts w-full md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 py-12 md:py-20 px-6 md:px-0">
        {remainingPosts.map((post) => (
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
                    <Link 
                      href={`/blog/category/${getCategorySlug(post.category)}`}
                      className="text-black/40 font-medium text-[1rem] transition hover:text-black"
                    >
                      {post.category}
                    </Link>
                  </p>
                </div>
                
                <h2 className="post-title text-[1.6rem] font-medium mb-3">
                  <Link href={`/${post.slug}`} prefetch={true}>{post.title}</Link>
                </h2>

                <p className="mt-0">
                  <Link 
                    className="text-blue font-semibold hover:text-black transition group" 
                    href={`/${post.slug}`}
                    prefetch={true}
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