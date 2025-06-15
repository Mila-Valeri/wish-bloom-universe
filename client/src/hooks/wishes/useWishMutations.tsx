
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../useAuth';
import { Wish } from './useWishesData';

export const useWishMutations = (
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>
) => {
  const { toast } = useToast();
  const { user } = useAuth();

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
        title: "Wish created!",
        description: "Your wish has been added to the board.",
      });

      return newWish;
    } catch (error: any) {
      toast({
        title: "Error",
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
        title: "Wish updated",
        description: "Your wish has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
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
        title: "Wish deleted",
        description: "Your wish has been removed from the board.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
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
