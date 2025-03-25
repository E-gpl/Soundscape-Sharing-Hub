
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Settings, BarChart4, Music, Headphones, ListMusic, CalendarDays, Clock, User, Mail, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import Image from '@/components/ui/image';

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isLoading, isAuthenticated, navigate]);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) {
            console.error('Error fetching user profile:', error);
          } else {
            setUserProfile(data);
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
        } finally {
          setIsLoadingProfile(false);
        }
      }
    };
    
    const fetchUserTracks = async () => {
      if (user?.id) {
        try {
          const { data, error } = await supabase
            .from('tracks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
            
          if (error) {
            console.error('Error fetching user tracks:', error);
          } else {
            setTracks(data || []);
          }
        } catch (err) {
          console.error('Failed to fetch user tracks:', err);
        } finally {
          setIsLoadingTracks(false);
        }
      }
    };
    
    if (user) {
      fetchUserProfile();
      fetchUserTracks();
    }
  }, [user]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-16 px-4 md:px-6">
          <div className="flex justify-center">
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
      </div>
    );
  }
  
  // Safe access to user data
  const userEmail = user?.email || '';
  const userCreatedAt = user?.created_at ? new Date(user.created_at) : new Date();
  const userConfirmedAt = user?.email_confirmed_at ? new Date(user.email_confirmed_at) : null;
  
  const displayName = userProfile?.display_name || userEmail.split('@')[0] || 'User';
  const joinDate = format(userCreatedAt, 'MMMM yyyy');
  const memberDuration = userConfirmedAt 
    ? `Member since ${format(userConfirmedAt, 'MMMM yyyy')}`
    : `Joined ${format(userCreatedAt, 'MMMM yyyy')}`;
    
  const avatarUrl = userProfile?.avatar_url || '';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-32">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
              <div className="flex-shrink-0">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{displayName}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-harmonic-500 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 opacity-70" />
                    <span>{memberDuration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4 opacity-70" />
                    <span>{userEmail}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 flex gap-2">
                <Button 
                  variant="outline" 
                  className="gap-1"
                  onClick={() => navigate('/upload')}
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-1"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="tracks">
                <Music className="h-4 w-4 mr-2" />
                My Tracks
              </TabsTrigger>
              <TabsTrigger value="favorites">
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="stats">
                <BarChart4 className="h-4 w-4 mr-2" />
                Stats
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracks" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoadingTracks ? (
                  Array(4).fill(0).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-square bg-harmonic-100 dark:bg-harmonic-800 animate-pulse" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </Card>
                  ))
                ) : tracks.length > 0 ? (
                  tracks.map((track) => (
                    <Card key={track.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square relative group">
                        <Image 
                          src={track.cover_url || '/placeholder.svg'} 
                          alt={track.title} 
                          className="w-full h-full object-cover"
                          aspectRatio="square"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{track.title}</h3>
                        <p className="text-sm text-harmonic-500">{
                          new Date(track.created_at).toLocaleDateString()
                        }</p>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <div className="max-w-md mx-auto">
                      <Music className="h-12 w-12 mx-auto text-harmonic-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No tracks yet</h3>
                      <p className="text-harmonic-500 mb-6">
                        You haven't uploaded any tracks yet. Start sharing your music with the world.
                      </p>
                      <Button onClick={() => navigate('/upload')}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Music
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="space-y-8">
              <div className="py-16 text-center">
                <div className="max-w-md mx-auto">
                  <Heart className="h-12 w-12 mx-auto text-harmonic-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                  <p className="text-harmonic-500 mb-6">
                    You haven't added any tracks to your favorites yet. Start exploring music to find your favorites.
                  </p>
                  <Button onClick={() => navigate('/search')}>
                    <Headphones className="h-4 w-4 mr-2" />
                    Explore Music
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Music className="h-8 w-8 text-accent1 mb-4" />
                    <h3 className="text-3xl font-bold mb-1">{tracks.length}</h3>
                    <p className="text-harmonic-500">Tracks Uploaded</p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Headphones className="h-8 w-8 text-accent2 mb-4" />
                    <h3 className="text-3xl font-bold mb-1">0</h3>
                    <p className="text-harmonic-500">Total Plays</p>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Heart className="h-8 w-8 text-red-500 mb-4" />
                    <h3 className="text-3xl font-bold mb-1">0</h3>
                    <p className="text-harmonic-500">Favorites</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
