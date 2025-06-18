import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageCropperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: string;
  onCropComplete: (croppedImage: File) => void;
  onCancel: () => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ASPECT_RATIOS = {
  '4:3': 4 / 3,
  '1:1': 1,
  'free': undefined,
};

export const ImageCropper = ({ open, onOpenChange, image, onCropComplete, onCancel }: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(ASPECT_RATIOS['free']);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const { t } = useLanguage();

  const onCropCompleteCallback = useCallback(
    (croppedArea: any, croppedAreaPixels: CropArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: CropArea,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ): Promise<File> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const rotRad = getRadianAngle(rotation);

    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');

    if (!croppedCtx) {
      throw new Error('No 2d context');
    }

    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'cropped-image.webp', {
            type: 'image/webp',
            lastModified: Date.now(),
          });
          resolve(file);
        }
      }, 'image/webp', 0.9);
    });
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getRadianAngle = (degreeValue: number) => {
    return (degreeValue * Math.PI) / 180;
  };

  const rotateSize = (width: number, height: number, rotation: number) => {
    const rotRad = getRadianAngle(rotation);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
  };

  const handleSave = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
        onCropComplete(croppedImage);
        onOpenChange(false);
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full flex flex-col p-0 gap-0 sm:max-w-6xl">
        {/* Header */}
        <DialogHeader className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <DialogTitle className="text-lg font-semibold text-center">{t.cropImage}</DialogTitle>
        </DialogHeader>
        
        {/* Main cropping area - takes most of the space */}
        <div className="flex-1 relative bg-black overflow-hidden min-h-0">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            maxZoom={5}
            minZoom={0.5}
            wheelZoomSensitivity={0.1}
            touchZoomSensitivity={0.1}
            classes={{
              containerClassName: 'w-full h-full',
              cropAreaClassName: 'border-white border-2 shadow-lg',
              mediaClassName: 'object-contain'
            }}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                position: 'relative'
              }
            }}
          />
        </div>

        {/* Controls - Compact layout for mobile */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {/* Aspect Ratio - Top row on mobile */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-center space-x-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-0 flex-shrink-0">
                {t.aspectRatio}
              </label>
              <Select value={aspect?.toString() || 'free'} onValueChange={(value) => {
                if (value === 'free') {
                  setAspect(undefined);
                } else {
                  setAspect(parseFloat(value));
                }
              }}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">{t.optional}</SelectItem>
                  <SelectItem value="1">1:1</SelectItem>
                  <SelectItem value="1.3333333333333333">4:3</SelectItem>
                  <SelectItem value="1.7777777777777777">16:9</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Zoom and Rotation Controls */}
          <div className="px-4 py-3 space-y-3">
            {/* Zoom Control */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-0 flex-shrink-0 w-20">
                {t.zoom}: {Math.round(zoom * 100)}%
              </label>
              <Slider
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
                min={0.5}
                max={5}
                step={0.1}
                className="flex-1"
              />
            </div>

            {/* Rotation Control */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-0 flex-shrink-0 w-20">
                {t.rotation}: {rotation}°
              </label>
              <Slider
                value={[rotation]}
                onValueChange={(value) => setRotation(value[0])}
                min={0}
                max={360}
                step={1}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <DialogFooter className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex w-full space-x-3">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1 sm:flex-none"
            >
              {t.cancel}
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
            >
              {t.applyCrop}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};