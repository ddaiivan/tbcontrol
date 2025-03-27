import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://inuvippfsfbaziaqazhl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludXZpcHBmc2ZiYXppYXFhemhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzM4OTIsImV4cCI6MjA1ODY0OTg5Mn0.kitAWr3WMkt041P5dpIAWaxrWx0HsGQsHMicVOoqDe4';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
