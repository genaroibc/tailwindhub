export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      components: {
        Row: {
          author_username: string;
          created_at: string | null;
          downloads: number | null;
          html_code: string;
          id: number;
          likes: number | null;
        };
        Insert: {
          author_username?: string;
          created_at?: string | null;
          downloads?: number | null;
          html_code?: string;
          id?: number;
          likes?: number | null;
        };
        Update: {
          author_username?: string;
          created_at?: string | null;
          downloads?: number | null;
          html_code?: string;
          id?: number;
          likes?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
