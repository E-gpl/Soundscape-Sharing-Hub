
/**
 * Helper function to load images with fallbacks
 * @param imagePath The path to the image
 * @param fallbackImage A fallback image path
 * @returns A valid image URL
 */
export const getImageUrl = (imagePath: string | null | undefined, fallbackImage: string = '/placeholder.svg'): string => {
  if (!imagePath) return fallbackImage;
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a local path, ensure it starts with /
  if (!imagePath.startsWith('/')) {
    return `/${imagePath}`;
  }
  
  return imagePath;
};

/**
 * Handles image loading errors by replacing with a fallback
 * @param event The error event
 * @param fallback Optional fallback URL
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string = '/placeholder.svg') => {
  const img = event.currentTarget;
  
  if (img.src !== fallback) {
    console.warn(`Failed to load image: ${img.src}, using fallback`);
    img.src = fallback;
  }
};

/**
 * List of music-related images for the site
 */
export const musicImages = [
  '/lovable-uploads/32dc7223-260b-4003-8e41-5846e6e18aa0.png',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000',
  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000',
  'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1000',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000'
];

/**
 * Returns a random music image from the collection
 */
export const getRandomMusicImage = (): string => {
  const randomIndex = Math.floor(Math.random() * musicImages.length);
  return musicImages[randomIndex];
};
