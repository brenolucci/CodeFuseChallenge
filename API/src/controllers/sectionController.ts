import { Request, Response } from 'express';
import supabase from '../config/supabase.config';
import SectionDTO from '../dtos/SectionDTO'; // Importe o DTO para Section
import { Section } from '../models/Section';

// Função auxiliar para construir a estrutura aninhada
const buildNestedStructure = (sections: any): any => {
  // Create a map to store each section by its sectionName
  const sectionMap = new Map();

  // Initialize the map with each section and add a subSections array
  sections.forEach((section: { subSections: never[]; sectionName: any; }) => {
    section.subSections = [];
    sectionMap.set(section.sectionName, section);
  });

  // Create the nested structure by adding each section to its parent's subSections array
  sections.forEach((section: { sectionFatherId: string; }) => {
    if (section.sectionFatherId !== 'root') {
      const parentSection = sectionMap.get(section.sectionFatherId);
      if (parentSection) {
        parentSection.subSections.push(section);
      }
    }
  });

  // Collect the top-level sections
  const nestedSections = sections.filter((section: { sectionFatherId: string; }) => section.sectionFatherId === 'root');

  return nestedSections;
};

// Função para criar uma seção
export const createSection = async (req: Request, res: Response) => {
  const sections: SectionDTO[] = req.body; // Usar o DTO para tipar as seções

  // Converter os dados para snake_case
  const parsedSections = sections.map((section: SectionDTO) => {
    return {
      page_number_start: section.pageNumberStart,
      page_number_end: section.pageNumberEnd,
      section_name: section.sectionName,
      section_sequence: section.sectionSequence,
      book_id: section.bookId,
      section_father_id: section.sectionFatherId
    };
  });

  try {
    // Realizar a operação no banco de dados usando os dados em snake_case
    const { data: newSections, error } = await supabase
      .from('sections')
      .upsert(parsedSections)
      .select()
      .returns<Section[]>(); // Usar o tipo correto para o retorno

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Retornar os dados da nova seção em camelCase para o frontend
    const parsedNewSections = newSections.map((section: Section) => {
      return {
        pageNumberStart: section.page_number_start,
        pageNumberEnd: section.page_number_end,
        sectionName: section.section_name,
        sectionSequence: section.section_sequence,
        bookId: section.book_id,
        sectionFatherId: section.section_father_id
      };
    });

    res.status(201).json({ newSections: parsedNewSections });
  } catch (error) {
    console.error('Error creating sections:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Função para obter todas as seções de um livro
export const getSectionsByBook = async (req: Request, res: Response) => {
  const { bookId } = req.query;

  try {
    // Obter as seções do banco de dados
    const { data: sectionsDB, error } = await supabase
      .from('sections')
      .select('*')
      .eq('book_id', bookId)
      .returns<Section[]>(); // Usar o tipo correto para o retorno

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Converter os dados do banco de dados de snake_case para camelCase
    const sectionsDTO: SectionDTO[] = sectionsDB.map((section: Section) => {
      return {
        id: section.id,
        pageNumberStart: section.page_number_start,
        pageNumberEnd: section.page_number_end,
        sectionName: section.section_name,
        sectionSequence: section.section_sequence,
        bookId: section.book_id,
        sectionFatherId: section.section_father_id
      };
    });

    // Construir a estrutura aninhada
    const nestedSections = buildNestedStructure(sectionsDTO);

    // Retornar as seções aninhadas em camelCase para o frontend
    return res.status(200).json({ sections: nestedSections });
  } catch (error) {
    console.error('Error fetching sections:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
