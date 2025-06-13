
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
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createWish, uploadImage } = useWishes();

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
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      });

      // Reset form
      setTitle('');
      setDescription('');
      setLink('');
      setTags('');
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
            <Label htmlFor="description" className="text-sm md:text-base">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about your wish..."
              rows={3}
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
              placeholder="https://example.com"
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm md:text-base">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="travel, books, gadgets (comma separated)"
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm md:text-base">Image</Label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-24 md:h-32 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 md:top-2 md:right-2 h-6 w-6 md:h-8 md:w-8"
                  onClick={removeImage}
                >
                  <X className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-4 md:p-6 text-center">
                <Upload className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-muted-foreground" />
                <Label htmlFor="image" className="cursor-pointer">
                  <span className="text-xs md:text-sm text-muted-foreground">
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
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full text-sm md:text-base py-2 md:py-3" 
            disabled={loading || !title}
          >
            {loading ? 'Creating...' : 'Create Wish'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
