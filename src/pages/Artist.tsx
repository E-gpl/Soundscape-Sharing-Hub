
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import MusicPlayer from '@/components/MusicPlayer';
import TrackCard from '@/components/TrackCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Play, Heart, Share2, MoreHorizontal } from 'lucide-react';

// Mock data
const ARTISTS = [
  {
    id: '1',
    name: 'Luna Ray',
    image: 'https://images.unsplash.com/photo-1549213783-8284d0336c4f?q=80&w=2070&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2074&auto=format&fit=crop',
    bio: 'Luna Ray is an electronic music producer known for her dreamy soundscapes and innovative beats. With a passion for exploring the boundaries of sound, she creates immersive musical experiences that transport listeners to otherworldly realms.',
    location: 'Los Angeles, CA',
    tracks: 12,
    followers: 15420,
    website: 'https://lunaray.music'
  },
  {
    id: '2',
    name: 'Atlas',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop',
    bio: 'Atlas is a versatile musician blending electronic elements with organic instruments to create a unique sound that transcends genres. Drawing inspiration from world music, his compositions feature intricate rhythms and rich textures.',
    location: 'Berlin, Germany',
    tracks: 8,
    followers: 9340,
    website: 'https://atlasmusic.com'
  },
  {
    id: '3',
    name: 'Skyline Echo',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop',
    bio: 'Skyline Echo crafts ambient soundscapes inspired by urban environments and natural landscapes. Their music captures the essence of liminal spaces, blending field recordings with subtle electronic textures to create immersive sonic environments.',
    location: 'Tokyo, Japan',
    tracks: 16,
    followers: 23750,
    website: 'https://skylineecho.net'
  },
  {
    id: '4',
    name: 'Midnight Wave',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?q=80&w=2070&auto=format&fit=crop',
    bio: 'Midnight Wave explores the darker side of electronic music, crafting moody compositions that evoke nocturnal cityscapes and introspective moments. With haunting melodies and pulsating rhythms, their music resonates with listeners seeking emotional depth.',
    location: 'London, UK',
    tracks: 5,
    followers: 7840,
    website: 'https://midnightwave.co'
  }
];

const TRACKS = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Ray',
    artistId: '1',
    cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    duration: 243,
    playCount: 1240000
  },
  {
    id: '2',
    title: 'Electric Soul',
    artist: 'Luna Ray',
    artistId: '1',
    cover: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
    duration: 215,
    playCount: 789300
  },
  {
    id: '3',
    title: 'Stardust',
    artist: 'Luna Ray',
    artistId: '1',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop',
    duration: 196,
    playCount: 546700
  },
  {
    id: '4',
    title: 'Nebula',
    artist: 'Luna Ray',
    artistId: '1',
    cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop',
    duration: 224,
    playCount: 432100
  },
  {
    id: '5',
    title: 'Cosmic Journey',
    artist: 'Luna Ray',
    artistId: '1',
    cover: 'https://images.unsplash.com/photo-1461784180009-21121b2f204c?q=80&w=2069&auto=format&fit=crop',
    duration: 267,
    playCount: 325400
  },
  {
    id: '6',
    title: 'Lunar Phase',
    artist: 'Luna Ray',
    artistId: '1',
    cover: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop',
    duration: 189,
    playCount: 278900
  }
];

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState<any>(null);
  const [artistTracks, setArtistTracks] = useState<any[]>([]);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    const timer = setTimeout(() => {
      const foundArtist = ARTISTS.find(a => a.id === id);
      const tracks = TRACKS.filter(t => t.artistId === id);
      
      setArtist(foundArtist || null);
      setArtistTracks(tracks);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handlePlay = (trackId: string) => {
    setPlayingTrackId(trackId);
  };
  
  const handlePause = () => {
    setPlayingTrackId(null);
  };
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-20 pb-32">
          <div className="relative h-64 md:h-80 w-full bg-harmonic-200">
            <Skeleton className="h-full w-full" />
          </div>
          
          <div className="container px-4 md:px-6 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <Skeleton className="h-40 w-40 rounded-lg" />
              
              <div className="space-y-4 flex-1 pt-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full max-w-md" />
              </div>
            </div>
            
            <Skeleton className="h-10 w-full max-w-sm mb-6" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-40 w-full rounded-md aspect-square" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <MusicPlayer />
      </div>
    );
  }
  
  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-32">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Artist Not Found</h1>
            <p className="text-harmonic-500 mb-6">The artist you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </main>
        
        <MusicPlayer />
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
            src={artist.cover} 
            alt={`${artist.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="container px-4 md:px-6 -mt-20 relative z-10">
          {/* Artist Info */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img 
              src={artist.image} 
              alt={artist.name}
              className="h-40 w-40 rounded-lg object-cover shadow-lg"
            />
            
            <div className="space-y-4 flex-1 md:pt-4">
              <div>
                <h1 className="text-3xl font-bold">{artist.name}</h1>
                <p className="text-harmonic-500">{artist.location} • {artist.followers.toLocaleString()} followers</p>
              </div>
              
              <p className="text-sm text-harmonic-600 dark:text-harmonic-300 max-w-2xl">
                {artist.bio}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleFollow}
                  className={isFollowing ? 'bg-harmonic-200 text-harmonic-900 hover:bg-harmonic-300' : 'button-gradient'}
                >
                  <Heart className="mr-2 h-4 w-4" fill={isFollowing ? "currentColor" : "none"} />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracks" className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Popular Tracks</h2>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => handlePlay(artistTracks[0]?.id)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Play All
                  </Button>
                </div>
                
                <div className="space-y-1">
                  {artistTracks.map(track => (
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
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Biography</h2>
                  <p className="text-harmonic-600 dark:text-harmonic-300">{artist.bio}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Details</h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-harmonic-500">Location</h3>
                      <p>{artist.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-harmonic-500">Tracks</h3>
                      <p>{artist.tracks}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-harmonic-500">Followers</h3>
                      <p>{artist.followers.toLocaleString()}</p>
                    </div>
                    {artist.website && (
                      <div>
                        <h3 className="text-sm font-medium text-harmonic-500">Website</h3>
                        <a 
                          href={artist.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent2 hover:underline"
                        >
                          {artist.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <MusicPlayer 
        track={playingTrackId 
          ? {
              id: playingTrackId,
              title: artistTracks.find(t => t.id === playingTrackId)?.title || '',
              artist: artist.name,
              cover: artistTracks.find(t => t.id === playingTrackId)?.cover || '',
              audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
            }
          : undefined
        } 
      />
    </div>
  );
};

export default Artist;
