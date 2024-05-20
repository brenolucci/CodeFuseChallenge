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
const _http = require("http");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _config = require("./database/config");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const server = async ()=>{
    const app = (0, _express.default)();
    app.get("/", async (req, res)=>{
        const { data, error } = await _config.supabase.from('books').select();
        res.json(JSON.stringify({
            data,
            error,
            SUPABASE_URL: process.env.SUPABASE_URL
        }));
    });
    const server = (0, _http.createServer)(app);
    server.listen(8000, ()=>{
        console.log(`Server running in 8000`);
    });
};
