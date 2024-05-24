"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createSection: function() {
        return createSection;
    },
    getSectionsByBook: function() {
        return getSectionsByBook;
    }
});
const _supabaseconfig = /*#__PURE__*/ _interop_require_default(require("../config/supabase.config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Função auxiliar para construir a estrutura aninhada
const buildNestedStructure = (sections)=>{
    // Create a map to store each section by its sectionName
    const sectionMap = new Map();
    // Initialize the map with each section and add a subSections array
    sections.forEach((section)=>{
        section.subSections = [];
        sectionMap.set(section.sectionName, section);
    });
    // Create the nested structure by adding each section to its parent's subSections array
    sections.forEach((section)=>{
        if (section.sectionFatherId !== 'root') {
            const parentSection = sectionMap.get(section.sectionFatherId);
            if (parentSection) {
                parentSection.subSections.push(section);
            }
        }
    });
    // Collect the top-level sections
    const nestedSections = sections.filter((section)=>section.sectionFatherId === 'root');
    return nestedSections;
};
const createSection = async (req, res)=>{
    const sections = req.body; // Usar o DTO para tipar as seções
    // Converter os dados para snake_case
    const parsedSections = sections.map((section)=>{
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
        const { data: newSections, error } = await _supabaseconfig.default.from('sections').upsert(parsedSections).select().returns(); // Usar o tipo correto para o retorno
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }
        // Retornar os dados da nova seção em camelCase para o frontend
        const parsedNewSections = newSections.map((section)=>{
            return {
                pageNumberStart: section.page_number_start,
                pageNumberEnd: section.page_number_end,
                sectionName: section.section_name,
                sectionSequence: section.section_sequence,
                bookId: section.book_id,
                sectionFatherId: section.section_father_id
            };
        });
        res.status(201).json({
            newSections: parsedNewSections
        });
    } catch (error) {
        console.error('Error creating sections:', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
const getSectionsByBook = async (req, res)=>{
    const { bookId } = req.query;
    try {
        // Obter as seções do banco de dados
        const { data: sectionsDB, error } = await _supabaseconfig.default.from('sections').select('*').eq('book_id', bookId).returns(); // Usar o tipo correto para o retorno
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }
        // Converter os dados do banco de dados de snake_case para camelCase
        const sectionsDTO = sectionsDB.map((section)=>{
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
        return res.status(200).json({
            sections: nestedSections
        });
    } catch (error) {
        console.error('Error fetching sections:', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
