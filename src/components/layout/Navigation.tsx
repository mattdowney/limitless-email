'use client';

import Image from 'next/image';
import Link from 'next/link';

interface NavigationProps {
  variant?: 'light' | 'dark';
}

export default function Navigation({ variant = 'light' }: NavigationProps) {
  const isDark = variant === 'dark';
  
  return (
    <div className="header w-full flex justify-between items-center">
      <div className="logo">
        <Link href="/">
          <Image 
            className="w-auto h-[24px]" 
            src={isDark ? '/img-logo-dark.svg' : '/img-logo-light.svg'}
            alt="Limitless" 
            width={100}
            height={24}
            priority
          />
        </Link>
      </div>

      <div className="navigation">
        <Link 
          className={`text-sm font-semibold transition ${
            isDark 
              ? 'text-black hover:text-black/80' 
              : 'text-white hover:text-white/80'
          }`} 
          href="/blog"
          prefetch={true}
        >
          Our blog
        </Link>
      </div>
    </div>
  );
}