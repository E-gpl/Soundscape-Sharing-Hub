
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import Image from '@/components/ui/image';

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl?: string;
}

interface MusicPlayerProps {
  track?: Track;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // When track changes, reset player and autoplay
    if (track) {
      setIsPlaying(true);
      setCurrentTime(0);
    } else {
      setIsPlaying(false);
    }
  }, [track]);

  useEffect(() => {
    // Handle play/pause
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    // Handle volume changes
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    // Handle mute/unmute
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = value[0];
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-harmonic-200 dark:border-harmonic-800 shadow-lg z-40">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden shadow">
            <Image
              src={track.cover}
              alt={track.title}
              fallbackSrc="/placeholder.svg"
              aspectRatio="square"
            />
          </div>
          
          <div className="flex flex-col overflow-hidden mr-4 flex-grow-0 md:w-48">
            <p className="font-medium truncate">{track.title}</p>
            <p className="text-sm text-harmonic-500 dark:text-harmonic-400 truncate">{track.artist}</p>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 flex-shrink-0"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="hidden md:flex items-center gap-2 flex-1 mx-4">
            <span className="text-xs text-harmonic-500 dark:text-harmonic-400 w-10">
              {formatTime(currentTime)}
            </span>
            
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="flex-1"
            />
            
            <span className="text-xs text-harmonic-500 dark:text-harmonic-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 w-32">
            <Button variant="ghost" size="icon" onClick={toggleMute} className="flex-shrink-0">
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
        </div>
        
        <div className="md:hidden mt-2 flex items-center gap-2">
          <span className="text-xs text-harmonic-500 dark:text-harmonic-400 w-8">
            {formatTime(currentTime)}
          </span>
          
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="flex-1"
          />
          
          <span className="text-xs text-harmonic-500 dark:text-harmonic-400 w-8">
            {formatTime(duration)}
          </span>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default MusicPlayer;
