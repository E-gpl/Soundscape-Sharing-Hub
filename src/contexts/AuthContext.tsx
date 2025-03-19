
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/models';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      setIsLoading(true);
      
      // Get current session
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session?.user) {
        await fetchUserProfile(data.session.user.id);
      }
      
      // Listen for auth changes
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          setSession(newSession);
          
          if (event === 'SIGNED_IN' && newSession?.user) {
            await fetchUserProfile(newSession.user.id);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );
      
      setIsLoading(false);
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          username: data.username,
          avatar: data.avatar || undefined,
          cover: data.cover || undefined,
          bio: data.bio || undefined,
          location: data.location || undefined,
          website: data.website || undefined,
        });
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      if (data.session?.user) {
        await fetchUserProfile(data.session.user.id);
        toast.success('Logged in successfully!');
        return true;
      }
      
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
      // 1. Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return false;
      }
      
      if (!data.user) {
        toast.error('Registration failed. Please try again.');
        return false;
      }
      
      // 2. Create user profile
      const username = email.split('@')[0];
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          name,
          username,
        });
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
        toast.error('Failed to create user profile');
        return false;
      }
      
      // 3. Fetch the created profile
      await fetchUserProfile(data.user.id);
      
      toast.success('Registered successfully!');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user || !session) return false;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name !== undefined ? userData.name : user.name,
          username: userData.username !== undefined ? userData.username : user.username,
          bio: userData.bio !== undefined ? userData.bio : user.bio,
          location: userData.location !== undefined ? userData.location : user.location,
          website: userData.website !== undefined ? userData.website : user.website,
          avatar: userData.avatar !== undefined ? userData.avatar : user.avatar,
          cover: userData.cover !== undefined ? userData.cover : user.cover,
        })
        .eq('id', user.id);
      
      if (error) {
        console.error('Profile update error:', error);
        toast.error('Failed to update profile');
        return false;
      }
      
      // Update local user state
      setUser({ ...user, ...userData });
      toast.success('Profile updated successfully!');
      return true;
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
