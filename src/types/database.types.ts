
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      artists: {
        Row: {
          id: string
          name: string
          image: string
          cover: string | null
          bio: string | null
          location: string | null
          website: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          image: string
          cover?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          image?: string
          cover?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          created_at?: string
          user_id?: string
        }
      }
      tracks: {
        Row: {
          id: string
          title: string
          artist_id: string
          cover: string
          audio_url: string
          duration: number
          play_count: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          artist_id: string
          cover: string
          audio_url: string
          duration: number
          play_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          artist_id?: string
          cover?: string
          audio_url?: string
          duration?: number
          play_count?: number
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          name: string
          username: string
          avatar: string | null
          cover: string | null
          bio: string | null
          location: string | null
          website: string | null
          created_at: string
        }
        Insert: {
          id: string
          name: string
          username: string
          avatar?: string | null
          cover?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          username?: string
          avatar?: string | null
          cover?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
