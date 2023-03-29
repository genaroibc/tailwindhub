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
          created_at: string
          downloads: number
          html_code: string
          id: string
          likes: number
          preview_img: string
          tags: string[]
          title: string
        }
        Insert: {
          author_username: string
          created_at?: string
          downloads?: number
          html_code: string
          id?: string
          likes?: number
          preview_img: string
          tags?: string[]
          title: string
        }
        Update: {
          author_username?: string
          created_at?: string
          downloads?: number
          html_code?: string
          id?: string
          likes?: number
          preview_img?: string
          tags?: string[]
          title?: string
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
