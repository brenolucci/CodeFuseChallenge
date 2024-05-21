import { Request, Response } from 'express';
import supabase from '../config/supabase.config';
import { Book } from '../models/Book';
import { Section } from '../models/Section';

// Função para criar um livro
export const createBook = async (req: Request, res: Response) => {
  const { title, isbn, pages_quantity } = req.body;

  const { data: book, error } = await supabase
    .from<Book, any>('books')
    .insert([{ title, isbn, pages_quantity }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ book });
};

// Função para criar uma seção
export const createSection = async (req: Request, res: Response) => {
  const { page_number_start, page_number_end, section_name, section_sequence, book_id, section_father_id } = req.body;

  const { data: newSection, error } = await supabase
    .from<Section>('sections')
    .insert([{ page_number_start, page_number_end, section_name, section_sequence, book_id, section_father_id }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ newSection });
};

// Função para obter todos os livros
export const getBooks = async (req: Request, res: Response) => {
  const { data: books, error } = await supabase
    .from<Book>('books')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ books });
};

// Função para obter todas as seções de um livro
export const getSectionsByBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const { data: sections, error } = await supabase
    .from<Section>('sections')
    .select('*')
    .eq('bookId', bookId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ sections });
};
