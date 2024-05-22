import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import logo from '../../assets/codefuse-logo.svg';

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

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //TODO mudar a BASE_URL pra da .env
        const response = await fetch('http://localhost:8000/api/books');
        const result = await response.json();
        setBooks(result.books);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <img src={logo} alt="Logo" style={{ width: '150px', margin: '0 auto' }} />
      <Typography variant="h4" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        Lista de livros cadastrado
      </Typography>
      <Button >Cadastrar Livro</Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {books.map((book, index) => (
            <ListItem key={index}>
              <ListItemText primary={book.title} secondary={`ISBN: ${book.isbn} | Páginas: ${book.pagesQuantity}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default HomePage;
