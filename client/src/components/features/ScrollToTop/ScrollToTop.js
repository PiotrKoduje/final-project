import React, { useState, useEffect } from 'react';
import { LuChevronUp } from 'react-icons/lu';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 150); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        group fixed 
        right-8 bottom-8 sm:right-14 sm:bottom-14 2xl:right-26 2xl:bottom-26 3xl:right-[150px]
        font-bold text-muted border-2 border-muted p-3 rounded-full hover:border-secondary hover:text-secondary transition"
    >
      <LuChevronUp className="w-6 h-6 transition-transform duration-500 group-hover:-translate-y-2" />
    </button>
  );
};

export default ScrollToTop;
