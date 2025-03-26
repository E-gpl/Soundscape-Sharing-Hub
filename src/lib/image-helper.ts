
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
 * Curated collection of high-quality music-related images for the site
 */
export const musicImages = [
  // Professional studio setup images
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070',
  'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070',
  
  // Concert and performance images
  'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070',
  
  // Musical instruments
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070',
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070',
  
  // DJ and electronic music
  'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2070',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070',
  
  // Vinyl and retro music
  'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=2070',
  'https://images.unsplash.com/photo-1461784180009-27c1303a64c6?q=80&w=1000',
  
  // Music listening experiences
  'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974',
  'https://images.unsplash.com/photo-1484876065684-b683cf17d276?q=80&w=2070'
];

// Specific categories of music images
export const studioImages = [
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070',
  'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070',
  'https://images.unsplash.com/photo-1598387846148-47e82ee8fcb2?q=80&w=2071'
];

export const concertImages = [
  'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070'
];

export const instrumentImages = [
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070',
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070',
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070'
];

/**
 * Returns a specific high-quality music image based on index
 * @param index The index of the image to retrieve
 */
export const getMusicImage = (index: number = 0): string => {
  if (index >= 0 && index < musicImages.length) {
    return musicImages[index];
  }
  return musicImages[0];
};

/**
 * Returns a random music image from the collection
 */
export const getRandomMusicImage = (): string => {
  const randomIndex = Math.floor(Math.random() * musicImages.length);
  return musicImages[randomIndex];
};

/**
 * Returns a random studio image
 */
export const getRandomStudioImage = (): string => {
  const randomIndex = Math.floor(Math.random() * studioImages.length);
  return studioImages[randomIndex];
};

/**
 * Returns a random concert image
 */
export const getRandomConcertImage = (): string => {
  const randomIndex = Math.floor(Math.random() * concertImages.length);
  return concertImages[randomIndex];
};

/**
 * Returns a random instrument image
 */
export const getRandomInstrumentImage = (): string => {
  const randomIndex = Math.floor(Math.random() * instrumentImages.length);
  return instrumentImages[randomIndex];
};
