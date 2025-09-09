'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function LimitlessCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    // Get scrollbar width before hiding it
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Add padding to compensate for scrollbar removal
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add('modal-open');
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Remove padding and modal class
    document.body.style.paddingRight = '';
    document.body.classList.remove('modal-open');
    
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div className="about-limitless w-full mt-8 mb-12 p-6 lg:p-16 bg-blue/5 border-[2px] border-blue rounded">
        <Image 
          className="h-16 w-auto mb-6" 
          src="/img-limitless-logo.png" 
          alt="Limitless" 
          width={200}
          height={64}
        />
        <h2 className="text-[1.8rem] leading-9 font-medium mb-3 tracking-tight">
          Hi, we&rsquo;re Limitless—an email marketing agency designing unlimited, world-class emails that rise above the inbox clutter.
        </h2>
        <p className="text-[1.1875rem] mb-10 leading-[1.7] text-black/80">
          Unlike other agencies, we offer unlimited email design for one affordable monthly subscription. No long-term contracts, no long-term commitments, and unlimited revisions until you&rsquo;re 100% satisfied.
        </p>

        <button 
          onClick={openModal}
          className="button mb-4 bg-blue text-white font-medium px-6 py-3 text-md rounded-md transition-all inline-block leading-none hover:bg-black hover:text-white"
        >
          Join the waitlist
        </button>
      </div>

      {/* Waitlist Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-white/70 backdrop-blur-sm p-4 lg:p-0 z-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div className="waitlist-modal bg-white px-8 py-12 lg:p-16 rounded-md relative w-full lg:w-2/3 xl:w-5/12 shadow-3xl text-center">
            <h2 className="text-black text-lg lg:text-2xl mt-0 mb-2 tracking-tight">
              Thanks for your interest in Limitless
            </h2>
            <p className="text-black text-md mb-6">
              All spots are currently occupied for {new Date().toLocaleDateString('en-US', { month: 'long' })}. 
              <span className="inline xl:block">Join the waitlist to be notified when one opens up.</span>
            </p>

            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 focus:outline-none text-black hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <iframe 
              className="w-full" 
              src="https://embeds.beehiiv.com/2d07d0ee-78d3-470a-aa4e-7c6f81031c41?slim=true" 
              height="52" 
              frameBorder="0" 
              scrolling="no" 
              style={{ margin: 0, borderRadius: '0px !important', backgroundColor: 'transparent' }}
            />
          </div>
        </div>
      )}
    </>
  );
}