
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User as UserIcon, 
  AtSign, 
  MapPin, 
  Link as LinkIcon, 
  FileText,
  Upload,
  Loader2,
  Save,
  LogOut,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated, updateProfile, logout } = useAuth();
  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isLoading, isAuthenticated, navigate]);
  
  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '');
      setBio(user.bio || '');
      setLocation(user.location || '');
      setWebsite(user.website || '');
      setAvatarPreview(user.avatar);
      setCoverPreview(user.cover);
    }
  }, [user]);
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    
    try {
      const updates: any = {
        name,
        username,
        bio,
        location,
        website
      };
      
      // Upload avatar if changed
      if (avatarFile) {
        const avatarName = `${Date.now()}_${avatarFile.name}`;
        const { data: avatarData, error: avatarError } = await supabase.storage
          .from('profiles')
          .upload(`avatars/${user?.id}/${avatarName}`, avatarFile);
        
        if (avatarError) {
          throw new Error(`Error uploading avatar: ${avatarError.message}`);
        }
        
        const { data: avatarUrl } = supabase.storage
          .from('profiles')
          .getPublicUrl(`avatars/${user?.id}/${avatarName}`);
        
        updates.avatar = avatarUrl.publicUrl;
      }
      
      // Upload cover if changed
      if (coverFile) {
        const coverName = `${Date.now()}_${coverFile.name}`;
        const { data: coverData, error: coverError } = await supabase.storage
          .from('profiles')
          .upload(`covers/${user?.id}/${coverName}`, coverFile);
        
        if (coverError) {
          throw new Error(`Error uploading cover: ${coverError.message}`);
        }
        
        const { data: coverUrl } = supabase.storage
          .from('profiles')
          .getPublicUrl(`covers/${user?.id}/${coverName}`);
        
        updates.cover = coverUrl.publicUrl;
      }
      
      const success = await updateProfile(updates);
      
      if (success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      setError(error.message || 'Failed to update profile');
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-harmonic-500" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-harmonic-100 dark:bg-harmonic-900">
      {/* Cover Image Section */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-harmonic-400 to-accent2 overflow-hidden">
        {coverPreview ? (
          <img 
            src={coverPreview} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-harmonic-400 to-accent2" />
        )}
        <label className="absolute bottom-4 right-4 cursor-pointer">
          <div className="bg-harmonic-800/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-harmonic-800/70 transition-colors">
            <Upload className="h-5 w-5" />
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleCoverChange}
          />
        </label>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10 pb-12">
        <div className="bg-white dark:bg-harmonic-800 rounded-xl shadow-sm border border-harmonic-200 dark:border-harmonic-700 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-harmonic-200 dark:bg-harmonic-700 border-4 border-white dark:border-harmonic-800">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-harmonic-300 dark:bg-harmonic-600">
                      <UserIcon className="h-12 w-12 text-harmonic-600 dark:text-harmonic-300" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 cursor-pointer">
                  <div className="bg-accent2 text-white p-2 rounded-full hover:bg-accent2/90 transition-colors">
                    <Upload className="h-4 w-4" />
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>
            
            {/* Form */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>
              
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
                    <UserIcon className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
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
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="your_username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                    <Textarea
                      id="bio"
                      placeholder="Tell us a bit about yourself"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="pl-10 min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                    <Input
                      id="location"
                      type="text"
                      placeholder="City, Country"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-harmonic-500" />
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    type="submit" 
                    className="button-gradient"
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </span>
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
