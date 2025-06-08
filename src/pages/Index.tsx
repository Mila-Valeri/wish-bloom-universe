
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WishGrid from '@/components/WishGrid';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { CreateWishDialog } from '@/components/wishes/CreateWishDialog';
import { useAuth } from '@/hooks/useAuth';
import { useWishes } from '@/hooks/useWishes';

const Index = () => {
  const [authDialog, setAuthDialog] = useState<{open: boolean, mode: 'login' | 'register'}>({
    open: false,
    mode: 'login'
  });
  const [createWishDialog, setCreateWishDialog] = useState(false);
  const { user, profile, loading: authLoading, signOut, updateProfile } = useAuth();
  const { wishes, loading: wishesLoading, toggleLike, deleteWish } = useWishes();

  // Update document theme and language when profile changes
  useEffect(() => {
    if (profile?.theme_preference) {
      document.documentElement.classList.toggle('dark', profile.theme_preference === 'dark');
    }
  }, [profile?.theme_preference]);

  const handleLogin = () => {
    setAuthDialog({ open: true, mode: 'login' });
  };

  const handleRegister = () => {
    setAuthDialog({ open: true, mode: 'register' });
  };

  const handleGetStarted = () => {
    if (user) {
      document.getElementById('wish-grid')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleRegister();
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

  const handleThemeToggle = () => {
    if (user && profile) {
      const newTheme = profile.theme_preference === 'light' ? 'dark' : 'light';
      updateProfile({ theme_preference: newTheme });
    } else {
      // For non-authenticated users, just toggle the class
      document.documentElement.classList.toggle('dark');
    }
  };

  const handleAddWish = () => {
    if (user) {
      setCreateWishDialog(true);
    } else {
      handleRegister();
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!user}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLanguageChange={handleLanguageChange}
        onThemeToggle={handleThemeToggle}
        currentLanguage={profile?.language_preference || 'en'}
        isDarkTheme={profile?.theme_preference === 'dark'}
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

      <AuthDialog
        open={authDialog.open}
        onOpenChange={(open) => setAuthDialog(prev => ({ ...prev, open }))}
        mode={authDialog.mode}
      />

      <CreateWishDialog
        open={createWishDialog}
        onOpenChange={setCreateWishDialog}
      />
    </div>
  );
};

export default Index;
