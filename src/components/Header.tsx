
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from './SearchBar';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';

const Header = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isHomePage = location.pathname === '/';
  const isSearchPage = location.pathname === '/search';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
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
        </div>

        {(!isMobile || menuOpen) && (
          <nav
            className={`${
              isMobile
                ? 'absolute top-16 left-0 w-full bg-background border-b p-4'
                : 'flex gap-4 ml-4'
            }`}
          >
            <Link
              to="/"
              className={`${
                isHomePage
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground'
              } hover:text-foreground transition-colors ${
                isMobile ? 'block py-2' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`${
                isSearchPage
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground'
              } hover:text-foreground transition-colors ${
                isMobile ? 'block py-2' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Browse
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!isMobile && <SearchBar />}
          <ThemeToggle />
          
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <UserMenu />
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
