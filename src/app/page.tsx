import Navigation from '@/components/layout/Navigation';
import LogoCloud from '@/components/ui/LogoCloud';
import HomeContent from '@/components/ui/HomeContent';

// Test auto-deployment from GitHub to Vercel

export default function Home() {
  return (
    <div className="main bg-blue bg-[url('/img-hero-bg.svg')] bg-cover bg-center w-full min-h-screen flex flex-col justify-between p-6 md:p-10">
      <Navigation variant="light" />
      <HomeContent />
      <LogoCloud />
    </div>
  );
}
