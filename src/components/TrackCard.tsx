
import React, { useState } from 'react';
import { Play, Pause, Heart } from 'lucide-react';

interface TrackCardProps {
  track: {
    id: string;
    title: string;
    artist: string;
    artistId: string;
    cover: string;
    duration: number;
    playCount: number;
  };
  isCurrentlyPlaying?: boolean;
  onPlay: () => void;
  onPause: () => void;
  layout?: 'grid' | 'list';
}

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  isCurrentlyPlaying = false,
  onPlay,
  onPause,
  layout = 'grid'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const formatPlayCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M plays`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K plays`;
    }
    return `${count} plays`;
  };

  if (layout === 'list') {
    return (
      <div 
        className="group relative flex items-center p-3 rounded-lg hover:bg-harmonic-200/50 dark:hover:bg-harmonic-800/30 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative mr-4 flex-shrink-0">
          <img 
            src={track.cover} 
            alt={track.title}
            className="h-12 w-12 rounded-md object-cover"
          />
          
          {(isHovered || isCurrentlyPlaying) && (
            <button 
              className="absolute inset-0 flex items-center justify-center bg-harmonic-900/40 rounded-md"
              onClick={isCurrentlyPlaying ? onPause : onPlay}
            >
              {isCurrentlyPlaying ? (
                <Pause className="h-6 w-6 text-white" />
              ) : (
                <Play className="h-6 w-6 text-white" />
              )}
            </button>
          )}
        </div>
        
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-sm truncate">{track.title}</h3>
          <p className="text-xs text-harmonic-500 truncate">{track.artist}</p>
        </div>
        
        <div className="flex items-center space-x-4 ml-4">
          <button 
            className={`p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
              isLiked ? 'text-accent1' : 'text-harmonic-400 hover:text-harmonic-900'
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
          </button>
          
          <div className="text-xs text-harmonic-500 w-16 text-right">
            {formatDuration(track.duration)}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="w-48 p-3 hover-scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-md overflow-hidden group">
        <img 
          src={track.cover} 
          alt={track.title}
          className="h-48 w-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-harmonic-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
          <div className="w-full">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-white font-medium text-sm truncate max-w-[80%]">{track.title}</h3>
              
              <button 
                className={`p-1 rounded-full ${isLiked ? 'text-accent1' : 'text-white hover:text-accent1'}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
              </button>
            </div>
            
            <p className="text-harmonic-200 text-xs truncate">{track.artist}</p>
          </div>
        </div>
        
        {(isHovered || isCurrentlyPlaying) && (
          <button 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-harmonic-900/90 rounded-full p-3 shadow-lg"
            onClick={isCurrentlyPlaying ? onPause : onPlay}
          >
            {isCurrentlyPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
        )}
      </div>
      
      <div className="mt-3">
        <h3 className="font-medium text-sm truncate">{track.title}</h3>
        <p className="text-harmonic-500 text-xs truncate">{track.artist}</p>
        <p className="text-harmonic-400 text-xs mt-1">{formatPlayCount(track.playCount)}</p>
      </div>
    </div>
  );
};

export default TrackCard;
