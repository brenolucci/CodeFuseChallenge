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
    const sections = req.body;
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
    const { data: newSections, error } = await _supabaseconfig.default.from('sections').upsert(parsedSections).select().returns();
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(201).json({
        newSections
    });
};
const getSectionsByBook = async (req, res)=>{
    const { bookId } = req.params;
    const { data: sections, error } = await _supabaseconfig.default.from('sections').select('*').eq('bookId', bookId).returns();
    // TODO: before returning the sections, we need to parse it back to nested (tree structure) so we can show it on ui
    // USE THE SEQUENCE ID TO SORT THE SIBLINGS
    // USE THE FATHERID TO SORT THE SECTIONS.
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    res.status(200).json({
        sections
    });
};
