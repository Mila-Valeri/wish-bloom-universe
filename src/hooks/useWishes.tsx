
import { useWishesData } from './wishes/useWishesData';
import { useWishMutations } from './wishes/useWishMutations';
import { useWishLikes } from './wishes/useWishLikes';
import { useImageUpload } from './wishes/useImageUpload';

export type { Wish } from './wishes/useWishesData';

export const useWishes = () => {
  const { wishes, setWishes, loading, refreshWishes } = useWishesData();
  const { createWish, updateWish, deleteWish } = useWishMutations(setWishes);
  const { toggleLike } = useWishLikes(wishes, setWishes);
  const { uploadImage } = useImageUpload();

  return {
    wishes,
    loading,
    createWish,
    updateWish,
    deleteWish,
    toggleLike,
    uploadImage,
    refreshWishes,
  };
};
