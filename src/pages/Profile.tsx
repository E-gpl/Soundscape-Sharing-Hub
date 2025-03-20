
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import MusicPlayer from '@/components/MusicPlayer';
import TrackCard from '@/components/TrackCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Edit2, 
  ImagePlus, 
  AtSign, 
  MapPin, 
  Globe, 
  Save,
  UploadCloud,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useUserTracks } from '@/services/api';

const Profile = () => {
  const { user, isAuthenticated, isLoading, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  
  // Redirect if not authenticated
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  
  // Fetch user tracks
  const { data: userTracks = [], isLoading: isLoadingTracks } = useUserTracks(user?.id);
  
  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [website, setWebsite] = useState(user?.website || '');
  const [isSaving, setIsSaving] = useState(false);
  
  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '');
      setBio(user.bio || '');
      setLocation(user.location || '');
      setWebsite(user.website || '');
    }
  }, [user]);
  
  const handlePlay = (trackId: string) => {
    setPlayingTrackId(trackId);
  };
  
  const handlePause = () => {
    setPlayingTrackId(null);
  };
  
  const handleSaveProfile = async () => {
    // Validate
    if (!name.trim() || !username.trim()) {
      toast.error('Name and username are required');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const success = await updateProfile({
        name,
        username,
        bio,
        location,
        website
      });
      
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-harmonic-500" />
        <p className="mt-4 text-harmonic-500">Loading profile...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-32 animate-fade-in">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 w-full">
          <img 
            src={user?.cover || 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2074&auto=format&fit=crop'} 
            alt={`${user?.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          
          {isEditing && (
            <button className="absolute right-4 bottom-4 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors">
              <ImagePlus className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="container px-4 md:px-6 -mt-20 relative z-10">
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative">
              <img 
                src={user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'User')} 
                alt={user?.name || 'User'}
                className="h-40 w-40 rounded-lg object-cover shadow-lg"
              />
              
              {isEditing && (
                <button className="absolute right-2 bottom-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors">
                  <ImagePlus className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="space-y-4 flex-1 md:pt-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          @
                        </span>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="rounded-l-none"
                          placeholder="username"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://your-website.com"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleSaveProfile} 
                      className="button-gradient"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Profile
                        </>
                      )}
                    </Button>
                    
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-bold">{user?.name || 'User'}</h1>
                        <p className="text-harmonic-500">@{user?.username || 'user'}</p>
                      </div>
                      
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                  
                  {user?.bio && (
                    <p className="text-sm text-harmonic-600 dark:text-harmonic-300 max-w-2xl">
                      {user.bio}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-4 text-sm text-harmonic-500">
                    {user?.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    
                    {user?.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        <a 
                          href={user.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent2 hover:underline flex items-center"
                        >
                          {user.website.replace(/^https?:\/\//, '')}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="tracks">Your Tracks</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracks" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Uploaded Tracks</h2>
                
                <Link to="/upload">
                  <Button className="button-gradient">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload New Track
                  </Button>
                </Link>
              </div>
              
              {isLoadingTracks ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-harmonic-500" />
                </div>
              ) : userTracks.length > 0 ? (
                <div className="space-y-1">
                  {userTracks.map(track => (
                    <TrackCard 
                      key={track.id} 
                      track={track}
                      isCurrentlyPlaying={playingTrackId === track.id}
                      onPlay={() => handlePlay(track.id)}
                      onPause={handlePause}
                      layout="list"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-harmonic-100/50 dark:bg-harmonic-800/20 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">No tracks yet</h3>
                  <p className="text-harmonic-500 mb-6">
                    Upload your first track to share it with listeners.
                  </p>
                  <Link to="/upload">
                    <Button className="button-gradient">
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Upload Track
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Track Performance</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-sm font-medium text-harmonic-500 mb-1">Total Plays</h3>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  
                  <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-sm font-medium text-harmonic-500 mb-1">Followers</h3>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  
                  <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-sm font-medium text-harmonic-500 mb-1">Likes</h3>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                </div>
              </div>
              
              {userTracks.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Your Tracks</h2>
                  
                  <div className="bg-white dark:bg-harmonic-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-harmonic-200 dark:border-harmonic-700 grid grid-cols-12 text-sm font-medium text-harmonic-500">
                      <div className="col-span-6 md:col-span-5">Track</div>
                      <div className="col-span-3 md:col-span-2 text-right">Plays</div>
                      <div className="hidden md:block md:col-span-3 text-right">Release Date</div>
                      <div className="col-span-3 md:col-span-2 text-right">Likes</div>
                    </div>
                    
                    {userTracks.map((track, index) => (
                      <div 
                        key={track.id}
                        className="p-4 grid grid-cols-12 items-center border-b border-harmonic-200 dark:border-harmonic-700 last:border-0 hover:bg-harmonic-100 dark:hover:bg-harmonic-700/20"
                      >
                        <div className="col-span-6 md:col-span-5 flex items-center">
                          <div className="mr-3 font-medium text-harmonic-400">{index + 1}</div>
                          <img 
                            src={track.cover} 
                            alt={track.title}
                            className="h-10 w-10 rounded object-cover mr-3"
                          />
                          <div>
                            <div className="font-medium text-sm">{track.title}</div>
                          </div>
                        </div>
                        <div className="col-span-3 md:col-span-2 text-right">{track.playCount || 0}</div>
                        <div className="hidden md:block md:col-span-3 text-right text-harmonic-500">-</div>
                        <div className="col-span-3 md:col-span-2 text-right">0</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {playingTrackId && (
        <MusicPlayer 
          track={
            userTracks.find(t => t.id === playingTrackId) 
              ? {
                  id: playingTrackId,
                  title: userTracks.find(t => t.id === playingTrackId)?.title || '',
                  artist: user?.name || '',
                  cover: userTracks.find(t => t.id === playingTrackId)?.cover || '',
                  audioUrl: userTracks.find(t => t.id === playingTrackId)?.audioUrl || ''
                }
              : undefined
          } 
        />
      )}
    </div>
  );
};

export default Profile;
