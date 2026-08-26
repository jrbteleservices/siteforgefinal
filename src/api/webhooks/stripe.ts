// api/webhooks/stripe.ts
import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-08-27.acacia' as any,
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!webhookSecret) throw new Error('Missing Stripe Webhook Secret');
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle specific multi-tenant subscription and invoice events
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[Stripe Webhook] Invoice payment succeeded for customer: ${invoice.customer}`);
      // TODO: Update tenant subscription renewal status in Supabase database
      break;

    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[Stripe Webhook] Subscription updated: ${subscription.id} (Status: ${subscription.status})`);
      // TODO: Synchronize tenant plan access level
      break;

    default:
      console.log(`Unhandled stripe event type ${event.type}`);
  }

  return res.status(200).json({ received: true });
}