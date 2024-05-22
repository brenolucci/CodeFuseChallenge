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
const createSection = async (req, res)=>{
    const { page_number_start, page_number_end, section_name, section_sequence, book_id, section_father_id } = req.body;
    const { data: newSection, error } = await _supabaseconfig.default.from('sections').upsert([
        {
            page_number_start,
            page_number_end,
            section_name,
            section_sequence,
            book_id,
            section_father_id
        }
    ]).select();
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(201).json({
        newSection
    });
};
const getSectionsByBook = async (req, res)=>{
    const { bookId } = req.params;
    const { data: sections, error } = await _supabaseconfig.default.from('sections').select('*').eq('bookId', bookId).returns();
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(200).json({
        sections
    });
};
