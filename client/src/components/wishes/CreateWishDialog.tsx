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
import { ImageUpload } from '@/components/ui/image-upload';
import { useWishes } from '@/hooks/useWishes';
import { useImageUpload } from '@/hooks/wishes/useImageUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

interface CreateWishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STATUS_OPTIONS = [
  { label: "Priority", value: "priority" },
  { label: "Completed", value: "completed" },
  { label: "Unfulfilled", value: "unfulfilled" }
];

export const CreateWishDialog = ({ open, onOpenChange }: CreateWishDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createWish } = useWishes();
  const { uploadImage } = useImageUpload();
  const [status, setStatus] = useState("unfulfilled");

  // Character limit for description
  const DESCRIPTION_LIMIT = 1000;
  const remainingChars = DESCRIPTION_LIMIT - description.length;

  const handleImageCropped = async (croppedFile: File) => {
    setLoading(true);
    try {
      const uploadedUrl = await uploadImage(croppedFile);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createWish({
        title,
        description,
        link: link || undefined,
        image_url: imageUrl || undefined,
        status,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setLink('');
      setImageUrl(null);
      setStatus("unfulfilled");
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating wish:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = title.trim() && description.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Wish</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your wish?"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us more about your wish..."
              rows={4}
              disabled={loading}
              maxLength={DESCRIPTION_LIMIT}
              required
            />
            <div className="text-xs text-gray-500 text-right">
              {remainingChars} characters remaining
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link (optional)</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus} disabled={loading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Image (optional)</Label>
            <ImageUpload
              onImageCropped={handleImageCropped}
              currentImage={imageUrl || undefined}
              onRemoveImage={removeImage}
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || loading}
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Create Wish
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};