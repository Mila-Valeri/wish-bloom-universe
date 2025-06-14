
import { useState } from 'react';
import { Heart, User, Settings, LogOut, Plus, Globe, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  theme_preference: 'light' | 'dark';
  language_preference: 'en' | 'ua';
}

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLanguageChange?: (lang: string) => void;
  onSignOut?: () => void;
  currentLanguage?: string;
  userProfile?: UserProfile | null;
  showBackButton?: boolean;
}

const Header = ({ 
  isAuthenticated = false, 
  onLogin, 
  onLanguageChange,
  onSignOut,
  currentLanguage = 'en',
  userProfile,
  showBackButton = false
}: HeaderProps) => {
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleThemeToggle = () => {
    document.body.classList.toggle("dark");
    setIsDark(document.body.classList.contains('dark'));
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/');
    }
  };

  const handleBackClick = () => {
    if (isAuthenticated) {
      navigate('/');
    }
  };

  // Check if we're on profile or settings pages
  const isOnProfileOrSettings = location.pathname === '/profile' || location.pathname === '/settings';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-2 md:px-4">
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Back button for Profile and Settings pages - only for authenticated users */}
          {isOnProfileOrSettings && isAuthenticated && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBackClick}
              className="h-8 w-8 md:h-10 md:w-10 hover:bg-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          )}
          
          <div className="flex items-center space-x-1 md:space-x-2">
            <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary fill-current" />
            <span 
              className={`text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent ${
                isAuthenticated ? 'cursor-pointer hover:scale-105 transition-transform' : ''
              }`}
              onClick={handleLogoClick}
            >
              WishBoard
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                <Globe className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              <DropdownMenuItem onClick={() => onLanguageChange?.('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange?.('ua')}>
                Українська
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <input 
              id="checkbox" 
              type="checkbox" 
              checked={isDark}
              onChange={handleThemeToggle}
              className="sr-only"
            />
            <label 
              htmlFor="checkbox" 
              className="cursor-pointer flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-md hover:bg-accent transition-colors"
            >
              {isDark ? (
                <span className="text-lg">☀️</span>
              ) : (
                <span className="text-lg">🌙</span>
              )}
            </label>
          </div>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 md:h-10 md:w-10 rounded-full">
                  {userProfile?.avatar_url ? (
                    <img 
                      src={userProfile.avatar_url} 
                      alt="Avatar" 
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 md:h-6 md:w-6" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create Wish</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-1 md:space-x-2">
              <Button onClick={onLogin} className="text-sm md:text-base px-2 md:px-4">
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
