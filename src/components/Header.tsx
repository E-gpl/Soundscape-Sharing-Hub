
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { Menu, Home, Search, Upload, Settings, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from './SearchBar';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const Header = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  const isHomePage = location.pathname === '/';
  const isSearchPage = location.pathname === '/search';
  const isUploadPage = location.pathname === '/upload';
  const isProfilePage = location.pathname === '/profile';
  const isSettingsPage = location.pathname === '/settings';

  // Get email safely using optional chaining
  const userEmail = user?.email || '';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <Link to="/" className="text-2xl font-bold">
            Harmonic
          </Link>
          
          {!isMobile && (
            <NavigationMenu className="ml-4">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={navigationMenuTriggerStyle({ 
                      className: isHomePage ? "font-medium text-foreground" : "text-muted-foreground" 
                    })}
                  >
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={navigationMenuTriggerStyle({ 
                      className: isSearchPage ? "font-medium text-foreground" : "text-muted-foreground" 
                    })}
                  >
                    <Link to="/search">Browse</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {isAuthenticated && (
                  <>
                    <NavigationMenuItem>
                      <NavigationMenuLink 
                        asChild
                        className={navigationMenuTriggerStyle({ 
                          className: isUploadPage ? "font-medium text-foreground" : "text-muted-foreground" 
                        })}
                      >
                        <Link to="/upload">Upload</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        {isMobile && menuOpen && (
          <nav className="absolute top-16 left-0 w-full bg-background border-b p-4 z-50">
            <Link
              to="/"
              className={`${
                isHomePage
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground'
              } hover:text-foreground transition-colors flex items-center gap-2 py-2`}
              onClick={() => setMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/search"
              className={`${
                isSearchPage
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground'
              } hover:text-foreground transition-colors flex items-center gap-2 py-2`}
              onClick={() => setMenuOpen(false)}
            >
              <Search className="h-4 w-4" />
              <span>Browse</span>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className={`${
                    isProfilePage
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  } hover:text-foreground transition-colors flex items-center gap-2 py-2`}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    {userEmail.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span>Profile</span>
                </Link>
                <Link
                  to="/upload"
                  className={`${
                    isUploadPage
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  } hover:text-foreground transition-colors flex items-center gap-2 py-2`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Music</span>
                </Link>
                <Link
                  to="/settings"
                  className={`${
                    isSettingsPage
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  } hover:text-foreground transition-colors flex items-center gap-2 py-2`}
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
                <button
                  className="hover:text-foreground transition-colors flex items-center gap-2 py-2 text-muted-foreground w-full text-left"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!isMobile && <SearchBar />}
          <ThemeToggle />
          
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <UserMenu onLogout={handleLogout} />
              ) : (
                <>
                  <Link to="/sign-in">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
