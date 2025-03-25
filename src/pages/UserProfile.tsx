
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Music, Users, Clock, Calendar, LinkIcon, Edit, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import TrackCard from '@/components/TrackCard';

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [userTracks, setUserTracks] = useState([]);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    
    const fetchProfileAndTracks = async () => {
      setLoading(true);
      try {
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }
        
        // Fetch user's tracks
        const { data: tracksData, error: tracksError } = await supabase
          .from('tracks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (tracksError) {
          throw tracksError;
        }
        
        // Format tracks data
        const formattedTracks = tracksData?.map(track => ({
          id: track.id,
          title: track.title || 'Untitled',
          artist: profileData?.display_name || user.email?.split('@')[0] || 'You',
          artistId: user.id,
          cover: track.cover_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
          duration: track.duration || 180,
          playCount: track.play_count || 0
        })) || [];
        
        setProfile(profileData || { id: user.id });
        setUserTracks(formattedTracks);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileAndTracks();
  }, [user, navigate]);
  
  const handlePlay = (trackId: string) => {
    setPlayingTrackId(trackId);
  };
  
  const handlePause = () => {
    setPlayingTrackId(null);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }
  
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User';
  const joinedDate = user?.created_at ? formatDistanceToNow(new Date(user.email_confirmed_at || user.created_at), { addSuffix: true }) : 'Recently';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-32">
        <div className="container px-4 md:px-6 animate-fade-in">
          {/* Profile Header */}
          <div className="relative mb-12">
            <div className="h-40 bg-gradient-to-r from-accent1/30 to-accent2/30 rounded-lg"></div>
            <div className="absolute -bottom-16 left-8 flex items-end">
              <Avatar className="h-28 w-28 border-4 border-background">
                <AvatarImage src={profile?.avatar_url} alt={displayName} />
                <AvatarFallback className="text-3xl">{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="mt-16 pl-8 mb-8">
            <h1 className="text-3xl font-bold">{displayName}</h1>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Music className="h-4 w-4 mr-1" />
                <span>{userTracks.length} {userTracks.length === 1 ? 'Track' : 'Tracks'}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{profile?.followers || 0} {profile?.followers === 1 ? 'Follower' : 'Followers'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined {joinedDate}</span>
              </div>
              {profile?.website && (
                <a 
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-foreground transition-colors"
                >
                  <LinkIcon className="h-4 w-4 mr-1" />
                  <span>Website</span>
                </a>
              )}
            </div>
            {profile?.bio && (
              <p className="mt-4 max-w-3xl text-muted-foreground">{profile.bio}</p>
            )}
          </div>
          
          {/* Tabs Content */}
          <Tabs defaultValue="tracks" className="mt-12">
            <TabsList className="mb-8">
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracks" className="space-y-8">
              {userTracks.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {userTracks.map(track => (
                    <TrackCard 
                      key={track.id} 
                      track={track}
                      isCurrentlyPlaying={playingTrackId === track.id}
                      onPlay={() => handlePlay(track.id)}
                      onPause={handlePause}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-muted/50">
                  <CardContent className="py-10 text-center">
                    <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No tracks yet</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't uploaded any music yet. Start sharing your sound with the world!
                    </p>
                    <Button onClick={() => navigate('/upload')}>
                      Upload Music
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="liked">
              <Card className="bg-muted/50">
                <CardContent className="py-10 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No liked tracks</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't liked any tracks yet. Explore music to find tracks you enjoy!
                  </p>
                  <Button onClick={() => navigate('/search')}>
                    Browse Music
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="playlists">
              <Card className="bg-muted/50">
                <CardContent className="py-10 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No playlists yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create playlists to organize your favorite tracks
                  </p>
                  <Button onClick={() => navigate('/search')}>
                    Create Playlist
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
