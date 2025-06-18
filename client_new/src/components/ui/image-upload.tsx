import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImageCropper } from './image-cropper';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageCropped: (file: File) => void;
  currentImage?: string;
  onRemoveImage?: () => void;
  className?: string;
  disabled?: boolean;
}

export const ImageUpload = ({ 
  onImageCropped, 
  currentImage, 
  onRemoveImage, 
  className = '',
  disabled = false 
}: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          setCropperOpen(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    onImageCropped(croppedFile);
    setSelectedImage(null);
    setCropperOpen(false);
  };

  const handleCropCancel = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      {currentImage ? (
        <div className="relative group">
          <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={currentImage}
              alt="Current image"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={triggerFileSelect}
                  disabled={disabled}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  {t.changeImage}
                </Button>
                {onRemoveImage && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={onRemoveImage}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4 mr-1" />
                    {t.removeImage}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={triggerFileSelect}
          className={`
            w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 
            rounded-lg flex flex-col items-center justify-center space-y-2 
            cursor-pointer hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800 
            transition-colors duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <ImageIcon className="h-12 w-12 text-gray-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {t.uploadImage}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t.clickToSelect}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {t.supportedFormats}
            </p>
          </div>
        </div>
      )}

      {selectedImage && (
        <ImageCropper
          open={cropperOpen}
          onOpenChange={setCropperOpen}
          image={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
};