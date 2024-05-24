import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../assets/codefuse-logo.svg';

interface Section {
  pageNumberStart: number;
  pageNumberEnd: number;
  sectionName: string;
  sectionSequence: string;
  subSections: Section[];
}

interface Book {
  id: string; // Adicionei a propriedade id
  title: string;
  isbn: string;
  pagesQuantity: number;
  pages_quantity: number;
  sections: Section[];
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/books`);
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
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <img src={logo} alt="Logo" style={{ width: '150px', margin: '0 auto' }} />
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Lista de livros cadastrados
        </Typography>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">Ir para a página de cadastro</Button>
        </Link>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {books.map((book) => (
            <ListItem key={book.id} component={Link} to={`/see-book/${book.id}`} button>
              <ListItemText primary={book.title} secondary={`ISBN: ${book.isbn} | Páginas: ${book.pages_quantity || 'N/A'}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default HomePage;
