
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
