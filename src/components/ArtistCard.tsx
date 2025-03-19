
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, PlayCircle } from 'lucide-react';

interface ArtistCardProps {
  artist: {
    id: string;
    name: string;
    image: string;
    tracks: number;
    followers: number;
  };
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ 
  artist, 
  size = 'medium',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    small: 'w-40',
    medium: 'w-56',
    large: 'w-72'
  };
  
  const imageClasses = {
    small: 'h-40 w-40',
    medium: 'h-56 w-56',
    large: 'h-72 w-72'
  };

  return (
    <div 
      className={`${sizeClasses[size]} p-4 hover-scale`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/artist/${artist.id}`} onClick={onClick}>
        <div className="relative rounded-lg overflow-hidden group">
          <img 
            src={artist.image} 
            alt={artist.name}
            className={`${imageClasses[size]} object-cover transition-transform duration-700 group-hover:scale-105`}
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-harmonic-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4`}>
            <div>
              <h3 className="text-white font-medium truncate">{artist.name}</h3>
              <p className="text-harmonic-200 text-xs">
                {artist.tracks} {artist.tracks === 1 ? 'track' : 'tracks'}
              </p>
            </div>
            
            <button className="text-white hover:text-accent1 transition-colors">
              <PlayCircle className="h-8 w-8" fill="rgba(255,255,255,0.2)" />
            </button>
          </div>
        </div>
        
        <div className="mt-3">
          <h3 className="font-medium truncate">{artist.name}</h3>
          <p className="text-harmonic-500 text-sm">
            {artist.followers.toLocaleString()} followers
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;
