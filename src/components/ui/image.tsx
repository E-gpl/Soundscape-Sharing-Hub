
import React, { useState } from 'react';
import { handleImageError, getImageUrl } from '@/lib/image-helper';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  aspectRatio?: 'auto' | 'square' | '16:9' | '4:3' | '1:1';
  blur?: boolean;
  priority?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc = '/placeholder.svg',
  aspectRatio = 'auto',
  blur = true,
  priority = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const aspectRatioClasses = {
    'auto': '',
    'square': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square'
  };
  
  // Process the source URL to handle different formats
  const processedSrc = getImageUrl(src, fallbackSrc);
  
  return (
    <div className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className || ''}`}>
      {(!loaded || error) && blur && (
        <div className="absolute inset-0 flex items-center justify-center bg-harmonic-100 dark:bg-harmonic-800 animate-pulse">
          <svg className="w-8 h-8 text-harmonic-400" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 4V2M12 20v2M4 12H2M20 12h2M17.7 17.7l1.4 1.4M17.7 6.3l1.4-1.4M6.3 17.7l-1.4 1.4M6.3 6.3L4.9 4.9" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
      <img
        src={processedSrc}
        alt={alt || 'Image'}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => {
          setLoaded(true);
          setError(false);
        }}
        onError={(e) => {
          handleImageError(e, fallbackSrc);
          setError(true);
          setLoaded(true);
        }}
        className={`w-full h-full object-cover ${!loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};

export default Image;
