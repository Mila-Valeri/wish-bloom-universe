
import { useParams } from "react-router-dom";
import Header from '@/components/Header';
import EditWishForm from "@/components/wishes/EditWishForm";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EditWishPage() {
  const { id } = useParams<{ id: string }>();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  if (!id) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          isAuthenticated={!!user}
          onSignOut={signOut}
        />
        <div className="text-center text-lg mt-10">{t.errorUpdatingWish}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!user}
        onSignOut={signOut}
      />
      <EditWishForm wishId={id} />
    </div>
  );
}
