
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArtistCard from './ArtistCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const FEATURED_ARTISTS = [
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

const FeaturedArtists = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold md:text-3xl tracking-tight">Featured Artists</h2>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate('/browse')}
            className="group"
          >
            <span>View All</span>
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ARTISTS.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
