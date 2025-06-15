
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../useAuth';

export interface Wish {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  tags: string[];
  likes: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  status: string | null;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  };
  isLiked?: boolean;
  isOwner?: boolean;
}

export const useWishesData = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchWishes = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('wishes')
        .select(`
          *,
          profiles (full_name, avatar_url),
          wish_likes (user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const wishesWithMetadata = data.map((wish: any) => ({
        ...wish,
        isLiked: user ? wish.wish_likes.some((like: any) => like.user_id === user.id) : false,
        isOwner: user ? wish.user_id === user.id : false,
      }));

      setWishes(wishesWithMetadata);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load wishes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, [user]);

  return {
    wishes,
    setWishes,
    loading,
    refreshWishes: fetchWishes,
  };
};
