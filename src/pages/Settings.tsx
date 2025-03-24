
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MusicPlayer from '@/components/MusicPlayer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Lock, 
  LogOut, 
  Shield, 
  Smartphone, 
  User, 
  Loader2,
  Check,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isLoading, isAuthenticated, navigate]);
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    
    setIsUpdating(true);
    
    try {
      // Implement password change logic here
      toast.success("Password updated successfully");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error("Failed to update password");
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirm) {
      try {
        // Implement account deletion logic here
        await logout();
        toast.success("Your account has been deleted");
        navigate('/');
      } catch (error) {
        console.error('Error deleting account:', error);
        toast.error("Failed to delete account");
      }
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error("Failed to log out");
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-harmonic-500" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-10 pb-32">
        <div className="container px-4 md:px-6 max-w-4xl animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Settings</h1>
            <p className="text-harmonic-500">Manage your account preferences</p>
          </div>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6">
              <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="mr-2 h-5 w-5 text-harmonic-500" />
                  Account Information
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-harmonic-100 dark:bg-harmonic-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        value={user?.username || ''}
                        disabled
                        className="bg-harmonic-100 dark:bg-harmonic-700"
                      />
                      <p className="text-xs text-harmonic-500">
                        To change your username, go to your profile page
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-harmonic-200 dark:border-harmonic-700">
                  <h3 className="font-medium mb-3">Connected Devices</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-harmonic-100 dark:bg-harmonic-700/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 text-harmonic-500 mr-3" />
                        <div>
                          <p className="font-medium">Current Device</p>
                          <p className="text-xs text-harmonic-500">Last active now</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        Active
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-red-600 dark:text-red-400">
                  <Shield className="mr-2 h-5 w-5" />
                  Danger Zone
                </h2>
                
                <p className="text-sm mb-4">
                  These actions are permanent and cannot be undone. Please proceed with caution.
                </p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-red-200 dark:border-red-800/30 rounded-lg bg-red-50 dark:bg-red-900/10">
                    <div>
                      <h3 className="font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                      <p className="text-sm text-harmonic-500">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Delete Account
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-harmonic-200 dark:border-harmonic-700 rounded-lg">
                    <div>
                      <h3 className="font-medium">Log out</h3>
                      <p className="text-sm text-harmonic-500">
                        Log out from your current session
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-harmonic-500" />
                  Change Password
                </h2>
                
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </form>
              </div>
              
              <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-harmonic-500" />
                  Security Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-harmonic-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">
                      Set Up
                    </Button>
                  </div>
                  
                  <div className="border-t border-harmonic-200 dark:border-harmonic-700 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Session Management</h3>
                        <p className="text-sm text-harmonic-500">
                          Manage your active sessions
                        </p>
                      </div>
                      <Button variant="outline">
                        View Sessions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-harmonic-500" />
                  Notification Settings
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-harmonic-500">
                        Receive notifications on your device
                      </p>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  
                  <div className="border-t border-harmonic-200 dark:border-harmonic-700 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-harmonic-500">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t border-harmonic-200 dark:border-harmonic-700 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Marketing Emails</h3>
                        <p className="text-sm text-harmonic-500">
                          Receive updates about new features and promotions
                        </p>
                      </div>
                      <Switch
                        checked={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Theme Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-harmonic-500">
                        Use dark theme for the application
                      </p>
                    </div>
                    <Switch
                      checked={darkModeEnabled}
                      onCheckedChange={setDarkModeEnabled}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Settings;
