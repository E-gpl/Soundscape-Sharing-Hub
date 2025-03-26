
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Music, Calendar, Mail, Clock, Settings, Upload, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from '@/components/ui/image';
import { getRandomMusicImage } from '@/lib/image-helper';
import { format } from 'date-fns';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tracks');

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    const fetchProfile = async () => {
      if (!user) return;

      try {
        setIsProfileLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user, isAuthenticated, isLoading, navigate]);

  // Handle loading state
  if (isLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent1/30 border-t-accent1 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-harmonic-500">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  // Create formatted date strings
  const formattedJoinDate = user?.created_at 
    ? format(new Date(user.created_at), 'MMMM yyyy')
    : 'Unknown';
  
  const emailVerified = user?.email_confirmed_at 
    ? 'Verified'
    : 'Not verified';

  // Extract username from email or use display name
  const displayName = profile?.name || (user?.email ? user.email.split('@')[0] : 'User');
  const userInitials = displayName.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <div className="h-48 rounded-xl bg-gradient-to-r from-accent1/20 to-accent2/30 relative overflow-hidden">
            {profile?.cover && (
              <Image 
                src={profile.cover}
                alt="Profile cover"
                className="w-full h-full object-cover"
                fallbackSrc={getRandomMusicImage()}
              />
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-12 px-4">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-background rounded-full">
                <AvatarImage src={profile?.avatar} alt={displayName} />
                <AvatarFallback className="text-3xl bg-accent1 text-white">{userInitials}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-grow pt-4 md:pt-0 md:pl-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{displayName}</h1>
                  <p className="text-harmonic-500">{user?.email || 'No email available'}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/upload')}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Music
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-harmonic-500" />
                  <span className="text-sm text-harmonic-500">0 Tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-harmonic-500" />
                  <span className="text-sm text-harmonic-500">Joined {formattedJoinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-harmonic-500" />
                  <span className="text-sm text-harmonic-500">{emailVerified}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-harmonic-500" />
                  <span className="text-sm text-harmonic-500">0 Hours of content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="tracks">My Tracks</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">My Tracks</h2>
              <Button 
                onClick={() => navigate('/upload')}
                className="button-gradient"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New Track
              </Button>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Music className="h-16 w-16 text-harmonic-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No tracks uploaded yet</h3>
                  <p className="text-harmonic-500 mb-6 max-w-md">
                    Share your music with the world by uploading your first track.
                    It only takes a few minutes to get started.
                  </p>
                  <Button 
                    onClick={() => navigate('/upload')}
                    className="button-gradient"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Music
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="playlists" className="space-y-6">
            <h2 className="text-2xl font-semibold">My Playlists</h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Play className="h-16 w-16 text-harmonic-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No playlists created yet</h3>
                  <p className="text-harmonic-500 mb-6 max-w-md">
                    Create playlists to organize your favorite tracks and share them with others.
                  </p>
                  <Button 
                    onClick={() => navigate('/search')}
                    variant="outline"
                  >
                    Browse Music
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-6">
            <h2 className="text-2xl font-semibold">About</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your public profile details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-harmonic-500">Bio</h3>
                    <p className="mt-1">
                      {profile?.bio || 'No bio provided yet. Add one in your profile settings.'}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-harmonic-500">Location</h3>
                    <p className="mt-1">
                      {profile?.location || 'No location provided'}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-harmonic-500">Website</h3>
                    <p className="mt-1">
                      {profile?.website ? (
                        <a 
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent1 hover:underline"
                        >
                          {profile.website}
                        </a>
                      ) : 'No website provided'}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-harmonic-500">Account Type</h3>
                    <div className="mt-1">
                      <Badge variant="outline">Free Account</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserProfile;
