
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrackCard from './TrackCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const NEW_RELEASES = [
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

const NewReleases = () => {
  const navigate = useNavigate();
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  
  const handlePlay = (trackId: string) => {
    setPlayingTrackId(trackId);
  };
  
  const handlePause = () => {
    setPlayingTrackId(null);
  };
  
  return (
    <section className="py-12 animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold md:text-3xl tracking-tight">New Releases</h2>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate('/browse')}
            className="group"
          >
            <span>View All</span>
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {NEW_RELEASES.map(track => (
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
    </section>
  );
};

export default NewReleases;
