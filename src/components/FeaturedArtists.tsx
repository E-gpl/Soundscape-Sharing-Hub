
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArtistCard from './ArtistCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Fetcher function for artists
const fetchArtists = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, display_name, avatar_url, followers')
      .order('followers', { ascending: false })
      .limit(4);
      
    if (error) throw error;
    
    // If we have data, transform it to match the ArtistCard component's expectations
    if (data && data.length > 0) {
      return data.map(profile => ({
        id: profile.id,
        name: profile.display_name || 'Unknown Artist',
        image: profile.avatar_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
        tracks: 0, // This would need to be calculated from a join or separate query
        followers: profile.followers || 0
      }));
    }
    
    // Return fallback data if no artists found in the database
    return [];
  } catch (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
};

const FeaturedArtists = () => {
  const navigate = useNavigate();
  const { data: artists = [], isLoading, isError } = useQuery({
    queryKey: ['featured-artists'],
    queryFn: fetchArtists
  });
  
  // Use fallback data if we have no artists
  const featuredArtists = artists.length > 0 ? artists : [
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
  
  // Don't render anything if there are no artists to display
  if (featuredArtists.length === 0 && !isLoading && !isError) {
    return null;
  }
  
  return (
    <section className="py-12 animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold md:text-3xl tracking-tight">Featured Artists</h2>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate('/search')}
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
