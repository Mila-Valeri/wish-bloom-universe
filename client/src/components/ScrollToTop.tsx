
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
      size="icon"
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
    </Button>
  );
};

export default ScrollToTop;
