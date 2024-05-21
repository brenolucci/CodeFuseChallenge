export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: number;
          title: string;
          isbn: string;
          pagesQuantity: number;
        };
        Insert: {
          id?: never;
          title: string;
          isbn: string;
          pagesQuantity: number;
        };
        Update: {
          id?: never;
          title?: string;
          isbn?: string;
          pagesQuantity?: number;
        };
      };
      sections: {
        Row: {
          id: number;
          pageNumberStart: number;
          pageNumberEnd: number;
          sectionName: string;
          sectionSequence: string;
          bookId: number;
          sectionFatherId?: number;
        };
        Insert: {
          id?: never;
          pageNumberStart: number;
          pageNumberEnd: number;
          sectionName: string;
          sectionSequence: string;
          bookId: number;
          sectionFatherId?: number;
        };
        Update: {
          id?: never;
          pageNumberStart?: number;
          pageNumberEnd?: number;
          sectionName?: string;
          sectionSequence?: string;
          bookId?: number;
          sectionFatherId?: number;
        };
      };
    };
  };
}
