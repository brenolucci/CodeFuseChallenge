"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "server", {
    enumerable: true,
    get: function() {
        return server;
    }
});
const _supabaseconfig = /*#__PURE__*/ _interop_require_default(require("./config/supabase.config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const server = (app)=>{
    app.get("/", async (req, res)=>{
        const { data, error } = await _supabaseconfig.default.from('books').select();
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }
        res.json({
            data
        });
    });
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, ()=>{
        console.log(`Servidor rodando na porta ${PORT}`);
    });
};
