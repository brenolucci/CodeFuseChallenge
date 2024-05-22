import React from 'react';
import { Container, Typography } from '@mui/material';
import BookForm from '../../components/BookForm';


const HomePage: React.FC = () => {

  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        Lista de livros cadastrado
      </Typography>
      <BookForm></BookForm>
    </Container>
  );
};

export default HomePage;
