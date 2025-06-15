
import { supabase } from '@/integrations/supabase/client';
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
      const { data, error } = await supabase
        .from('wishes')
        .insert([{
          ...wishData,
          user_id: user.id,
        }])
        .select(`
          *,
          profiles (full_name, avatar_url)
        `)
        .single();

      if (error) throw error;

      const newWish = {
        ...data,
        isLiked: false,
        isOwner: true,
      };

      setWishes(prev => [newWish, ...prev]);
      
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
      const { error } = await supabase
        .from('wishes')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

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
      const { error } = await supabase
        .from('wishes')
        .delete()
        .eq('id', id);

      if (error) throw error;

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
