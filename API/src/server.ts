import { createServer } from "http";
import express from "express";
import { supabase } from './database/config';

export const server = async () => {
  const app = express();

  app.get("/", async (req, res) => {
    const { data, error } = await supabase
      .from('books')
      .select();
    res.json(JSON.stringify({data}));
  });

  const server = createServer(app);

  server.listen(8000, () => {
    console.log(`Server running in 8000`);
  });
};