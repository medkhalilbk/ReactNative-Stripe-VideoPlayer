import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://omcsmyffyjfmzokscfpo.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tY3NteWZmeWpmbXpva3NjZnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNjMyMzIsImV4cCI6MjA1MzYzOTIzMn0.6_c5Hg1rQBdvjqVHzTE9N2te6oMyL1WoPuTFuV9pl3I"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})