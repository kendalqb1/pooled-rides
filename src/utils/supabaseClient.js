import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Configuración de persistencia para Supabase
const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storageKey: 'pooled-rides-auth', // Clave personalizada para localStorage
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
};

class SupabaseClient {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = createClient(supabaseUrl, supabaseAnonKey, options);
    }
    return this.instance;
  }
}

export { SupabaseClient };