import Image from 'next/image';
import Link from 'next/link';
import LogoCloud from '@/components/ui/LogoCloud';

export default function Footer() {
  return (
    <div className="footer mx-auto bg-black text-center py-12 md:py-20"> 
      <div className="footer-cta">
        <Link href="/" className="inline-block mb-4">
          <Image
            className="block mx-auto w-auto h-[24px]"
            src="/img-logo-light.svg"
            alt="Limitless"
            width={100}
            height={24}
          />
        </Link>

        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-white mb-16 tracking-tighter mx-0">
          Unlimited email design.
          <span className="block">One low-priced subscription.</span>
        </h1>
      </div>

      <LogoCloud />
    </div>
  );
}