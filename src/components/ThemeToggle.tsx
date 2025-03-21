
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
        className={`rounded-full p-2 ${size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'} hover:bg-harmonic-200/50 dark:hover:bg-harmonic-800/50 transition-all duration-300`}
      >
        {theme === 'dark' ? (
          <Sun className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} transition-all text-yellow-400`} />
        ) : (
          <Moon className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} transition-all text-blue-500`} />
        )}
      </Toggle>
    );
  }
  
  return (
    <Button
      variant={variant === 'default' ? 'default' : 'outline'}
      size={size}
      onClick={handleToggle}
      className="rounded-full relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 dark:from-blue-500 dark:to-purple-600"></span>
      {theme === 'dark' ? (
        <Sun className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} text-yellow-400`} />
      ) : (
        <Moon className={`${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} text-blue-500`} />
      )}
    </Button>
  );
};

export default ThemeToggle;
