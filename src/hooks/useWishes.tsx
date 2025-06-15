import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';

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

export const useWishes = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchWishes();
  }, [user]);

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

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('wish-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('wish-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    wishes,
    loading,
    createWish,
    updateWish,
    deleteWish,
    toggleLike,
    uploadImage,
    refreshWishes: fetchWishes,
  };
};
