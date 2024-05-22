import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box } from '@mui/material';
import HomePage from './pages/Landspace/HomePage';

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <HomePage />
    </Box>
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
