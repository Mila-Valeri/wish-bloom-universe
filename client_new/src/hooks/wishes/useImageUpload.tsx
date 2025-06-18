
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../useAuth';

export const useImageUpload = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiRequest('/api/upload', {
        method: 'POST',
        body: formData,
      });

      return response.url;
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
    uploadImage,
  };
};
