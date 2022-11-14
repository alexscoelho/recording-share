import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey: any = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
