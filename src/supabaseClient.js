import { createClient } from '@supabase/supabase-js';

// URL REAL de tu proyecto de Supabase
const SUPABASE_URL = 'https://supabase.co';

// Clave pública Anónima
const SUPABASE_KEY = 'sb_publishable_nLuq8iNA43WsrMAXsTPI1A_171Sr7oS';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
