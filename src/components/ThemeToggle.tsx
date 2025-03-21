
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

interface ThemeToggleProps {
  variant?: 'default' | 'outline' | 'subtle';
  size?: 'default' | 'sm' | 'lg';
}

const ThemeToggle = ({ 
  variant = 'outline',
  size = 'default' 
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  
  const handleToggle = () => {
    toggleTheme();
  };
  
  if (variant === 'subtle') {
    return (
      <Toggle
        aria-label="Toggle theme"
        onClick={handleToggle}
        className={`rounded-full p-2 ${size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'}`}
      >
        {theme === 'dark' ? (
          <Sun className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} transition-all`} />
        ) : (
          <Moon className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} transition-all`} />
        )}
      </Toggle>
    );
  }
  
  return (
    <Button
      variant={variant === 'default' ? 'default' : 'outline'}
      size={size}
      onClick={handleToggle}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}`} />
      ) : (
        <Moon className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}`} />
      )}
    </Button>
  );
};

export default ThemeToggle;
