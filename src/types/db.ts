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
          html_code: string
          id: number
        }
        Insert: {
          author_username?: string
          created_at?: string
          html_code?: string
          id?: number
        }
        Update: {
          author_username?: string
          created_at?: string
          html_code?: string
          id?: number
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
