import React from 'react';
import ReactDOM from 'react-dom/client';
import BookForm from './components/BookForm';
import { Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <Container>
      <BookForm />
    </Container>
  );
};

export default App;

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
