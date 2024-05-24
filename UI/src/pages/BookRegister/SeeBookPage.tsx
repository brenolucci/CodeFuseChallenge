import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Box, Paper } from '@mui/material';
import SeeBook from '../../components/SeeBook'

interface BookDTO {
  title: string;
  isbn: string;
  pagesQuantity: number;
  pages_quantity:number;
  sections: SectionDTO[];
}

interface SectionDTO {
  id?: string;
  pageNumberStart: number;
  pageNumberEnd: number;
  sectionName: string;
  sectionSequence: string;
  bookId: string;
  sectionFatherId: string | null;
  subSections?: SectionDTO[];
}

const SeeBookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [sections, setSections] = useState<SectionDTO[]>([]);
  const [book, setBook] = useState<BookDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
        const fetchBook = async () => {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/book?bookId=${bookId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch book data");
          }
          const data = await response.json();
          setBook(data[0]);
        };

        const fetchBookSections = async () => {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/sections?bookId=${bookId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch book data");
          }
          const data = await response.json();
          setSections(data.sections);
        };
            fetchBook();
            fetchBookSections();
    } catch (err) {
      setError("Failed to fetch book data");
    } finally {
      setLoading(false);
    }

  }, [bookId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!book) {
    return <Typography>No book data</Typography>;
  }
  return (
    <Paper sx={{height: '90vh', width: '30vw'}}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4">{book.title}</Typography>
        <Typography variant="subtitle1">ISBN: {book.isbn}</Typography>
        <Typography variant="subtitle1">Pages: {book.pages_quantity}</Typography>
      </Box>
      <Box>
        {sections.length > 0 && sections.map((section) => (
          <SeeBook key={section.id} section={section} />
        ))}
      </Box>
    </Paper>
  );
};

export default SeeBookPage;
