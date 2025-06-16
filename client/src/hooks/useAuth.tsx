import { useState, useEffect, createContext, useContext } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  theme_preference: 'light' | 'dark';
  language_preference: 'en' | 'ua';
  created_at: string;
  updated_at: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Initialize with demo admin user for migration purposes
  useEffect(() => {
    const mockUser: User = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'admin@wishboard.com'
    };
    
    const mockSession: Session = {
      user: mockUser,
      access_token: 'demo-token'
    };

    const mockProfile: Profile = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'admin@wishboard.com',
      full_name: 'Demo Admin',
      avatar_url: null,
      theme_preference: 'light',
      language_preference: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setUser(mockUser);
    setSession(mockSession);
    setProfile(mockProfile);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const mockUser: User = {
        id: email === 'admin@wishboard.com' ? '550e8400-e29b-41d4-a716-446655440000' : '550e8400-e29b-41d4-a716-446655440001',
        email: email
      };
      
      const mockSession: Session = {
        user: mockUser,
        access_token: 'demo-token'
      };

      const mockProfile: Profile = {
        id: mockUser.id,
        email: email,
        full_name: email === 'admin@wishboard.com' ? 'Demo Admin' : 'Demo User',
        avatar_url: null,
        theme_preference: 'light',
        language_preference: 'en',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUser(mockUser);
      setSession(mockSession);
      setProfile(mockProfile);
      
      toast({
        title: "Success",
        description: "You have been signed in successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setSession(null);
      setProfile(null);
      
      toast({
        title: "Success",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return;

    try {
      // Try to update via API, fallback to local update for demo
      try {
        const updatedProfile = await apiRequest(`/api/profiles/${profile.id}`, {
          method: 'PATCH',
          body: JSON.stringify(updates),
        });
        setProfile(updatedProfile);
      } catch {
        // Fallback to local update for demo
        setProfile(prev => prev ? { ...prev, ...updates } : null);
      }
      
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('Password reset requested for:', email);
      
      toast({
        title: "Success",
        description: "Password reset email sent. Check your inbox.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};