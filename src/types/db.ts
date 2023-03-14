export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      components: {
        Row: {
          author_username: string
          created_at: string | null
          downloads: number | null
          html_code: string
          id: number
          likes: number | null
        }
        Insert: {
          author_username?: string
          created_at?: string | null
          downloads?: number | null
          html_code?: string
          id?: number
          likes?: number | null
        }
        Update: {
          author_username?: string
          created_at?: string | null
          downloads?: number | null
          html_code?: string
          id?: number
          likes?: number | null
        }
      }
      Posts: {
        Row: {
          created_at: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
        }
      }
      users: {
        Row: {
          created_at: string
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          username?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
