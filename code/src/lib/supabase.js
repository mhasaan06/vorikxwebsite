import { createClient } from '@supabase/supabase-js';

// Fallback to environment variables or project defaults to prevent top-level module crash on Vercel
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://pqebycjcwagorvdmpjfs.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_FWm3A3YApxcBcjmAZ7VslQ_l9go7tD5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
