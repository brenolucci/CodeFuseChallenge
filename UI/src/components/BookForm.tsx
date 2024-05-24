import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SectionForm from './SectionForm';

interface Section {
  pageNumberStart: number;
  pageNumberEnd: number;
  sectionName: string;
  sectionSequence: string;
  subSections: Section[];
  sectionFatherId?: string;
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    function flattenSections(sections: Section[], sectionFatherId: undefined | string = undefined, bookId: string) {
      const flattened: Omit <Section, 'subSections'>[] = [];
  
      sections.forEach((section, index) => {
        const { subSections: subSections, ...sectionData } = section;
        const sectionWithParent = { ...sectionData, sectionFatherId, bookId, sectionSequence: `${index}` };
        flattened.push(sectionWithParent);
  
        if (subSections && subSections.length > 0) {
          const subSectionsFlattened = flattenSections(subSections, sectionWithParent.sectionName, bookId);
          flattened.push(...subSectionsFlattened);
        }
      });
  
      return flattened;
    }
  
    setLoading(true);
    try {
      const data = await fetch(`${import.meta.env.VITE_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: book.title,
          isbn: book.isbn,
          pages_quantity: book.pagesQuantity
        }),
      });
      const result = await data.json();
      if (result.data) {
        const sections = flattenSections(book.sections, 'root', result.data[0].id)
  
        const sectionsData = await fetch(`${import.meta.env.VITE_BASE_URL}/sections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sections),
        });
        await sectionsData.json();
      
  
        setSuccessMessage('Livro salvo com sucesso!');
      } else {
        setErrorMessage('Erro ao salvar o livro. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      setErrorMessage('Erro ao salvar o livro. Tente novamente mais tarde.');
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
      <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
        <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
  
};

export default BookForm;
