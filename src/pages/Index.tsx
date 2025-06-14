import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WishGrid from '@/components/WishGrid';
import ScrollToTop from '@/components/ScrollToTop';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { CreateWishDialog } from '@/components/wishes/CreateWishDialog';
import { useAuth } from '@/hooks/useAuth';
import { useWishes } from '@/hooks/useWishes';

// Define the admin email
const ADMIN_EMAIL = 'admin@wishboard.com';

const Index = () => {
  const [authDialog, setAuthDialog] = useState(false);
  const [createWishDialog, setCreateWishDialog] = useState(false);
  const { user, profile, loading: authLoading, signOut, updateProfile } = useAuth();
  const { wishes, loading: wishesLoading, toggleLike, deleteWish } = useWishes();

  // Check if current user is admin
  const isAdmin = user?.email === ADMIN_EMAIL;

  // Update document theme and language when profile changes
  useEffect(() => {
    if (profile?.theme_preference) {
      document.documentElement.classList.toggle('dark', profile.theme_preference === 'dark');
    }
  }, [profile?.theme_preference]);

  const handleLogin = () => {
    setAuthDialog(true);
  };

  const handleGetStarted = () => {
    if (user) {
      document.getElementById('wish-grid')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleLogin();
    }
  };

  const handleExplore = () => {
    document.getElementById('wish-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageChange = (lang: string) => {
    if (user && profile) {
      updateProfile({ language_preference: lang as 'en' | 'ua' });
    }
  };

  const handleAddWish = () => {
    if (isAdmin) {
      setCreateWishDialog(true);
    } else {
      handleLogin();
    }
  };

  const handleLike = (id: string) => {
    if (user) {
      toggleLike(id);
    } else {
      handleLogin();
    }
  };

  const handleMessage = (authorName: string) => {
    if (user) {
      // TODO: Implement messaging functionality
      console.log('Message to:', authorName);
    } else {
      handleLogin();
    }
  };

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Edit wish:', id);
  };

  const handleDelete = (id: string) => {
    deleteWish(id);
  };

  const transformedWishes = wishes.map(wish => ({
    id: wish.id,
    title: wish.title,
    description: wish.description || '',
    image: wish.image_url || '/placeholder.svg',
    link: wish.link,
    tags: wish.tags,
    likes: wish.likes,
    author: {
      name: wish.profiles.full_name || 'Anonymous',
      avatar: wish.profiles.avatar_url,
    },
    isLiked: wish.isLiked,
    isOwner: wish.isOwner,
  }));

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm md:text-base">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!user}
        onLogin={handleLogin}
        onLanguageChange={handleLanguageChange}
        currentLanguage={profile?.language_preference || 'en'}
        onSignOut={signOut}
        userProfile={profile}
      />

      <Hero
        onGetStarted={handleGetStarted}
        onExplore={handleExplore}
      />

      <div id="wish-grid">
        <WishGrid
          wishes={transformedWishes}
          isAuthenticated={!!user}
          showAddButton={true}
          loading={wishesLoading}
          onAddWish={handleAddWish}
          onLike={handleLike}
          onMessage={handleMessage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      </div>

      <footer className="bg-muted/30 py-8 md:py-12 px-4 mt-16">
        <div className="container mx-auto text-center">
          <h3 className="text-base md:text-lg font-semibold mb-2">Ready to start your wish journey?</h3>
          <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
            Join thousands of dreamers who are making their wishes come true
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-primary text-primary-foreground px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm md:text-base"
          >
            Get Started Today
          </button>
        </div>
      </footer>

      {/* Scroll to top button */}
      <ScrollToTop />

      <AuthDialog
        open={authDialog}
        onOpenChange={setAuthDialog}
      />

      <CreateWishDialog
        open={createWishDialog}
        onOpenChange={setCreateWishDialog}
      />
    </div>
  );
};

export default Index;
