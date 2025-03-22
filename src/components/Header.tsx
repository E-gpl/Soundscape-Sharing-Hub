
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, User, HelpCircle } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SearchBar from '@/components/SearchBar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const isMobile = useIsMobile();
  const { isAuthenticated, logout } = useAuth();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Harmonic</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/search" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Search
            </Link>
            <Link 
              to="/help" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Help
            </Link>
          </div>
        </div>
        
        <div className="flex-1 mx-4 max-w-md hidden md:block">
          <SearchBar />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="button-gradient" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          <button
            className="inline-flex items-center justify-center md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-background border-b border-border">
          <div className="mb-4">
            <SearchBar />
          </div>
          
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/search"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link 
              to="/help"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HelpCircle className="h-4 w-4" />
              Help
            </Link>
            
            <div className="h-px bg-border my-1" />
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Button 
                  variant="ghost" 
                  className="justify-start px-3"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full button-gradient">Sign Up</Button>
                </Link>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Theme</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
