interface SectionDTO {
  id?: number;
  pageNumberStart: number;
  pageNumberEnd: number;
  sectionName: string;
  sectionSequence: string;
  bookId: number;
  sectionFatherId?: string;
  subSections?: SectionDTO[]; // Campo opcional para sub-seções aninhadas
}
  
  export default SectionDTO;
  