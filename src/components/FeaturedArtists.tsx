
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArtistCard from './ArtistCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useArtists } from '@/services/api';

const FeaturedArtists = () => {
  const navigate = useNavigate();
  const { data: artists = [], isLoading, isError } = useArtists();
  
  const featuredArtists = artists.slice(0, 4);
  
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
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-harmonic-500" />
          </div>
        ) : isError ? (
          <div className="text-center py-12 bg-harmonic-100/50 dark:bg-harmonic-800/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Error loading artists</h3>
            <p className="text-harmonic-500">
              Please try again later.
            </p>
          </div>
        ) : featuredArtists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-harmonic-100/50 dark:bg-harmonic-800/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No artists found</h3>
            <p className="text-harmonic-500">
              Be the first to create an artist profile!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArtists;
