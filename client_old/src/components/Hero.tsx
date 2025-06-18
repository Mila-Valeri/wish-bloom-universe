import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import DreamStars from "./DreamStars";
import HeroTitleMain from "./HeroTitleMain";
import SparkleField from "./SparkleField";

interface HeroProps {
  onGetStarted: () => void;
  onExplore: () => void;
  currentLanguage?: string;
}

const Hero = ({ onGetStarted, onExplore }: HeroProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-12 md:py-20 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <SparkleField />

      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <HeroTitleMain />
        <p
          className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto animate-fade-in"
          style={{
            animationDelay: '0.15s',
            animationFillMode: 'both'
          }}
        >
          {t.heroSubtitle}
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
          style={{
            animation: 'fade-in 0.5s 0.28s cubic-bezier(0.38,0.62,0.29,0.99) both'
          }}
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 hover:scale-105 shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Heart className={`mr-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'scale-110 fill-current' : ''}`} />
            {t.getStarted}
          </Button>
          <Button
            onClick={onExplore}
            variant="outline"
            size="lg"
            className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border-2 hover:bg-accent transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {t.exploreWishes}
          </Button>
        </div>

        {/* Floating hearts animation */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="animate-float absolute top-20 left-1/4">
            <Heart className="h-3 w-3 text-primary/20 fill-current" />
          </div>
          <div className="animate-float absolute top-32 right-1/3" style={{ animationDelay: '2s' }}>
            <Heart className="h-4 w-4 text-purple-400/30 fill-current" />
          </div>
          <div className="animate-float absolute bottom-20 left-1/3" style={{ animationDelay: '4s' }}>
            <Heart className="h-2 w-2 text-pink-400/40 fill-current" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
