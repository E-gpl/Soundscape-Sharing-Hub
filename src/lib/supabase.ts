
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { toast } from 'sonner';

// Get Supabase URL and anonymous key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables exist
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

// Create and export Supabase client
export const supabase = createClient<Database>(
  supabaseUrl || 'https://your-project-url.supabase.co',
  supabaseAnonKey || 'your-anon-key'
);

// Helper function to check if valid Supabase credentials exist
export const hasValidSupabaseCredentials = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

// Helper function to display warning if credentials are missing
export const checkSupabaseCredentials = () => {
  if (!hasValidSupabaseCredentials()) {
    toast.warning(
      "Supabase credentials are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment to enable database functionality.",
      { duration: 6000 }
    );
    return false;
  }
  return true;
};
