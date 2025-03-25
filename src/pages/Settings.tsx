import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Check, Copy, Mail, Key, User, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, updateUserPassword, updateEmail } = useAuth();
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  
  const [newEmail, setNewEmail] = useState('');
  const [emailChangeLoading, setEmailChangeLoading] = useState(false);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);
  
  const [copySuccess, setCopySuccess] = useState(false);
  
  useEffect(() => {
    if (passwordChangeSuccess) {
      const timer = setTimeout(() => {
        setPasswordChangeSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordChangeSuccess]);
  
  useEffect(() => {
    if (emailChangeSuccess) {
      const timer = setTimeout(() => {
        setEmailChangeSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [emailChangeSuccess]);
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setPasswordChangeLoading(true);
    
    try {
      await updateUserPassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordChangeSuccess(true);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password. Please try again.');
    } finally {
      setPasswordChangeLoading(false);
    }
  };
  
  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail) {
      toast.error('Please enter a new email');
      return;
    }
    
    setEmailChangeLoading(true);
    
    try {
      await updateEmail(newEmail);
      setNewEmail('');
      setEmailChangeSuccess(true);
      toast.success('Email updated successfully! Please check your inbox to verify.');
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error('Failed to update email. Please try again.');
    } finally {
      setEmailChangeLoading(false);
    }
  };
  
  const handleApiKeyCopy = async () => {
    if (user?.app_metadata?.provider === 'email') {
      await navigator.clipboard.writeText(user?.id || '');
      setCopySuccess(true);
      
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } else {
      toast.error('You must sign up with email to have an API key');
    }
  };

  const userEmail = user?.user_metadata?.email || user?.email || '';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 animate-fade-in max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Account Settings</h1>
            <p className="text-harmonic-500">Manage your account preferences and settings</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>View and manage your basic account information</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center">
                  <Input 
                    id="email" 
                    type="email" 
                    value={userEmail}
                    readOnly 
                    className="cursor-not-allowed"
                  />
                  {user?.email_confirmed_at ? (
                    <CheckCircle className="h-5 w-5 ml-2 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 ml-2 text-yellow-500" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userId">User ID (API Key)</Label>
                <div className="flex items-center">
                  <Input 
                    id="userId" 
                    type="text" 
                    value={user?.id || ''}
                    readOnly 
                    className="cursor-not-allowed"
                  />
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    onClick={handleApiKeyCopy}
                    disabled={user?.app_metadata?.provider !== 'email'}
                  >
                    {copySuccess ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {user?.app_metadata?.provider !== 'email' && (
                  <p className="text-sm text-muted-foreground mt-1">
                    You must sign up with email to have an API key
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password for enhanced security</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    placeholder="Enter new password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm new password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={passwordChangeLoading}
                  className="w-full"
                >
                  {passwordChangeLoading ? (
                    <>
                      <span className="animate-spin mr-2"><Key className="h-4 w-4" /></span>
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <Key className="h-4 w-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
                
                {passwordChangeSuccess && (
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Password updated successfully!
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Change Email</CardTitle>
              <CardDescription>Update your account email address</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleEmailChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newEmail">New Email</Label>
                  <Input 
                    id="newEmail" 
                    type="email" 
                    placeholder="Enter new email" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={emailChangeLoading}
                  className="w-full"
                >
                  {emailChangeLoading ? (
                    <>
                      <span className="animate-spin mr-2"><Mail className="h-4 w-4" /></span>
                      Updating Email...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Update Email
                    </>
                  )}
                </Button>
                
                {emailChangeSuccess && (
                  <p className="text-sm text-green-500 mt-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Email updated successfully! Please check your inbox to verify.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
