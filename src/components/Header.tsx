
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Upload, User, LogOut, Settings, HelpCircle } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useMobile } from '@/hooks/use-mobile';

const Header = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
  // Check if we're on a transparent header page
  const isTransparentHeader = location.pathname === '/';
  
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        (isScrolled || !isTransparentHeader) 
          ? 'bg-background/80 backdrop-blur-md border-b'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-accent1 to-accent2 bg-clip-text text-transparent hidden md:inline">
              Harmonic
            </span>
            <span className="text-2xl font-bold md:hidden">H</span>
          </Link>
          
          {/* Main Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/search" className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-accent1 ${isActive ? 'text-accent1' : 'text-foreground'}`
            }>
              Search
            </NavLink>
            <NavLink to="/help" className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-accent1 ${isActive ? 'text-accent1' : 'text-foreground'}`
            }>
              Help
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/upload" className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-accent1 ${isActive ? 'text-accent1' : 'text-foreground'}`
                }>
                  Upload
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-accent1 ${isActive ? 'text-accent1' : 'text-foreground'}`
                }>
                  Library
                </NavLink>
              </>
            )}
          </nav>
        </div>
        
        {/* Search Bar */}
        {!isMobile && location.pathname !== '/search' && (
          <div className="flex-1 max-w-md mx-4">
            <SearchBar />
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="User menu">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/upload" className="cursor-pointer flex items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/help" className="cursor-pointer flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile/settings" className="cursor-pointer flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/sign-in">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm" className="button-gradient">Sign Up</Button>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/search" className="flex items-center gap-2 py-2 text-foreground hover:text-accent1 transition-colors">
                  Search
                </Link>
                <Link to="/help" className="flex items-center gap-2 py-2 text-foreground hover:text-accent1 transition-colors">
                  Help
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center gap-2 py-2 text-foreground hover:text-accent1 transition-colors">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link to="/upload" className="flex items-center gap-2 py-2 text-foreground hover:text-accent1 transition-colors">
                      <Upload className="h-4 w-4" />
                      Upload
                    </Link>
                    <Link to="/profile/settings" className="flex items-center gap-2 py-2 text-foreground hover:text-accent1 transition-colors">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 py-2 text-foreground hover:text-accent1 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link to="/sign-in">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/sign-up">
                      <Button className="w-full button-gradient">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
