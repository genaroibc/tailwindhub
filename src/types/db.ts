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
          author_avatar_url: string
          author_username: string
          created_at: string
          html_code: string
          id: string
          preview_img: string
          tags: string[]
          title: string
        }
        Insert: {
          author_avatar_url: string
          author_username: string
          created_at?: string
          html_code: string
          id?: string
          preview_img: string
          tags?: string[]
          title: string
        }
        Update: {
          author_avatar_url?: string
          author_username?: string
          created_at?: string
          html_code?: string
          id?: string
          preview_img?: string
          tags?: string[]
          title?: string
        }
      }
      likes: {
        Row: {
          author_username: string
          component_id: string
          id: string
        }
        Insert: {
          author_username: string
          component_id: string
          id?: string
        }
        Update: {
          author_username?: string
          component_id?: string
          id?: string
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
