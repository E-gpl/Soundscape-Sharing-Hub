
import React, { useState } from 'react';
import Header from '@/components/Header';
import MusicPlayer from '@/components/MusicPlayer';
import ArtistCard from '@/components/ArtistCard';
import TrackCard from '@/components/TrackCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const ARTISTS = [
  {
    id: '1',
    name: 'Luna Ray',
    image: 'https://images.unsplash.com/photo-1549213783-8284d0336c4f?q=80&w=2070&auto=format&fit=crop',
    tracks: 12,
    followers: 15420
  },
  {
    id: '2',
    name: 'Atlas',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop',
    tracks: 8,
    followers: 9340
  },
  {
    id: '3',
    name: 'Skyline Echo',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop',
    tracks: 16,
    followers: 23750
  },
  {
    id: '4',
    name: 'Midnight Wave',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
    tracks: 5,
    followers: 7840
  },
  {
    id: '5',
    name: 'Neon Dreams',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop',
    tracks: 10,
    followers: 12380
  },
  {
    id: '6',
    name: 'Electric Pulse',
    image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=2072&auto=format&fit=crop',
    tracks: 7,
    followers: 8920
  },
  {
    id: '7',
    name: 'Sunset Beats',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
    tracks: 14,
    followers: 19250
  },
  {
    id: '8',
    name: 'Urban Vibe',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
    tracks: 9,
    followers: 11540
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
    title: 'Summer Breeze',
    artist: 'Atlas',
    artistId: '2',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
    duration: 198,
    playCount: 986500
  },
  {
    id: '3',
    title: 'Urban Rhythm',
    artist: 'Skyline Echo',
    artistId: '3',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
    duration: 274,
    playCount: 1876000
  },
  {
    id: '4',
    title: 'Ocean Waves',
    artist: 'Midnight Wave',
    artistId: '4',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop',
    duration: 226,
    playCount: 657000
  },
  {
    id: '5',
    title: 'Electric Soul',
    artist: 'Luna Ray',
    artistId: '1',
    cover: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
    duration: 215,
    playCount: 789300
  },
  {
    id: '6',
    title: 'Neon Lights',
    artist: 'Atlas',
    artistId: '2',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop',
    duration: 187,
    playCount: 542700
  },
  {
    id: '7',
    title: 'Sunset Glow',
    artist: 'Neon Dreams',
    artistId: '5',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop',
    duration: 254,
    playCount: 423500
  },
  {
    id: '8',
    title: 'Digital Pulse',
    artist: 'Electric Pulse',
    artistId: '6',
    cover: 'https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?q=80&w=2070&auto=format&fit=crop',
    duration: 201,
    playCount: 375200
  },
  {
    id: '9',
    title: 'Golden Hour',
    artist: 'Sunset Beats',
    artistId: '7',
    cover: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=2067&auto=format&fit=crop',
    duration: 228,
    playCount: 682700
  },
  {
    id: '10',
    title: 'City Lights',
    artist: 'Urban Vibe',
    artistId: '8',
    cover: 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?q=80&w=2064&auto=format&fit=crop',
    duration: 219,
    playCount: 548300
  }
];

const GENRES = [
  "Electronic", "Pop", "Hip Hop", "R&B", "Rock", 
  "Jazz", "Classical", "Ambient", "Indie", "Folk"
];

const Browse = () => {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  const handlePlay = (trackId: string) => {
    setPlayingTrackId(trackId);
  };
  
  const handlePause = () => {
    setPlayingTrackId(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-32">
        <div className="container px-4 md:px-6 animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Browse</h1>
            <p className="text-harmonic-500">Discover new artists and tracks</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {GENRES.map(genre => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                  className="rounded-full transition-colors"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracks" className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {TRACKS.map(track => (
                  <TrackCard 
                    key={track.id} 
                    track={track}
                    isCurrentlyPlaying={playingTrackId === track.id}
                    onPlay={() => handlePlay(track.id)}
                    onPause={handlePause}
                  />
                ))}
              </div>
              
              <div className="text-center pt-4">
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="artists" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ARTISTS.map(artist => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
              
              <div className="text-center pt-4">
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <MusicPlayer 
        track={playingTrackId 
          ? {
              id: playingTrackId,
              title: TRACKS.find(t => t.id === playingTrackId)?.title || '',
              artist: TRACKS.find(t => t.id === playingTrackId)?.artist || '',
              cover: TRACKS.find(t => t.id === playingTrackId)?.cover || '',
              audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
            }
          : undefined
        } 
      />
    </div>
  );
};

export default Browse;
