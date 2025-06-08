
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Users, Target } from 'lucide-react';

interface HeroProps {
  onGetStarted?: () => void;
  onExplore?: () => void;
}

const Hero = ({ onGetStarted, onExplore }: HeroProps) => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-purple-50/30">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Heart className="h-16 w-16 text-primary fill-current animate-pulse" />
            <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Your Dream
          </span>
          <br />
          <span className="text-foreground">Wish Board</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Visualize your dreams, share your aspirations, and get inspired by others. 
          Build your personal wish board with beautiful cards and connect with a community of dreamers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Creating
            <Heart className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={onExplore}
            className="px-8 py-3 text-lg font-semibold border-2 hover:bg-primary/5 transition-all duration-300"
          >
            Explore Wishes
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visualize Goals</h3>
            <p className="text-muted-foreground">Create beautiful cards for your dreams and aspirations</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Connect & Share</h3>
            <p className="text-muted-foreground">Share your wishes and get inspired by others</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Stay Motivated</h3>
            <p className="text-muted-foreground">Like and support each other's dreams</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
