
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
  AlertTriangle,
  Info
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
  const [error, setError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!hasValidSupabaseCredentials()) {
      setError('Could not connect to database. Please check Supabase credentials.');
      toast.error('Could not connect to database. Please check Supabase credentials.');
      return;
    }
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!acceptTerms) {
      setError('You must accept the terms and privacy policy');
      toast.error('You must accept the terms and privacy policy');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await register(name, email, password);
      if (success) {
        setRegistrationSuccess(true);
        console.log('Registration successful, showing verification message');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed, please try again');
      toast.error(`Registration failed: ${error.message || 'Please try again'}`);
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
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-harmonic-500">Join the Harmonic community today</p>
        </div>
        
        <div className="bg-white dark:bg-harmonic-800 rounded-xl shadow-sm border border-harmonic-200 dark:border-harmonic-700 p-6 md:p-8">
          {registrationSuccess ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4">
                <Info className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Email Verification Required</h2>
              <p className="text-harmonic-500 mb-4">
                We've sent a verification email to <strong>{email}</strong>. 
                Please check your inbox and click the verification link to complete your registration.
              </p>
              <p className="text-harmonic-500 mb-6">
                After verifying your email, you will be able to sign in to your account.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-md p-3 mb-4 text-blue-700 dark:text-blue-400 text-sm flex items-start">
                <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>If you don't see the email within a few minutes, please check your spam folder or contact support for assistance.</p>
              </div>
              <Link to="/sign-in">
                <Button className="w-full">Go to Sign In</Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-400 text-sm flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                    Password must be at least 8 characters
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
                    I accept the{' '}
                    <Link to="/terms" className="text-accent2 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-accent2 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-md text-blue-700 dark:text-blue-400 text-sm flex items-start">
                  <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>After registration, you will need to verify your email address before you can sign in. An email will be sent to your inbox with verification instructions.</p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full button-gradient"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Create Account
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
                    <span className="bg-white dark:bg-harmonic-800 px-2 text-harmonic-500">Or continue with</span>
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
            </>
          )}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-harmonic-500">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-accent2 hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
