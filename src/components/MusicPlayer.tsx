
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Repeat, Shuffle, MoreHorizontal, Heart
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface MusicPlayerProps {
  track?: {
    id: string;
    title: string;
    artist: string;
    cover: string;
    audioUrl: string;
  };
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Only show the player if a track is provided
    setIsVisible(!!track && !!track.audioUrl);
    
    // Reset player state when track changes
    if (track && track.audioUrl) {
      setIsPlaying(false);
      setCurrentTime(0);
      
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        
        // Set up audio element
        audioRef.current.addEventListener('loadedmetadata', () => {
          setDuration(audioRef.current?.duration || 0);
        });
        
        audioRef.current.addEventListener('error', (e) => {
          console.error('Audio loading error:', e);
          toast.error('Unable to load audio file');
          setIsVisible(false);
        });
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [track]);

  const togglePlayPause = () => {
    if (!track || !track.audioUrl) {
      toast.error('No audio available to play');
      return;
    }
    
    if (isPlaying) {
      audioRef.current?.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      const playPromise = audioRef.current?.play();
      if (playPromise) {
        playPromise.catch(error => {
          console.error('Playback error:', error);
          toast.error('Unable to play audio');
        });
      }
      animationRef.current = requestAnimationFrame(updateProgress);
    }
    
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const handleProgressChange = (values: number[]) => {
    if (audioRef.current && values.length > 0) {
      audioRef.current.currentTime = values[0];
      setCurrentTime(values[0]);
    }
  };

  const handleVolumeChange = (values: number[]) => {
    if (audioRef.current && values.length > 0) {
      const newVolume = values[0];
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Don't render anything if no track is provided
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-morphism py-3 px-4 animate-slide-up">
      <audio 
        ref={audioRef} 
        src={track?.audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Track Info */}
        <div className="flex items-center space-x-4">
          <img 
            src={track?.cover} 
            alt={track?.title} 
            className="h-12 w-12 rounded-md object-cover"
          />
          
          <div className="overflow-hidden">
            <h4 className="font-medium text-sm truncate">{track?.title}</h4>
            <p className="text-xs text-harmonic-500 truncate">{track?.artist}</p>
          </div>
          
          <button 
            className={`p-1 rounded-full ${isLiked ? 'text-accent1' : 'text-harmonic-400 hover:text-harmonic-900'}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-1">
            <button className="text-harmonic-500 hover:text-harmonic-900 transition-colors">
              <Shuffle className="h-4 w-4" />
            </button>
            
            <button className="text-harmonic-500 hover:text-harmonic-900 transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>
            
            <button 
              onClick={togglePlayPause}
              className="bg-harmonic-900 dark:bg-white text-white dark:text-harmonic-900 rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            <button className="text-harmonic-500 hover:text-harmonic-900 transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>
            
            <button className="text-harmonic-500 hover:text-harmonic-900 transition-colors">
              <Repeat className="h-4 w-4" />
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-harmonic-500">{formatTime(currentTime)}</span>
            
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.01}
              onValueChange={handleProgressChange}
              className="flex-1"
            />
            
            <span className="text-xs text-harmonic-500">{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Volume and More */}
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={toggleMute}
            className="text-harmonic-500 hover:text-harmonic-900 transition-colors"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
          
          <button className="text-harmonic-500 hover:text-harmonic-900 transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
