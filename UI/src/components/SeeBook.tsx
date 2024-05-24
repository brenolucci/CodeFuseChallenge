import React from 'react';
import { Box, Typography } from '@mui/material';

interface SectionDTO {
  id?: string;
  pageNumberStart: number;
  pageNumberEnd: number;
  sectionName: string;
  sectionSequence: string;
  bookId: string;
  sectionFatherId?: string | null;
  subSections?: SectionDTO[];
}

interface SeeBookProps {
  section: SectionDTO;
}

const SeeBook: React.FC<SeeBookProps> = ({ section }) => {
  return (
    <Box sx={{ ml: section.sectionFatherId ? 4 : 0, mb: 2, textAlign: 'left' }}>
      <Typography variant="h6">* {section.sectionName}</Typography>
      {section.subSections && section.subSections.map((subSection) => (
        <SeeBook key={subSection.id} section={subSection} />
      ))}
    </Box>
  );
};

export default SeeBook;
