
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wish } from './useWishesData';

export const useWishMutations = (
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>
) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useLanguage();

  const createWish = async (wishData: {
    title: string;
    description?: string;
    image_url?: string;
    link?: string;
    tags?: string[];
    status?: string;
  }) => {
    if (!user) return;

    try {
      const newWish = await apiRequest('/api/wishes', {
        method: 'POST',
        body: JSON.stringify({
          ...wishData,
          user_id: user.id,
        }),
      });

      const wishWithMetadata = {
        ...newWish,
        profiles: {
          full_name: user.email === 'admin@wishboard.com' ? 'Demo Admin' : 'Demo User',
          avatar_url: null,
        },
        isLiked: false,
        isOwner: true,
      };

      setWishes(prev => [wishWithMetadata, ...prev]);
      
      toast({
        title: t.wishCreated,
        description: t.wishCreated,
      });

      return newWish;
    } catch (error: any) {
      toast({
        title: t.errorCreatingWish,
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateWish = async (id: string, updates: Partial<Wish>) => {
    try {
      await apiRequest(`/api/wishes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });

      setWishes(prev => prev.map(wish => 
        wish.id === id ? { ...wish, ...updates } : wish
      ));

      toast({
        title: t.wishUpdated,
        description: t.wishUpdated,
      });
    } catch (error: any) {
      toast({
        title: t.errorUpdatingWish,
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteWish = async (id: string) => {
    try {
      await apiRequest(`/api/wishes/${id}`, {
        method: 'DELETE',
      });

      setWishes(prev => prev.filter(wish => wish.id !== id));
      
      toast({
        title: t.wishDeleted,
        description: t.wishDeleted,
      });
    } catch (error: any) {
      toast({
        title: t.errorDeletingWish,
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    createWish,
    updateWish,
    deleteWish,
  };
};
