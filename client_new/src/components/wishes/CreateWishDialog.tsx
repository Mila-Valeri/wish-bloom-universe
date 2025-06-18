import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ImageUpload } from '@/components/ui/image-upload';
import { FormField } from '@/components/FormField';
import { LinkInput } from '@/components/LinkInput';
import { StatusSelect } from '@/components/StatusSelect';
import { useWishContext } from '@/contexts/WishContext';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const [status, setStatus] = useState<string>("");
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const { createWish, uploadImage } = useWishContext();
  const { t } = useLanguage();

  const STATUS_OPTIONS = [
    { label: t.notCompleted, value: "not_completed" },
    { label: t.completed, value: "completed" }
  ];

  // Character limit for description
  const DESCRIPTION_LIMIT = 1000;
  const remainingChars = DESCRIPTION_LIMIT - description.length;

  const handleImageCropped = async (croppedFile: File) => {
    setLoading(true);
    try {
      // Upload the cropped file and use the uploaded URL directly
      const uploadedUrl = await uploadImage(croppedFile);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Fallback to blob URL if upload fails
      const previewUrl = URL.createObjectURL(croppedFile);
      setImageUrl(previewUrl);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError('Заповніть це поле');
      isValid = false;
    } else {
      setTitleError('');
    }
    
    if (!description.trim()) {
      setDescriptionError('Заповніть це поле');
      isValid = false;
    } else {
      setDescriptionError('');
    }
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      await createWish({
        title,
        description,
        link: link || undefined,
        image_url: imageUrl || undefined,
        status: status || undefined,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setLink('');
      setImageUrl(null);
      setStatus("");
      setTitleError('');
      setDescriptionError('');
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
          <DialogDescription>
            {t.wishDescription || 'Fill in the required fields to create your wish'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label={t.title}
            value={title}
            onChange={(value) => {
              setTitle(value);
              if (titleError && value.trim()) {
                setTitleError('');
              }
            }}
            placeholder={t.titlePlaceholder}
            disabled={loading}
            required={true}
            error={titleError}
          />

          <FormField
            label={t.description}
            value={description}
            onChange={(value) => {
              setDescription(value);
              if (descriptionError && value.trim()) {
                setDescriptionError('');
              }
            }}
            type="textarea"
            placeholder={t.descriptionPlaceholder}
            disabled={loading}
            required={true}
            error={descriptionError}
            maxLength={DESCRIPTION_LIMIT}
            showCharCount={true}
          />

          <LinkInput
            label={`${t.link} (${t.optional})`}
            value={link}
            onChange={setLink}
            placeholder={t.linkPlaceholder}
            disabled={loading}
          />

          <div className="flex gap-2 items-start">
            <StatusSelect
              label={`${t.status} (${t.optional})`}
              value={status}
              onChange={setStatus}
              options={STATUS_OPTIONS}
              placeholder={t.noStatus}
              disabled={loading}
              className="flex-1"
            />
            {status && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setStatus("")}
                disabled={loading}
                className="shrink-0 mt-8"
              >
                ×
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">{t.image} ({t.optional})</div>
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