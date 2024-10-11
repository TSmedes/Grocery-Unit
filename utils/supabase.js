import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  console.log(process.env.VITE_SUPABASE_URL),
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  })
        