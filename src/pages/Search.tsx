
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import MusicPlayer from '@/components/MusicPlayer';
import TrackCard from '@/components/TrackCard';
import ArtistCard from '@/components/ArtistCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Search as SearchIcon } from 'lucide-react';

// Mock data (same as Browse page)
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
  }
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [loading, setLoading] = useState(true);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  
  // Mock search functionality
  const [filteredArtists, setFilteredArtists] = useState(ARTISTS);
  const [filteredTracks, setFilteredTracks] = useState(TRACKS);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    const timer = setTimeout(() => {
      if (query) {
        const lowerCaseQuery = query.toLowerCase();
        
        const artistResults = ARTISTS.filter(
          artist => artist.name.toLowerCase().includes(lowerCaseQuery)
        );
        
        const trackResults = TRACKS.filter(
          track => 
            track.title.toLowerCase().includes(lowerCaseQuery) || 
            track.artist.toLowerCase().includes(lowerCaseQuery)
        );
        
        setFilteredArtists(artistResults);
        setFilteredTracks(trackResults);
      } else {
        setFilteredArtists([]);
        setFilteredTracks([]);
      }
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [query]);
  
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Search Results</h1>
            <p className="text-harmonic-500">
              {query ? `Results for "${query}"` : 'Enter a search term'}
            </p>
          </div>
          
          {!query ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <SearchIcon className="h-16 w-16 text-harmonic-300 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Search for music</h2>
              <p className="text-harmonic-500 max-w-md">
                Use the search bar at the top to find your favorite artists and tracks
              </p>
            </div>
          ) : loading ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Artists</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-56 w-full rounded-lg" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Tracks</h2>
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
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tracks">Tracks</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-8">
                {filteredArtists.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Artists</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredArtists.map(artist => (
                        <ArtistCard key={artist.id} artist={artist} />
                      ))}
                    </div>
                  </div>
                )}
                
                {filteredTracks.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Tracks</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {filteredTracks.map(track => (
                        <TrackCard 
                          key={track.id} 
                          track={track}
                          isCurrentlyPlaying={playingTrackId === track.id}
                          onPlay={() => handlePlay(track.id)}
                          onPause={handlePause}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {filteredArtists.length === 0 && filteredTracks.length === 0 && (
                  <div className="text-center py-16">
                    <h2 className="text-xl font-semibold mb-2">No results found</h2>
                    <p className="text-harmonic-500">
                      We couldn't find any matches for "{query}"
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="tracks">
                {filteredTracks.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredTracks.map(track => (
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
                  <div className="text-center py-16">
                    <h2 className="text-xl font-semibold mb-2">No tracks found</h2>
                    <p className="text-harmonic-500">
                      We couldn't find any tracks matching "{query}"
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="artists">
                {filteredArtists.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredArtists.map(artist => (
                      <ArtistCard key={artist.id} artist={artist} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h2 className="text-xl font-semibold mb-2">No artists found</h2>
                    <p className="text-harmonic-500">
                      We couldn't find any artists matching "{query}"
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <MusicPlayer 
        track={playingTrackId 
          ? {
              id: playingTrackId,
              title: filteredTracks.find(t => t.id === playingTrackId)?.title || '',
              artist: filteredTracks.find(t => t.id === playingTrackId)?.artist || '',
              cover: filteredTracks.find(t => t.id === playingTrackId)?.cover || '',
              audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
            }
          : undefined
        } 
      />
    </div>
  );
};

export default Search;
