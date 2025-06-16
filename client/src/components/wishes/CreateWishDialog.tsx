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
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

interface CreateWishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateWishDialog = ({ open, onOpenChange }: CreateWishDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createWish } = useWishes();
  const { uploadImage } = useImageUpload();
  const { t } = useLanguage();
  const [status, setStatus] = useState("unfulfilled");

  const STATUS_OPTIONS = [
    { label: t.priority, value: "priority" },
    { label: t.completed, value: "completed" },
    { label: t.unfulfilled, value: "unfulfilled" }
  ];

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
          <DialogTitle>{t.createWish}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t.title} *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titlePlaceholder}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t.description} *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descriptionPlaceholder}
              rows={4}
              disabled={loading}
              maxLength={DESCRIPTION_LIMIT}
              required
            />
            <div className="text-xs text-gray-500 text-right">
              {remainingChars} {t.charactersRemaining}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">{t.link} ({t.optional})</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={t.linkPlaceholder}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">{t.status}</Label>
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
            <Label>{t.image} ({t.optional})</Label>
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
              {t.cancel}
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || loading}
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading ? t.creating : t.createWish}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};