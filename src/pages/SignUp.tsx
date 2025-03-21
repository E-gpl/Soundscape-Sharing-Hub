
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Github,
  Apple,
  Facebook,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { hasValidSupabaseCredentials } from '@/lib/supabase';

const SignUp = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(true);
  const [connectionChecked, setConnectionChecked] = useState(false);
  
  // Check if Supabase connection is valid on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isValid = hasValidSupabaseCredentials();
        setHasCredentials(isValid);
        
        if (isValid) {
          // Try a simple query to test the connection
          const { error } = await import('@/integrations/supabase/client')
            .then(({ supabase }) => supabase.from('artists').select('count', { count: 'exact', head: true }));
          
          if (error) {
            console.error('Supabase connection test failed:', error);
            setHasCredentials(false);
          }
        }
      } catch (error) {
        console.error('Error checking Supabase connection:', error);
        setHasCredentials(false);
      } finally {
        setConnectionChecked(true);
      }
    };
    
    checkConnection();
  }, []);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasCredentials) {
      toast.error('未能连接到数据库。请确保已设置 Supabase 凭据。');
      return;
    }
    
    if (!name || !email || !password) {
      toast.error('请填写所有字段');
      return;
    }
    
    if (!acceptTerms) {
      toast.error('您必须接受条款和隐私政策');
      return;
    }
    
    if (password.length < 8) {
      toast.error('密码必须至少为 8 个字符');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await register(name, email, password);
      if (success) {
        toast.success('账号创建成功！');
        navigate('/profile');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-harmonic-500" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-harmonic-100 dark:bg-harmonic-900">
      <div className="absolute top-0 left-0 right-0 p-4">
        <Link to="/" className="flex items-center justify-center md:justify-start">
          <span className="text-2xl font-bold">Harmonic</span>
        </Link>
      </div>
      
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">创建您的账号</h1>
          <p className="text-harmonic-500">今天加入 Harmonic 社区</p>
        </div>
        
        {!hasCredentials && connectionChecked && (
          <div className="mb-6 p-4 border border-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-700 dark:text-red-400">数据库连接问题</h3>
              <p className="text-sm text-red-600 dark:text-red-300">
                未能连接到 Supabase 数据库。这是演示模式，账户创建功能有限。系统已配置 Supabase 凭据，但可能需要刷新页面或检查控制台错误日志。
              </p>
            </div>
          </div>
        )}
        
        {hasCredentials && connectionChecked && (
          <div className="mb-6 p-4 border border-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-700 dark:text-green-400">数据库连接成功</h3>
              <p className="text-sm text-green-600 dark:text-green-300">
                已成功连接到 Supabase 数据库。您可以正常创建账户和使用所有功能。
              </p>
            </div>
          </div>
        )}
        
        <div className="bg-white dark:bg-harmonic-800 rounded-xl shadow-sm border border-harmonic-200 dark:border-harmonic-700 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">姓名</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="张三"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">电子邮箱</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-harmonic-500 hover:text-harmonic-800"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-harmonic-500">
                密码必须至少为 8 个字符
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="rounded border-harmonic-300 text-accent2 focus:ring-accent2"
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer">
                我接受{' '}
                <Link to="/terms" className="text-accent2 hover:underline">
                  服务条款
                </Link>{' '}
                和{' '}
                <Link to="/privacy" className="text-accent2 hover:underline">
                  隐私政策
                </Link>
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full button-gradient"
              disabled={loading || !hasCredentials || !connectionChecked}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  创建账号中...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  创建账号
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-harmonic-800 px-2 text-harmonic-500">或继续使用</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button variant="outline" className="w-full" disabled>
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full" disabled>
                <Apple className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full" disabled>
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-harmonic-500">
            已有账号？{' '}
            <Link to="/sign-in" className="text-accent2 hover:underline font-medium">
              登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
