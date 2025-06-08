
import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WishGrid from '@/components/WishGrid';
import { mockWishes } from '@/data/mockWishes';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    toast({
      title: "Login",
      description: "Please connect to Supabase to enable authentication features.",
    });
  };

  const handleRegister = () => {
    toast({
      title: "Sign Up", 
      description: "Please connect to Supabase to enable registration features.",
    });
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Scroll to wish grid or open create modal
      document.getElementById('wish-grid')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleRegister();
    }
  };

  const handleExplore = () => {
    document.getElementById('wish-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    toast({
      title: "Language Changed",
      description: `Switched to ${lang === 'en' ? 'English' : 'Ukrainian'}`,
    });
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    toast({
      title: "Theme Changed",
      description: `Switched to ${isDarkTheme ? 'light' : 'dark'} theme`,
    });
  };

  const handleLike = (id: string) => {
    toast({
      title: "Liked!",
      description: "You liked this wish",
    });
  };

  const handleMessage = (authorName: string) => {
    toast({
      title: "Message",
      description: `Connect to Supabase to enable messaging with ${authorName}`,
    });
  };

  const handleAddWish = () => {
    toast({
      title: "Create Wish",
      description: "Connect to Supabase to enable wish creation",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLanguageChange={handleLanguageChange}
        onThemeToggle={handleThemeToggle}
        currentLanguage={currentLanguage}
        isDarkTheme={isDarkTheme}
      />

      <Hero
        onGetStarted={handleGetStarted}
        onExplore={handleExplore}
      />

      <div id="wish-grid">
        <WishGrid
          wishes={mockWishes}
          isAuthenticated={isAuthenticated}
          showAddButton={true}
          onAddWish={handleAddWish}
          onLike={handleLike}
          onMessage={handleMessage}
        />
      </div>

      <footer className="bg-muted/30 py-12 px-4 mt-16">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Ready to start your wish journey?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of dreamers who are making their wishes come true
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
