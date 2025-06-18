
import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchWishes = async () => {
    try {
      setLoading(true);
      
      const data = await apiRequest('/api/wishes');
      
      const wishesWithMetadata = data.map((wish: any) => ({
        ...wish,
        isLiked: false, // Will be updated by like functionality
        isOwner: user ? wish.user_id === user.id : false,
      }));

      setWishes(wishesWithMetadata);
    } catch (error: any) {
      // Set demo data for migration
      const demoWishes: Wish[] = [
        {
          id: '550e8400-e29b-41d4-a716-446655440010',
          title: 'Learn Web Development',
          description: 'Master React, Node.js, and modern web technologies',
          image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
          link: 'https://reactjs.org',
          tags: ['coding', 'web-development', 'react'],
          likes: 12,
          status: 'unfulfilled',
          user_id: '550e8400-e29b-41d4-a716-446655440000',
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-01-15T10:00:00Z',
          profiles: {
            full_name: 'Demo Admin',
            avatar_url: null,
          },
          isLiked: false,
          isOwner: user?.id === '550e8400-e29b-41d4-a716-446655440000',
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440011',
          title: 'Travel to Japan',
          description: 'Experience the culture, food, and beautiful landscapes',
          image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
          link: 'https://japan.travel',
          tags: ['travel', 'culture', 'adventure'],
          likes: 8,
          status: 'unfulfilled',
          user_id: '550e8400-e29b-41d4-a716-446655440000',
          created_at: '2024-01-14T15:30:00Z',
          updated_at: '2024-01-14T15:30:00Z',
          profiles: {
            full_name: 'Demo Admin',
            avatar_url: null,
          },
          isLiked: false,
          isOwner: user?.id === '550e8400-e29b-41d4-a716-446655440000',
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440012',
          title: 'Start a Garden',
          description: 'Grow organic vegetables and beautiful flowers',
          image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
          link: null,
          tags: ['gardening', 'nature', 'healthy-living'],
          likes: 15,
          status: 'unfulfilled',
          user_id: '550e8400-e29b-41d4-a716-446655440000',
          created_at: '2024-01-13T09:15:00Z',
          updated_at: '2024-01-13T09:15:00Z',
          profiles: {
            full_name: 'Demo Admin',
            avatar_url: null,
          },
          isLiked: false,
          isOwner: user?.id === '550e8400-e29b-41d4-a716-446655440000',
        }
      ];
      setWishes(demoWishes);
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
