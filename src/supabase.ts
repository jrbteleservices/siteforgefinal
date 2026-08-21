import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://supabase.com/dashboard/project/bzowjsrjrdfulevbltro' || '';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6b3dqc3JqcmRmdWxldmJsdHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNjI0ODEsImV4cCI6MjEwMjczODQ4MX0.ROOf4maj6ShokDRNflxwRzusrbZq2efogklyCV6NEdI' || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);