import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WishGrid from '@/components/WishGrid';
import ScrollToTop from '@/components/ScrollToTop';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { CreateWishDialog } from '@/components/wishes/CreateWishDialog';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { useWishes } from '@/hooks/useWishes';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from "react-router-dom";

// Define the admin email
const ADMIN_EMAIL = 'admin@wishboard.com';

const Index = () => {
  const [authDialog, setAuthDialog] = useState(false);
  const [createWishDialog, setCreateWishDialog] = useState(false);
  const { user, profile, loading: authLoading, signOut, updateProfile } = useAuth();
  const { wishes, loading: wishesLoading, toggleLike, deleteWish } = useWishes();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  // Check if current user is admin
  const isAdmin = user?.email === ADMIN_EMAIL;

  // Add the language switcher to the header section
  const headerSection = (
    <div className="fixed top-4 right-4 z-50">
      <LanguageSwitcher />
    </div>
  );

  const handleLogin = () => {
    setAuthDialog(true);
  };

  const handleGetStarted = () => {
    if (!user) {
      setAuthDialog(true);
    } else {
      setCreateWishDialog(true);
    }
  };

  const handleExplore = () => {
    document.getElementById('wish-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCreateWish = () => {
    setCreateWishDialog(true);
  };

  const handleAddWish = () => {
    setCreateWishDialog(true);
  };

  const handleLike = async (wishId: string) => {
    if (!user) {
      setAuthDialog(true);
      return;
    }
    
    try {
      await toggleLike(wishId);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleMessage = (authorName: string) => {
    console.log('Message author:', authorName);
  };

  const handleEdit = (wishId: string) => {
    navigate(`/edit-wish/${wishId}`);
  };

  const handleDelete = async (wishId: string) => {
    if (confirm('Are you sure you want to delete this wish?')) {
      try {
        await deleteWish(wishId);
      } catch (error) {
        console.error('Error deleting wish:', error);
      }
    }
  };

  // Add current user info to wishes
  const transformedWishes = wishes.map(wish => ({
    id: wish.id,
    title: wish.title,
    description: wish.description || '',
    image: wish.image_url || 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
    link: wish.link || undefined,
    tags: wish.tags || [],
    likes: wish.likes,
    author: {
      name: wish.profiles.full_name || 'Anonymous',
      avatar: wish.profiles.avatar_url ?? undefined,
    },
    isLiked: wish.isLiked,
    isOwner: wish.isOwner,
    status: wish.status || undefined,
  }));

  // Show loading only for a brief moment
  if (authLoading && wishes.length === 0 && wishesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm md:text-base">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {headerSection}
      
      <Header
        isAuthenticated={!!user}
        onLogin={handleLogin}
        onLanguageChange={() => {}} // Language is now handled by context
        currentLanguage={language}
        onSignOut={signOut}
        onCreateWish={handleCreateWish}
        userProfile={profile}
      />

      <Hero
        onGetStarted={handleGetStarted}
        onExplore={handleExplore}
        currentLanguage={language}
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
          currentLanguage={language}
          texts={{
            wishCollection: t.wishCollection,
            discoverDreams: t.discoverDreams,
            addWish: t.addWish,
            noWishesYet: t.noWishesYet,
            beFirst: t.beFirst,
            loading: t.loading,
            allWishes: t.allWishes,
            priorityWishes: t.priorityWishes,
            completedWishes: t.completedWishes,
            unfulfilledWishes: t.unfulfilledWishes
          }}
        />
      </div>

      {!user && (
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t.heroTitle}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {t.getStarted}
            </button>
          </div>
        </section>
      )}

      <ScrollToTop />
      
      <AuthDialog open={authDialog} onOpenChange={setAuthDialog} />
      <CreateWishDialog open={createWishDialog} onOpenChange={setCreateWishDialog} />
    </div>
  );
};

export default Index;