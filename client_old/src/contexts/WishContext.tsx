import { createContext, useContext, ReactNode } from 'react';
import { useWishes, Wish } from '@/hooks/useWishes';

interface WishContextType {
  wishes: Wish[];
  loading: boolean;
  createWish: (wishData: {
    title: string;
    description?: string;
    image_url?: string;
    link?: string;
    tags?: string[];
    status?: string;
  }) => Promise<any>;
  updateWish: (id: string, updates: Partial<Wish>) => Promise<void>;
  deleteWish: (id: string) => Promise<void>;
  toggleLike: (wishId: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string | null>;
  refreshWishes: () => Promise<void>;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const WishProvider = ({ children }: { children: ReactNode }) => {
  const wishHooks = useWishes();

  return (
    <WishContext.Provider value={wishHooks}>
      {children}
    </WishContext.Provider>
  );
};

export const useWishContext = () => {
  const context = useContext(WishContext);
  if (context === undefined) {
    throw new Error('useWishContext must be used within a WishProvider');
  }
  return context;
};