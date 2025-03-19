
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/models';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would check for a valid token/session
        const storedUser = localStorage.getItem('harmonic_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('harmonic_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This would be a real API call in a production app
      console.log('Logging in with:', email);
      
      // For demo, we're creating a mock user
      if (email && password) {
        const mockUser: User = {
          id: 'user1',
          name: 'Demo User',
          username: email.split('@')[0],
        };
        
        setUser(mockUser);
        localStorage.setItem('harmonic_user', JSON.stringify(mockUser));
        toast.success('Logged in successfully!');
        return true;
      }
      toast.error('Invalid credentials');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This would be a real API call in a production app
      console.log('Registering with:', { name, email });
      
      if (name && email && password) {
        const mockUser: User = {
          id: 'user1',
          name: name,
          username: email.split('@')[0],
        };
        
        setUser(mockUser);
        localStorage.setItem('harmonic_user', JSON.stringify(mockUser));
        toast.success('Registered successfully!');
        return true;
      }
      toast.error('Please fill all required fields');
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('harmonic_user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('harmonic_user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
