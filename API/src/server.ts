import supabase from './config/supabase.config'; 
import app from './index'; 
import { Express } from 'express';

export const server = (app: Express) => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
};
