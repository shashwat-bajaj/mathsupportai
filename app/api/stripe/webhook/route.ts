import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createAdminSupabase } from '@/lib/supabase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return new Response('Missing stripe signature', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error) {
    return new Response('Invalid webhook signature', { status: 400 });
  }

  const supabase = createAdminSupabase();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (email) {
      await supabase.from('subscriptions').upsert({
        email,
        stripe_customer_id: String(session.customer || ''),
        plan: 'pro',
        status: 'active'
      });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase
      .from('subscriptions')
      .update({ status: 'canceled' })
      .eq('stripe_customer_id', String(subscription.customer));
  }

  return new Response('ok');
}
