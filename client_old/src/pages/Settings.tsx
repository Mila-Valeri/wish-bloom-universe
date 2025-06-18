import { useState } from 'react';
import { Eye, EyeOff, Settings as SettingsIcon, Shield, Trash2, Sparkles, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreateWishDialog } from '@/components/wishes/CreateWishDialog';

const Settings = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [createWishOpen, setCreateWishOpen] = useState(false);

  const handlePasswordSave = () => {
    if (newPassword !== repeatPassword) {
      alert(t.passwordsDoNotMatch);
      return;
    }
    // TODO: Implement password change logic
    console.log('Password change requested');
  };

  const handleEmailRemove = () => {
    // TODO: Implement email removal logic
    console.log('Email removal requested');
  };

  const handleEmailAdd = () => {
    // TODO: Implement email addition logic
    console.log('Email addition requested:', newEmail);
    setNewEmail('');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion logic
    console.log('Account deletion requested');
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen bg-background dream-bg">
      <Header
        isAuthenticated={!!user}
        onSignOut={signOut}
        onCreateWish={() => setCreateWishOpen(true)}
        userProfile={profile}
      />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Main settings animation */}
        <div className="absolute top-10 right-10 settings-rotate opacity-20">
          <SettingsIcon className="h-20 w-20 text-primary" />
        </div>
        
        {/* Decorative sparkles */}
        <div className="absolute top-32 left-10 sparkle">
          <Sparkles className="h-6 w-6 text-primary/30" />
        </div>
        <div className="absolute top-48 left-20 sparkle" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="h-8 w-8 text-purple-400/30" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent profile-shine">
              {t.settingsTitle}
            </h1>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="transition-all duration-300 hover:scale-105">
                {t.loginSecurity}
              </TabsTrigger>
              <TabsTrigger value="account" className="transition-all duration-300 hover:scale-105">
                {t.accountManagement}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="relative">
              {/* Security animation */}
              <div className="absolute top-4 right-4 shield-glow">
                <Shield className="h-16 w-16 text-primary/40" />
              </div>
              
              <div className="space-y-6">
                {/* Email Section */}
                <Card className="backdrop-blur-sm bg-card/50 border-2 border-primary/10 shadow-lg wish-glow">
                  <CardHeader>
                    <CardTitle className="text-xl">{t.emailAddress}</CardTitle>
                    <CardDescription>{t.manageEmail}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">{user?.email}</span>
                      <Button variant="destructive" size="sm" onClick={handleEmailRemove}>
                        {t.removeEmail}
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder={t.enterNewEmail}
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleEmailAdd}>{t.addEmail}</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Password Section */}
                <Card className="backdrop-blur-sm bg-card/50 border-2 border-primary/10 shadow-lg wish-glow">
                  <CardHeader>
                    <CardTitle className="text-xl">{t.password}</CardTitle>
                    <CardDescription>{t.changePassword}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">{t.currentPassword}</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder={t.enterCurrentPassword}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">{t.newPassword}</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder={t.enterNewPassword}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="repeat-password">{t.repeatNewPassword}</Label>
                      <div className="relative">
                        <Input
                          id="repeat-password"
                          type={showRepeatPassword ? "text" : "password"}
                          value={repeatPassword}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          placeholder={t.repeatPassword}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        >
                          {showRepeatPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <Button onClick={handlePasswordSave} className="hover:scale-105 transition-transform">
                        {t.savePassword}
                      </Button>
                      <Button variant="link" className="text-primary hover:underline">
                        {t.forgotPassword}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="account" className="relative">
              {/* Account management animation */}
              <div className="absolute top-4 right-4 float-away opacity-60">
                <Trash2 className="h-16 w-16 text-destructive/40" />
              </div>
              
              <Card className="backdrop-blur-sm bg-card/50 border-2 border-destructive/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-destructive">{t.deleteAccount}</CardTitle>
                  <CardDescription>
                    {t.permanentlyDeleteAccount}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="hover:scale-105 transition-transform">
                        {t.deleteMyAccount}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t.absolutelySure}</DialogTitle>
                        <DialogDescription>
                          {t.removeAllData}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                          {t.cancel}
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          {t.yesDeleteAccount}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CreateWishDialog 
        open={createWishOpen} 
        onOpenChange={setCreateWishOpen} 
      />
    </div>
  );
};

export default Settings;
