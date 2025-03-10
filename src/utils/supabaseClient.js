import { createClient } from "@supabase/supabase-js";

export class SupabaseClient {
    static instance = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        }
        return this.instance;
    }
}