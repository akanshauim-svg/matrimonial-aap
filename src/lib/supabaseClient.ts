import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aoxgbhjhnnobbtilzjwn.supabase.co'
// ✅ Non-null assertion: assure TypeScript that key is defined
const supabaseKey = process.env.SUPABASE_KEY!  

export const supabase = createClient(supabaseUrl, supabaseKey)
