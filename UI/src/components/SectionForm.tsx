import React, { useState } from 'react';
import { TextField, Box, IconButton, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Section {
  pageNumberStart: number;
  pageNumberEnd: number;
  sectionName: string;
  sectionSequence: string;
  subSections: Section[];
}

interface SectionFormProps {
  section: Section;
  onChange: (section: Section) => void;
}

const SectionForm: React.FC<SectionFormProps> = ({ section, onChange }) => {
  const [localSection, setLocalSection] = useState(section);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedSection = { ...localSection, [name]: value };
    setLocalSection(updatedSection);
    onChange(updatedSection);
  };

  const handleAddSubSection = () => {
    const newSubSection = {
      pageNumberStart: 0,
      pageNumberEnd: 0,
      sectionName: '',
      sectionSequence: '',
      subSections: [],
    };
    const updatedSection = {
      ...localSection,
      subSections: [...localSection.subSections, newSubSection],
    };
    setLocalSection(updatedSection);
    onChange(updatedSection);
  };

  const handleSubSectionChange = (index: number, subSection: Section) => {
    const newSubSections = [...localSection.subSections];
    newSubSections[index] = subSection;
    const updatedSection = { ...localSection, subSections: newSubSections };
    setLocalSection(updatedSection);
    onChange(updatedSection);
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle1">Seção</Typography>
      <TextField
        label="Página Inicial"
        name="pageNumberStart"
        value={localSection.pageNumberStart}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Página Final"
        name="pageNumberEnd"
        value={localSection.pageNumberEnd}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nome da Seção"
        name="sectionName"
        value={localSection.sectionName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box>
        {localSection.subSections.map((subSection, index) => (
          <SectionForm
            key={index}
            section={subSection}
            onChange={(updatedSubSection) => handleSubSectionChange(index, updatedSubSection)}
          />
        ))}
      </Box>
      <IconButton onClick={handleAddSubSection}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
};

export default SectionForm;
