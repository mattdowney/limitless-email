import { notFound } from 'next/navigation';
import Image from 'next/image';
import { marked } from 'marked';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const shareUrl = `https://limitless.email/blog/${slug}`;
  const htmlContent = marked(post.content);

  return (
    <>
      <div className="main w-full flex flex-col p-6 md:px-10 md:pt-10 md:pb-0 overflow-x-hidden">
        <Navigation variant="dark" />

        <div className="single-post mt-20 md:mt-16 mb-0 lg:mb-0">
          <div className="featured-post-title-container w-full lg:w-7/12 mx-auto">
            <div className="category-label mt-8">
              <span className="text-black/50 font-medium text-[1rem]">
                {post.category}
              </span>
            </div>

            <div className="featured-post-meta-container grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-20 mb-8 w-full mx-auto items-center mt-3">
              <div className="featured-post-title col-span-1 lg:col-span-9">
                <h1 className="post-title text-[1.75rem] lg:text-[2.25rem] font-medium text-black leading-[2.2rem] lg:leading-[2.75rem]">
                  {post.title}
                </h1>
              </div>

              <div className="featured-post-meta col-span-1 lg:col-span-3 my-4 lg:my-0 mb-0 md:mb-0">
                <ul className="flex justify-start lg:justify-end">
                  <li>
                    <a 
                      className="group flex items-center justify-center bg-black rounded-full w-7 h-7 lg:w-9 lg:h-9 text-base hover:bg-blue transform hover:-translate-y-1 transition-all duration-300 ease-out" 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank" 
                      rel="nofollow noopener noreferrer"
                    >
                      <svg className="w-4 h-4 text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </li>

                  <li className="ml-4">
                    <a 
                      className="group flex items-center justify-center bg-black w-7 h-7 lg:w-9 lg:h-9 rounded-full text-base hover:bg-blue transform hover:-translate-y-1 transition-all duration-300 ease-out" 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank" 
                      rel="nofollow noopener noreferrer"
                    >
                      <svg className="w-4 h-4 text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </li>

                  <li className="ml-4">
                    <a 
                      className="group flex items-center justify-center bg-black w-7 h-7 lg:w-9 lg:h-9 rounded-full text-base hover:bg-blue transform hover:-translate-y-1 transition-all duration-300 ease-out" 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank" 
                      rel="nofollow noopener noreferrer"
                    >
                      <svg className="w-4 h-4 text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {post.featuredImage && (
            <div className="featured-post-thumb mb-0 lg:mb-8 rounded overflow-hidden w-full lg:w-8/12 mx-auto">
              <Image 
                src={post.featuredImage} 
                alt={post.title} 
                width={800}
                height={400}
                className="w-full h-auto"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Cp9XWSt1YuNYxaFsb9gLcQfs="
              />
            </div>
          )}
        </div>
      </div>

      <div className="single-post-content bg-white w-full pt-0 pb-6 lg:pb-20 lg:pt-0">
        <div className="w-full lg:w-7/12 mx-auto px-6">
          <div 
            className="content text-black/80 text-[1.2rem] leading-8 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

// Generate metadata for each post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Limitless`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}