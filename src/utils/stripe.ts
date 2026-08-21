import { supabase } from '../lib/supabase';

export async function createCheckoutSession(planCode: string, amountCents: number) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    alert('Error: You must be logged in to subscribe.');
    return;
  }

  // Call Supabase Edge Function to generate Stripe Checkout URL
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: { planCode, amountCents, userId: user.id }
  });

  if (error || !data?.url) {
    console.error('Stripe Checkout Error:', error);
    alert('Failed to initialize Stripe checkout. Make sure your Stripe Secret Key is configured in Supabase.');
    return;
  }

  // Redirect browser to Stripe's secure hosted payment page
  window.location.href = data.url;
}