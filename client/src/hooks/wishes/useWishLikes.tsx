
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

      const result = await apiRequest(`/api/wishes/${wishId}/likes`, {
        method: 'POST',
        body: JSON.stringify({ userId: user.id }),
      });

      setWishes(prev => prev.map(w => 
        w.id === wishId 
          ? { ...w, likes: result.totalLikes, isLiked: result.isLiked }
          : w
      ));
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
