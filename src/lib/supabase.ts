import { createClient } from '@supabase/supabase-js';

// Replace these placeholders with your actual Supabase project URL and anon public key when ready
const SUPABASE_URL = 'https://bzowjsrjrdfulevbltro.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6b3dqc3JqcmRmdWxldmJsdHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNjI0ODEsImV4cCI6MjEwMjczODQ4MX0.ROOf4maj6ShokDRNflxwRzusrbZq2efogklyCV6NEdI';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);