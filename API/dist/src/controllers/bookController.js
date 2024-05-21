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
    createBook: function() {
        return createBook;
    },
    createSection: function() {
        return createSection;
    },
    getBooks: function() {
        return getBooks;
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
const createBook = async (req, res)=>{
    const { title, isbn, pages_quantity } = req.body;
    const { data: book, error } = await _supabaseconfig.default.from('books').insert([
        {
            title,
            isbn,
            pages_quantity
        }
    ]).single();
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(201).json({
        book
    });
};
const createSection = async (req, res)=>{
    const { page_number_start, page_number_end, section_name, section_sequence, book_id, section_father_id } = req.body;
    const { data: newSection, error } = await _supabaseconfig.default.from('sections').insert([
        {
            page_number_start,
            page_number_end,
            section_name,
            section_sequence,
            book_id,
            section_father_id
        }
    ]).single();
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(201).json({
        newSection
    });
};
const getBooks = async (req, res)=>{
    const { data: books, error } = await _supabaseconfig.default.from('books').select('*');
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(200).json({
        books
    });
};
const getSectionsByBook = async (req, res)=>{
    const { bookId } = req.params;
    const { data: sections, error } = await _supabaseconfig.default.from('sections').select('*').eq('bookId', bookId);
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(200).json({
        sections
    });
};
