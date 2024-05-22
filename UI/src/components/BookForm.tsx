import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, IconButton, CircularProgress } from '@mui/material';
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
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async () => {
    console.log(book);
    setLoading(true);
    try {
      const result = await fetch('http://localhost:8000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (result.ok) {
        // Lógica para tratar sucesso
      } else {
        // Lógica para tratar falha
      }
    } catch (error) {
      console.error('Erro ao salvar o livro:', error);
    }
    setLoading(false);
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
        {loading ? <CircularProgress size={24} /> : <AddIcon />}
      </IconButton>
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Salvar Livro'}
      </Button>
    </Paper>
  );
};

export default BookForm;
