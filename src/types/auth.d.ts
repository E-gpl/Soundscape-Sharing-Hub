
import { User as SupabaseUser } from '@supabase/supabase-js';

// Extend the Supabase User type with our specific properties
export interface User extends SupabaseUser {
  email?: string;
  created_at?: string;
  email_confirmed_at?: string | null;
  app_metadata?: {
    provider?: string;
    [key: string]: any;
  };
  user_metadata?: {
    email?: string;
    name?: string;
    [key: string]: any;
  };
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  signup: (email: string, password: string) => Promise<{ error: any | null; data: any | null }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  updateUserPassword?: (password: string) => Promise<{ error: any | null }>;
  updateEmail?: (email: string) => Promise<{ error: any | null }>;
}
