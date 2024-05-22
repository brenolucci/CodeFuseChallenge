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
const server = (app)=>{
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, ()=>{
        console.log(`Servidor rodando na porta ${PORT}`);
    });
};
