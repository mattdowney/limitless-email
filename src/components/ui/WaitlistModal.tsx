'use client';

import { useEffect } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Get scrollbar width before hiding it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Add padding to compensate for scrollbar removal
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.classList.add('modal-open');
    } else {
      // Remove padding and modal class
      document.body.style.paddingRight = '';
      document.body.classList.remove('modal-open');
    }

    // Cleanup function
    return () => {
      document.body.style.paddingRight = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="overlay fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm p-4 lg:p-0"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="waitlist-modal bg-white px-8 py-12 lg:p-16 rounded-md relative w-full lg:w-2/3 xl:w-5/12 shadow-2xl text-center">
        <h2 className="text-black text-lg lg:text-2xl mt-0 mb-2 tracking-tight">
          Thanks for your interest in Limitless
        </h2>
        <p className="text-black text-md mb-6">
          All spots are currently occupied for {new Date().toLocaleString('default', { month: 'long' })}. 
          <span className="inline xl:block">Join the waitlist to be notified when one opens up.</span>
        </p>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 focus:outline-none"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            fill="#ff0000" 
            viewBox="0 0 256 256"
          >
            <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" />
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
  );
}