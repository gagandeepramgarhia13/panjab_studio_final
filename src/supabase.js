import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pafgsyhrjntottedfqcu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZmdzeWhyam50b3R0ZWRmcWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwOTMyNDYsImV4cCI6MjA5NzY2OTI0Nn0.-ZpxwhN_an66WQY_z5kuMTnYqzpomSy1NgEXG_R76a8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Storage bucket names (already created in Supabase dashboard)
export const BUCKETS = {
  photos: "photos",
  videos: "videos",
};
