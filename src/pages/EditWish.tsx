
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import EditWishForm from "@/components/wishes/EditWishForm";
import { useAuth } from '@/hooks/useAuth';

export default function EditWishPage() {
  const { id } = useParams<{ id: string }>();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { user, profile, signOut, updateProfile } = useAuth();

  // Update language when profile changes
  useEffect(() => {
    if (profile?.language_preference) {
      setCurrentLanguage(profile.language_preference);
    }
  }, [profile?.language_preference]);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    if (user && profile) {
      updateProfile({ language_preference: lang as 'en' | 'ua' });
    }
  };

  if (!id) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          isAuthenticated={!!user}
          onLanguageChange={handleLanguageChange}
          currentLanguage={currentLanguage}
          onSignOut={signOut}
          userProfile={profile}
        />
        <div className="text-center text-lg mt-10">No wish ID provided</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!user}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
        onSignOut={signOut}
        userProfile={profile}
      />
      <EditWishForm wishId={id} />
    </div>
  );
}
