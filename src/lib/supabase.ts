
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

// 从环境变量获取 Supabase URL 和匿名密钥
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 检查环境变量是否存在
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Using fallback configuration for development.');
}

// 使用实际环境变量或回退到公共 URL 以防止初始化错误
// 在生产环境中应正确设置这些环境变量
const finalUrl = supabaseUrl || 'https://YOUR_SUPABASE_URL.supabase.co';
const finalKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// 创建并导出 Supabase 客户端
export const supabase = createClient<Database>(finalUrl, finalKey);

// 提供一个辅助函数来检查是否有真实的 Supabase 凭证
export const hasValidSupabaseCredentials = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
