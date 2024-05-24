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
    getBook: function() {
        return getBook;
    },
    getBooks: function() {
        return getBooks;
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
    const { data, error } = await _supabaseconfig.default.from('books').upsert({
        title,
        isbn,
        pages_quantity
    }).select().returns();
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(201).json({
        data
    });
};
const getBooks = async (req, res)=>{
    const { data: books, error } = await _supabaseconfig.default.from('books').select('*').returns();
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(200).json({
        books
    });
};
const getBook = async (req, res)=>{
    const { data: book, error } = await _supabaseconfig.default.from('books').select('*').eq('id', req.query.bookId).returns();
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(200).json(book);
};
