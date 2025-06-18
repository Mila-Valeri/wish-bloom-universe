
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { FormField } from "@/components/FormField";
import { LinkInput } from "@/components/LinkInput";
import { StatusSelect } from "@/components/StatusSelect";
import { useWishContext } from "@/contexts/WishContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface EditWishFormProps {
  wishId: string;
  onSaved?: () => void;
}

export default function EditWishForm({ wishId, onSaved }: EditWishFormProps) {
  const { wishes, updateWish, uploadImage } = useWishContext();
  const { t } = useLanguage();
  const wish = wishes.find((w) => w.id === wishId);

  const WISH_STATUS = [
    { label: t.notCompleted, value: "not_completed" },
    { label: t.completed, value: "completed" },
  ];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (wish) {
      setTitle(wish.title || "");
      setDescription(wish.description ?? "");
      setLink(wish.link ?? "");
      setStatus((wish.status as string) ?? "");
      setImagePreview(wish.image_url ?? null);
    }
  }, [wish]);

  if (!wish) {
    return <div className="p-4 text-center text-muted-foreground">{t.errorUpdatingWish}</div>;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = wish.image_url ?? null;
    if (image) {
      imageUrl = await uploadImage(image) || imageUrl;
    }
    await updateWish(wish.id, {
      title,
      description,
      link: link || undefined,
      image_url: imageUrl,
      status: status || undefined,
    });
    setLoading(false);
    if (onSaved) onSaved();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-background p-6 rounded-lg shadow-lg space-y-4 mt-4">
      <FormField
        label={t.title}
        value={title}
        onChange={setTitle}
        placeholder={t.titlePlaceholder}
        required={true}
        disabled={loading}
      />
      
      <FormField
        label={t.description}
        value={description}
        onChange={(value) => {
          if (value.length <= 1000) setDescription(value);
        }}
        type="textarea"
        placeholder={t.descriptionPlaceholder}
        maxLength={1000}
        showCharCount={true}
        disabled={loading}
      />
      
      <LinkInput
        label={t.link}
        value={link}
        onChange={setLink}
        placeholder={t.linkPlaceholder}
        disabled={loading}
      />
      
      <StatusSelect
        label={`${t.status} (${t.optional})`}
        value={status}
        onChange={setStatus}
        options={WISH_STATUS}
        placeholder={t.noStatus}
        disabled={loading}
      />
      
      <div className="space-y-2">
        <div className="text-sm font-medium">{t.image}</div>
        {imagePreview ? (
          <div className="relative group">
            <img src={imagePreview} alt="Preview" className="w-full h-36 object-cover rounded-md border-2 border-muted-foreground/25" />
            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={removeImage}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center hover:border-muted-foreground/50 transition-colors">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <label htmlFor="image" className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              {t.clickToSelect}
              <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        )}
      </div>
      <Button type="submit" className="w-full py-3" disabled={loading}>
        {loading ? t.updating : t.save}
      </Button>
    </form>
  );
}
