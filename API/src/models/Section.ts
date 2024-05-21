export type Section = {
  id: number;
  page_number_start: number;
  page_number_end: number;
  section_name: string;
  section_sequence: string;
  book_id: number;
  section_father_id?: number;
};