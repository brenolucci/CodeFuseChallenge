import supabase from './config/supabase.config'; 
import app from './index'; 
import { Express } from 'express';

export const server = (app: Express) => {
    app.get("/", async (req, res) => {
        const { data, error } = await supabase.from('books').select();
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ data });
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
};
