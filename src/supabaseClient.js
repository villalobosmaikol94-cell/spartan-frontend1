import { createClient } from '@supabase/supabase-js';

// URL REAL de tu proyecto de Supabase
const SUPABASE_URL = 'https://jsuesvoxdnsggkrhceob.supabase.co';

// Clave pública Anónima corregida
const SUPABASE_KEY = 'sb_publishable_nLuq8iNA43WsrMAXsTPI1A_l7lSr7oS';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
