import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import HomePage from './pages/Landspace/HomePage';
import RegisterPage from './pages/BookRegister/RegisterPage';
import SeeBookPage from './pages/BookRegister/SeeBookPage';
import './App.css'; // Importando o arquivo CSS

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/see-book/:bookId" element={<SeeBookPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
