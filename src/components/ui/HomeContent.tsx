'use client';

import { useState } from 'react';
import WaitlistModal from './WaitlistModal';

export default function HomeContent() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <>
      <section className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium text-white mb-2 tracking-tighter mx-0 md:mx-4 lg:mx-0">
          Unlimited email design. <span className="block">One low<span className="hidden md:inline">-priced</span> monthly rate.</span>
        </h1>

        <p className="text-lg w-full md:w-7/12 mx-auto mb-12 text-white">
          With Limitless, you can get unlimited email design requests, and revisions for
          <span className="inline xl:block">
            <span className="bg-[url('/img-hero-underline-straight.svg')] xl:bg-[url('/img-hero-underline.svg')] bg-no-repeat bg-left-bottom pb-1 xl:pb-2 font-medium text-white">
              70% less than the cost of a full-time designer.
            </span>
          </span>
        </p>

        <div className="availability">
          <div className="capacity block">
            <p className="text-white font-medium mb-4 inline-block text-md">
              Sorry, all spots are sold out for {currentMonth}.
            </p>
            <p>
              <button 
                onClick={() => setIsWaitlistOpen(true)}
                className="waitlist-launch button-alt"
              >
                Join the waitlist
              </button>
            </p>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  );
}