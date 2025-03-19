
import { Artist, Track, User } from "@/types/models";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Transform database types to app types
const transformArtist = (artist: any): Artist => ({
  id: artist.id,
  name: artist.name,
  image: artist.image,
  cover: artist.cover || undefined,
  bio: artist.bio || undefined,
  location: artist.location || undefined,
  tracks: 0, // Will be populated separately
  followers: 0, // Will be populated separately
  website: artist.website || undefined,
});

const transformTrack = (track: any, artistName: string): Track => ({
  id: track.id,
  title: track.title,
  artist: artistName,
  artistId: track.artist_id,
  cover: track.cover,
  duration: track.duration,
  playCount: track.play_count,
  audioUrl: track.audio_url,
});

const transformProfile = (profile: any): User => ({
  id: profile.id,
  name: profile.name,
  username: profile.username,
  avatar: profile.avatar || undefined,
  cover: profile.cover || undefined,
  bio: profile.bio || undefined,
  location: profile.location || undefined,
  website: profile.website || undefined,
  followers: 0, // Will be populated separately
  following: 0, // Will be populated separately
});

// Artists
export const useArtists = () => {
  return useQuery({
    queryKey: ["artists"],
    queryFn: async (): Promise<Artist[]> => {
      console.log("Fetching artists...");
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .order('name');
      
      if (error) {
        toast.error("Failed to fetch artists");
        throw error;
      }
      
      return data.map(transformArtist);
    }
  });
};

export const useArtist = (id?: string) => {
  return useQuery({
    queryKey: ["artist", id],
    queryFn: async (): Promise<Artist | null> => {
      if (!id) return null;
      console.log(`Fetching artist with id: ${id}`);
      
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code !== 'PGRST116') { // PGRST116 is for "no rows found"
          toast.error("Failed to fetch artist");
        }
        return null;
      }
      
      return transformArtist(data);
    },
    enabled: !!id
  });
};

// Tracks
export const useTracks = () => {
  return useQuery({
    queryKey: ["tracks"],
    queryFn: async (): Promise<Track[]> => {
      console.log("Fetching tracks...");
      const { data: tracks, error: tracksError } = await supabase
        .from('tracks')
        .select('*, artists(name)')
        .order('created_at', { ascending: false });
      
      if (tracksError) {
        toast.error("Failed to fetch tracks");
        throw tracksError;
      }
      
      return tracks.map(track => transformTrack(track, track.artists.name));
    }
  });
};

export const useArtistTracks = (artistId?: string) => {
  return useQuery({
    queryKey: ["artist-tracks", artistId],
    queryFn: async (): Promise<Track[]> => {
      if (!artistId) return [];
      console.log(`Fetching tracks for artist: ${artistId}`);
      
      const { data: artist, error: artistError } = await supabase
        .from('artists')
        .select('name')
        .eq('id', artistId)
        .single();
      
      if (artistError) {
        if (artistError.code !== 'PGRST116') {
          toast.error("Failed to fetch artist");
        }
        return [];
      }
      
      const { data: tracks, error: tracksError } = await supabase
        .from('tracks')
        .select('*')
        .eq('artist_id', artistId)
        .order('created_at', { ascending: false });
      
      if (tracksError) {
        toast.error("Failed to fetch tracks");
        return [];
      }
      
      return tracks.map(track => transformTrack(track, artist.name));
    },
    enabled: !!artistId
  });
};

// User
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async (): Promise<User | null> => {
      console.log("Fetching current user...");
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        if (error.code !== 'PGRST116') {
          toast.error("Failed to fetch user profile");
        }
        return null;
      }
      
      return transformProfile(data);
    }
  });
};

export const useUserTracks = (userId?: string) => {
  return useQuery({
    queryKey: ["user-tracks", userId],
    queryFn: async (): Promise<Track[]> => {
      if (!userId) return [];
      console.log(`Fetching tracks for user: ${userId}`);
      
      // First, get the artist ID for this user
      const { data: artist, error: artistError } = await supabase
        .from('artists')
        .select('id, name')
        .eq('user_id', userId)
        .single();
      
      if (artistError) {
        if (artistError.code !== 'PGRST116') {
          toast.error("Failed to fetch artist profile");
        }
        return [];
      }
      
      if (!artist) return []; // User might not have an artist profile
      
      // Now get all tracks for this artist
      const { data: tracks, error: tracksError } = await supabase
        .from('tracks')
        .select('*')
        .eq('artist_id', artist.id)
        .order('created_at', { ascending: false });
      
      if (tracksError) {
        toast.error("Failed to fetch tracks");
        return [];
      }
      
      return tracks.map(track => transformTrack(track, artist.name));
    },
    enabled: !!userId
  });
};

// Search
export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async (): Promise<{ artists: Artist[], tracks: Track[] }> => {
      if (!query.trim()) return { artists: [], tracks: [] };
      console.log(`Searching for: ${query}`);
      
      // Use ilike for case-insensitive search
      const searchTerm = `%${query}%`;
      
      // Search artists
      const { data: artists, error: artistsError } = await supabase
        .from('artists')
        .select('*')
        .ilike('name', searchTerm);
      
      if (artistsError) {
        toast.error("Failed to search artists");
        throw artistsError;
      }
      
      // Search tracks
      const { data: tracks, error: tracksError } = await supabase
        .from('tracks')
        .select('*, artists(name)')
        .ilike('title', searchTerm);
      
      if (tracksError) {
        toast.error("Failed to search tracks");
        throw tracksError;
      }
      
      return { 
        artists: artists.map(transformArtist), 
        tracks: tracks.map(track => transformTrack(track, track.artists.name))
      };
    },
    enabled: !!query.trim()
  });
};

// Upload mutations
export const useUploadTrack = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      title, 
      artistId, 
      coverFile, 
      audioFile,
      duration
    }: { 
      title: string; 
      artistId: string; 
      coverFile: File; 
      audioFile: File;
      duration: number;
    }) => {
      // 1. Upload cover image
      const coverPath = `covers/${artistId}/${Date.now()}_${coverFile.name}`;
      const { error: coverError } = await supabase.storage
        .from('music')
        .upload(coverPath, coverFile);
      
      if (coverError) {
        toast.error("Failed to upload cover image");
        throw coverError;
      }
      
      // Get cover URL
      const { data: coverData } = await supabase.storage
        .from('music')
        .getPublicUrl(coverPath);
      
      // 2. Upload audio file
      const audioPath = `audio/${artistId}/${Date.now()}_${audioFile.name}`;
      const { error: audioError } = await supabase.storage
        .from('music')
        .upload(audioPath, audioFile);
      
      if (audioError) {
        toast.error("Failed to upload audio file");
        throw audioError;
      }
      
      // Get audio URL
      const { data: audioData } = await supabase.storage
        .from('music')
        .getPublicUrl(audioPath);
      
      // 3. Create track record
      const { data, error } = await supabase
        .from('tracks')
        .insert({
          title,
          artist_id: artistId,
          cover: coverData.publicUrl,
          audio_url: audioData.publicUrl,
          duration,
          play_count: 0
        })
        .select()
        .single();
      
      if (error) {
        toast.error("Failed to create track record");
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      toast.success("Track uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      queryClient.invalidateQueries({ queryKey: ["artist-tracks"] });
      queryClient.invalidateQueries({ queryKey: ["user-tracks"] });
    }
  });
};

// Artist profile mutations
export const useCreateArtistProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      name, 
      imageFile, 
      coverFile, 
      bio,
      location,
      website,
      userId
    }: { 
      name: string; 
      imageFile: File;
      coverFile?: File;
      bio?: string;
      location?: string;
      website?: string;
      userId: string;
    }) => {
      // 1. Upload profile image
      const imagePath = `profiles/${userId}/${Date.now()}_${imageFile.name}`;
      const { error: imageError } = await supabase.storage
        .from('music')
        .upload(imagePath, imageFile);
      
      if (imageError) {
        toast.error("Failed to upload profile image");
        throw imageError;
      }
      
      // Get image URL
      const { data: imageData } = await supabase.storage
        .from('music')
        .getPublicUrl(imagePath);
      
      let coverUrl = null;
      
      // 2. Upload cover image if provided
      if (coverFile) {
        const coverPath = `covers/${userId}/${Date.now()}_${coverFile.name}`;
        const { error: coverError } = await supabase.storage
          .from('music')
          .upload(coverPath, coverFile);
        
        if (coverError) {
          toast.error("Failed to upload cover image");
          throw coverError;
        }
        
        // Get cover URL
        const { data: coverData } = await supabase.storage
          .from('music')
          .getPublicUrl(coverPath);
        
        coverUrl = coverData.publicUrl;
      }
      
      // 3. Create artist record
      const { data, error } = await supabase
        .from('artists')
        .insert({
          name,
          image: imageData.publicUrl,
          cover: coverUrl,
          bio,
          location,
          website,
          user_id: userId
        })
        .select()
        .single();
      
      if (error) {
        toast.error("Failed to create artist profile");
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      toast.success("Artist profile created successfully!");
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    }
  });
};

export const useUpdateArtistProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      id,
      name, 
      imageFile, 
      coverFile, 
      bio,
      location,
      website
    }: { 
      id: string;
      name?: string; 
      imageFile?: File;
      coverFile?: File;
      bio?: string;
      location?: string;
      website?: string;
    }) => {
      const updates: any = {};
      
      if (name) updates.name = name;
      if (bio !== undefined) updates.bio = bio;
      if (location !== undefined) updates.location = location;
      if (website !== undefined) updates.website = website;
      
      // 1. Upload new profile image if provided
      if (imageFile) {
        const imagePath = `profiles/${id}/${Date.now()}_${imageFile.name}`;
        const { error: imageError } = await supabase.storage
          .from('music')
          .upload(imagePath, imageFile);
        
        if (imageError) {
          toast.error("Failed to upload profile image");
          throw imageError;
        }
        
        // Get image URL
        const { data: imageData } = await supabase.storage
          .from('music')
          .getPublicUrl(imagePath);
        
        updates.image = imageData.publicUrl;
      }
      
      // 2. Upload new cover image if provided
      if (coverFile) {
        const coverPath = `covers/${id}/${Date.now()}_${coverFile.name}`;
        const { error: coverError } = await supabase.storage
          .from('music')
          .upload(coverPath, coverFile);
        
        if (coverError) {
          toast.error("Failed to upload cover image");
          throw coverError;
        }
        
        // Get cover URL
        const { data: coverData } = await supabase.storage
          .from('music')
          .getPublicUrl(coverPath);
        
        updates.cover = coverData.publicUrl;
      }
      
      // 3. Update artist record
      const { data, error } = await supabase
        .from('artists')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        toast.error("Failed to update artist profile");
        throw error;
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      toast.success("Artist profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      queryClient.invalidateQueries({ queryKey: ["artist", variables.id] });
    }
  });
};
