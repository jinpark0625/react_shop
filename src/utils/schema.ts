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
      nft: {
        Row: {
          background: string | null;
          body: string | null;
          eyes: string | null;
          hat: string | null;
          id: number;
          image: string | null;
          nose: string | null;
          title: string | null;
          token_id: string | null;
        };
        Insert: {
          background?: string | null;
          body?: string | null;
          eyes?: string | null;
          hat?: string | null;
          id: number;
          image?: string | null;
          nose?: string | null;
          title?: string | null;
          token_id: string | null;
        };
        Update: {
          background?: string | null;
          body?: string | null;
          eyes?: string | null;
          hat?: string | null;
          id?: number;
          image?: string | null;
          nose?: string | null;
          title?: string | null;
          token_id: string | null;
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
