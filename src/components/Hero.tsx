
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onExplore: () => void;
  currentLanguage?: string;
}

const Hero = ({ onGetStarted, onExplore, currentLanguage = 'en' }: HeroProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Text translations
  const texts = {
    en: {
      makeYour: 'Make Your',
      wishesVisible: 'Wishes Visible',
      shareYour: 'Share your dreams with the world and inspire others to chase theirs',
      getStarted: 'Get Started',
      explore: 'Explore Dreams'
    },
    ua: {
      makeYour: 'Зробіть свої',
      wishesVisible: 'бажання видимими',
      shareYour: 'Поділіться своїми мріями зі світом та надихніть інших втілювати свої',
      getStarted: 'Почати',
      explore: 'Дослідити мрії'
    }
  };

  const t = texts[currentLanguage as keyof typeof texts] || texts.en;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-12 md:py-20 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce">
          <Heart className="h-8 w-8 text-primary/30 fill-current" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <Sparkles className="h-6 w-6 text-purple-400/40" />
        </div>
        <div className="absolute bottom-32 left-20 animate-spin" style={{ animationDuration: '3s' }}>
          <Star className="h-5 w-5 text-pink-400/30" />
        </div>
        <div className="absolute top-60 right-40 animate-bounce" style={{ animationDelay: '1s' }}>
          <Heart className="h-4 w-4 text-primary/20 fill-current" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
            <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
              {t.makeYour}
            </span>
            <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-primary bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t.wishesVisible}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {t.shareYour}
          </p>
        </div>

        <div 
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-fade-in"
          style={{ animationDelay: '0.6s' }}
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
            {t.explore}
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
