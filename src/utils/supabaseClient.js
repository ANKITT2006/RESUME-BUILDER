import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdrtscodofzldxyzhkgl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcnRzY29kb2Z6bGR4eXpoa2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMjUyODgsImV4cCI6MjEwMjkwMTI4OH0.9BF4rrTkrxcECR7eoDL7tiMH3ugZxqigupgH-6fdjjo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
