
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWishes } from '@/hooks/useWishes';
import { Upload, X } from 'lucide-react';

interface CreateWishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateWishDialog = ({ open, onOpenChange }: CreateWishDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  // Удаляем tags
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createWish, uploadImage } = useWishes();

  // Character limit for description
  const DESCRIPTION_LIMIT = 1000;
  const remainingChars = DESCRIPTION_LIMIT - description.length;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      await createWish({
        title,
        description: description || undefined,
        image_url: imageUrl || undefined,
        link: link || undefined,
        // Удалено поле tags
      });

      // Reset form
      setTitle('');
      setDescription('');
      setLink('');
      removeImage();
      onOpenChange(false);
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">Create New Wish</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm md:text-base">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="What do you wish for?"
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-sm md:text-base">Description</Label>
              <span className={`text-xs ${remainingChars < 100 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {remainingChars}/{DESCRIPTION_LIMIT}
              </span>
            </div>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= DESCRIPTION_LIMIT) {
                  setDescription(e.target.value);
                }
              }}
              placeholder="Tell us more about your wish... (up to 1000 characters)"
              rows={4}
              className="text-sm md:text-base resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link" className="text-sm md:text-base">Link</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com (opens in new tab)"
              className="text-sm md:text-base"
            />
          </div>

          {/* Блок Tags полностью удалён */}

          <div className="space-y-2">
            <Label className="text-sm md:text-base">Image</Label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-32 md:h-40 object-cover rounded-md border-2 border-dashed border-muted-foreground/25"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center hover:border-muted-foreground/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <Label htmlFor="image" className="cursor-pointer">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Click to upload an image
                  </span>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Image will be automatically resized to fit
                </p>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full text-sm md:text-base py-3" 
            disabled={loading || !title}
          >
            {loading ? 'Creating...' : 'Create Wish'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
