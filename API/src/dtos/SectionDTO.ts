interface SectionDTO {
    id: number;
    pageNumberStart: number;
    pageNumberEnd: number;
    sectionName: string;
    sectionSequence: string;
    bookId: number;
    sectionFatherId?: string;
  }
  
  export default SectionDTO;
  