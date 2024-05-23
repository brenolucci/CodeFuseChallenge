import { Request, Response } from 'express';
import supabase from '../config/supabase.config';
import { Book } from '../models/Book';
import { Section } from '../models/Section';


// Função para criar um livro
export const createBook = async (req: Request, res: Response) => {
  const { title, isbn, pages_quantity } = req.body;

  const { data, error } = await supabase
    .from('books')
    .upsert({ title, isbn, pages_quantity })
    .select()
    .returns<Book[]>();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ data });
};

// Função para obter todos os livros
export const getBooks = async (req: Request, res: Response) => {
  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .returns<Book[]>();

  if (error) {
    return res.status(500).json({ error: error.message });
  }


  res.status(200).json({ books });
};
