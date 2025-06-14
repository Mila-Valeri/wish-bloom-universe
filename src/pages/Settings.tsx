
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Settings = () => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handlePasswordSave = () => {
    if (newPassword !== repeatPassword) {
      alert('Passwords do not match');
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
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!user}
        onSignOut={signOut}
        userProfile={profile}
      />
      
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Settings
          </h1>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="transition-all duration-300 hover:scale-105">
                Login & Security
              </TabsTrigger>
              <TabsTrigger value="account" className="transition-all duration-300 hover:scale-105">
                Account Management
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="animate-scale-in">
              <div className="space-y-6">
                {/* Email Section */}
                <Card className="backdrop-blur-sm bg-card/50 border-2 border-primary/10 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Email Address</CardTitle>
                    <CardDescription>Manage your email address</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">{user?.email}</span>
                      <Button variant="destructive" size="sm" onClick={handleEmailRemove}>
                        Remove email
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter new email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleEmailAdd}>Add email</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Password Section */}
                <Card className="backdrop-blur-sm bg-card/50 border-2 border-primary/10 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
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
                      <Label htmlFor="new-password">New password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
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
                      <Label htmlFor="repeat-password">Repeat new password</Label>
                      <div className="relative">
                        <Input
                          id="repeat-password"
                          type={showRepeatPassword ? "text" : "password"}
                          value={repeatPassword}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          placeholder="Repeat new password"
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
                        Save password
                      </Button>
                      <Button variant="link" className="text-primary hover:underline">
                        Forgot password?
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="account" className="animate-scale-in">
              <Card className="backdrop-blur-sm bg-card/50 border-2 border-destructive/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-destructive">Delete Account</CardTitle>
                  <CardDescription>
                    Permanently delete your account and all associated data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="hover:scale-105 transition-transform">
                        Delete my account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove all your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          Yes, delete my account
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
    </div>
  );
};

export default Settings;
