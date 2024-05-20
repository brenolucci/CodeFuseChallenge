import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SectionForm from './SectionForm';

interface Section {
  pageNumberStart: number;
  pageNumberEnd: number;
  sectionName: string;
  sectionSequence: string;
  subSections: Section[];
}

interface Book {
  title: string;
  isbn: string;
  pagesQuantity: number;
  sections: Section[];
}

const BookForm: React.FC = () => {
  const [book, setBook] = useState<Book>({
    title: '',
    isbn: '',
    pagesQuantity: 0,
    sections: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleAddSection = () => {
    setBook({
      ...book,
      sections: [
        ...book.sections,
        {
          pageNumberStart: 0,
          pageNumberEnd: 0,
          sectionName: '',
          sectionSequence: '',
          subSections: [],
        },
      ],
    });
  };

  const handleSectionChange = (index: number, section: Section) => {
    const newSections = [...book.sections];
    newSections[index] = section;
    setBook({ ...book, sections: newSections });
  };

  const handleSubmit = () => {
    console.log(book);
    // Lógica para salvar o livro e suas seções
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Cadastrar Livro</Typography>
      <TextField
        label="Título"
        name="title"
        value={book.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ISBN"
        name="isbn"
        value={book.isbn}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantidade de Páginas"
        name="pagesQuantity"
        value={book.pagesQuantity}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
      />
      <Box>
        {book.sections.map((section, index) => (
          <SectionForm
            key={index}
            section={section}
            onChange={(updatedSection) => handleSectionChange(index, updatedSection)}
          />
        ))}
      </Box>
      <IconButton onClick={handleAddSection}>
        <AddIcon />
      </IconButton>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Salvar Livro
      </Button>
    </Paper>
  );
};

export default BookForm;
