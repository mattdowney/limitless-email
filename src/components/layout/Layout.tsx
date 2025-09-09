import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  navigationVariant?: 'light' | 'dark';
}

export default function Layout({ 
  children, 
  showFooter = true,
  navigationVariant = 'light'
}: LayoutProps) {
  return (
    <>
      <Navigation variant={navigationVariant} />
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}