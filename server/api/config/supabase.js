import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase configuration");
  throw new Error("Missing Supabase configuration");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

// Test Supabase connection
const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .limit(1);

    if (error) {
      console.error("❌ Supabase connection test failed:", error.message);
      throw error;
    }

    console.log("✅ Supabase connection successful");
    console.log("📊 Connected to:", supabaseUrl);
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to Supabase:", error.message);
    return false;
  }
};

export { supabase, testSupabaseConnection };
