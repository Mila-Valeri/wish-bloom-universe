import { useState, useEffect } from 'react';
import { Edit2, User, Save, Heart, Sparkles, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { CreateWishDialog } from '@/components/wishes/CreateWishDialog';

const Profile = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [nameError, setNameError] = useState('');
  const [createWishOpen, setCreateWishOpen] = useState(false);

  useEffect(() => {
    if (profile?.full_name) {
      setEditedName(profile.full_name);
    }
  }, [profile?.full_name]);

  const validateName = (name: string) => {
    if (name.length < 2) {
      return t.nameMinLength;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return t.nameLettersOnly;
    }
    return '';
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedName(profile?.full_name || '');
    setNameError('');
  };

  const handleSave = async () => {
    const error = validateName(editedName);
    if (error) {
      setNameError(error);
      return;
    }

    try {
      await updateProfile({ full_name: editedName });
      setIsEditing(false);
      setNameError('');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(profile?.full_name || '');
    setNameError('');
  };

  return (
    <div className="min-h-screen bg-background dream-bg">
      <Header
        isAuthenticated={!!user}
        onSignOut={signOut}
        onCreateWish={() => setCreateWishOpen(true)}
        userProfile={profile}
      />
      
      {/* Floating hearts animation */}
      <div className="floating-hearts">
        <Heart className="h-6 w-6 text-pink-400 fill-current" />
      </div>
      <div className="floating-hearts">
        <Heart className="h-4 w-4 text-purple-400 fill-current" />
      </div>
      <div className="floating-hearts">
        <Heart className="h-5 w-5 text-primary fill-current" />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Decorative sparkles */}
        <div className="absolute top-20 right-10 sparkle">
          <Sparkles className="h-8 w-8 text-primary/30" />
        </div>
        <div className="absolute top-40 right-20 sparkle" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-6 w-6 text-purple-400/30" />
        </div>
        <div className="absolute top-60 right-32 sparkle" style={{ animationDelay: '2s' }}>
          <Sparkles className="h-10 w-10 text-pink-400/30" />
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent profile-shine">
              {t.profileTitle}
            </h1>
          </div>
          
          <Card className="backdrop-blur-sm bg-card/50 border-2 border-primary/10 shadow-lg wish-glow">
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mb-4 heart-pulse">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl">{t.welcomeProfile}</CardTitle>
              <CardDescription>{t.manageInformation}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.emailAddress}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">{t.fullName}</Label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        id="name"
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder={t.enterFullName}
                        className={nameError ? 'border-destructive' : ''}
                      />
                      {nameError && (
                        <p className="text-sm text-destructive">{nameError}</p>
                      )}
                      <div className="flex gap-2">
                        <Button onClick={handleSave} className="hover:scale-105 transition-transform">
                          <Save className="w-4 h-4 mr-2" />
                          {t.save}
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          {t.cancel}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">
                        {profile?.full_name || t.noNameSet}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleEdit}
                        className="hover:scale-105 transition-transform"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        {t.editName}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>{t.memberSince}</Label>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : t.unknown}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateWishDialog 
        open={createWishOpen} 
        onOpenChange={setCreateWishOpen} 
      />
    </div>
  );
};

export default Profile;
