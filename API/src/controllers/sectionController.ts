import { Request, Response } from 'express';
import supabase from '../config/supabase.config';
import { Section } from '../models/Section';


// Função para criar uma seção
export const createSection = async (req: Request, res: Response) => {
  const { page_number_start, page_number_end, section_name, section_sequence, book_id, section_father_id } = req.body;

  const { data: newSection, error } = await supabase
    .from('sections')
    .upsert([{ page_number_start, page_number_end, section_name, section_sequence, book_id, section_father_id }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ newSection });
};

// Função para obter todas as seções de um livro
export const getSectionsByBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const { data: sections, error } = await supabase
    .from('sections')
    .select('*')
    .eq('bookId', bookId)
    .returns<Section>();

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json({ sections });
};
