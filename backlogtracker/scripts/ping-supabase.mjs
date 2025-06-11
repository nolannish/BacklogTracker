import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function ping() {
  const { error } = await supabase.from('users').select('uuid').limit(1);
  if (error) {
    console.error('❌ Supabase ping failed:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Supabase ping successful');
  }
}

ping();
