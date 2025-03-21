
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { toast } from 'sonner';

// Use the credentials from your connected Supabase project
const supabaseUrl = "https://znsjwpxngsbxunduadsy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpuc2p3cHhuZ3NieHVuZHVhZHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODExOTIsImV4cCI6MjA1ODE1NzE5Mn0.xSET8LBr6AZagcru_H_IP0IAiiCEkLk3MBshJb9ee9g";

// Create and export Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check if valid Supabase credentials exist
export const hasValidSupabaseCredentials = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
