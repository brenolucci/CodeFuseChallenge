import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.type'

// export const supabase = createClient<Database>(
//   // 'https://edlfjhydoxufvdhfeive.supabase.co',
//   // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbGZqaHlkb3h1ZnZkaGZlaXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMjI5ODksImV4cCI6MjAzMTc5ODk4OX0.bGKl-WMYv8aMnz1XpE4b8iokvafR6tyyugpr2vDBhK4'
//     process.env.SUPABASE_URL as string,
//     process.env.SUPABASE_ANON_KEY as string
//   )
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;