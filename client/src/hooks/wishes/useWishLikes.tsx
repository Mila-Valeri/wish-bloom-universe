
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../useAuth';
import { Wish } from './useWishesData';

export const useWishLikes = (
  wishes: Wish[],
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>
) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const toggleLike = async (wishId: string) => {
    if (!user) return;

    try {
      const wish = wishes.find(w => w.id === wishId);
      if (!wish) return;

      if (wish.isLiked) {
        // Remove like
        const { error } = await supabase
          .from('wish_likes')
          .delete()
          .eq('wish_id', wishId)
          .eq('user_id', user.id);

        if (error) throw error;

        setWishes(prev => prev.map(w => 
          w.id === wishId 
            ? { ...w, likes: w.likes - 1, isLiked: false }
            : w
        ));
      } else {
        // Add like
        const { error } = await supabase
          .from('wish_likes')
          .insert([{ wish_id: wishId, user_id: user.id }]);

        if (error) throw error;

        setWishes(prev => prev.map(w => 
          w.id === wishId 
            ? { ...w, likes: w.likes + 1, isLiked: true }
            : w
        ));
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      });
    }
  };

  return {
    toggleLike,
  };
};
