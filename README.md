# Limitless Email Design - Next.js Website

A modern, fast website for Limitless Email Design service, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Static Site Generation**: Fast loading times with pre-generated pages
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Blog System**: Markdown-based blog with category support
- **SEO Optimized**: Proper meta tags and structured data
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Easy Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd limitless-next
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── content/              # Blog content
│   └── posts/           # Markdown blog posts
└── lib/                 # Utility functions
    └── blog.ts          # Blog functionality
```

## Blog System

Add new blog posts by creating Markdown files in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
excerpt: "A brief description"
date: "2024-03-15"
category: "Category Name"
author: "Author Name"
featuredImage: "/path-to-image.jpg"
---

# Your blog content here...
```

## Customization

### Colors and Fonts

Update `tailwind.config.ts` to modify:
- Color palette
- Font families
- Breakpoints
- Custom styling

### Content

- Homepage content: `src/app/page.tsx`
- Blog posts: `src/content/posts/`
- Navigation: `src/components/layout/Navigation.tsx`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure domain (limitless.email)
4. Deploy

### Other Platforms

The site works on any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Environment Variables

Create `.env.local` for any environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://limitless.email
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter
- **Deployment**: Vercel
- **Fonts**: Custom Silka fonts

## Performance

- Lighthouse Score: 90+
- Core Web Vitals: Optimized
- Image Optimization: Next.js Image component
- Font Loading: Optimized with font-display: swap

## License

Private - All rights reserved to Limitless Email Design
