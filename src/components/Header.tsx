
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, Upload, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'navbar-blur' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-harmonic-900 dark:text-harmonic-100 mr-10">
            Harmonic
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/browse">Browse</NavLink>
            <NavLink to="/upload">Upload</NavLink>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <SearchBar />
          </div>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/sign-in">
            <Button variant="outline" className="font-medium">
              Sign In
            </Button>
          </Link>
          
          <Link to="/sign-up">
            <Button className="font-medium button-gradient">
              Sign Up
            </Button>
          </Link>
        </div>
        
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-morphism animate-slide-up">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/" className="px-4 py-2 hover:bg-harmonic-200/40 rounded-md">
              Home
            </Link>
            <Link to="/browse" className="px-4 py-2 hover:bg-harmonic-200/40 rounded-md">
              Browse
            </Link>
            <Link to="/upload" className="px-4 py-2 hover:bg-harmonic-200/40 rounded-md">
              Upload
            </Link>
            <Link to="/profile" className="px-4 py-2 hover:bg-harmonic-200/40 rounded-md">
              Profile
            </Link>
            <Link to="/sign-in" className="px-4 py-2 hover:bg-harmonic-200/40 rounded-md">
              Sign In
            </Link>
            <Link to="/sign-up" className="px-4 py-2 hover:bg-harmonic-200/40 rounded-md">
              Sign Up
            </Link>
            
            <div className="pt-2">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`link-hover text-sm font-medium transition-colors ${
        isActive 
          ? 'text-harmonic-900 dark:text-harmonic-100' 
          : 'text-harmonic-500 hover:text-harmonic-900 dark:hover:text-harmonic-100'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
