import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Artist = {
  id: string;
  name: string;
  country: string;
  debut: number;
  gender: string;
  members: string;
  popularity: number;
	genre?: Genre
	imageUrl: string
};

export const genres = [
  'HIP HOP',
  'INDIE',
  'POP',
  'R&B',
  'ROCK'
] as const;

export type Genre = typeof genres[number];