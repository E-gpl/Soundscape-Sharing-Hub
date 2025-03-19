
export interface Artist {
  id: string;
  name: string;
  image: string;
  cover?: string;
  bio?: string;
  location?: string;
  tracks?: number;
  followers?: number;
  website?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  cover: string;
  duration: number;
  playCount: number;
  audioUrl?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  location?: string;
  website?: string;
  followers?: number;
  following?: number;
}
