import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { Readable } from 'stream';

// Disable default Vercel bodyParser to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Missing stripe-signature or STRIPE_WEBHOOK_SECRET env variable');
    return res.status(400).send('Webhook Error: Missing signature or webhook secret configuration');
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig as string, webhookSecret);
  } catch (err: unknown) {
    console.error(`⚠️  Webhook signature verification failed.`, (err as Error).message);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  console.log(`Received event type: ${event.type}`);

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) {
      console.error('No metadata found in Stripe Checkout Session');
      return res.status(400).send('Webhook Error: No metadata in session');
    }

    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!sheetsWebhookUrl) {
      console.error('GOOGLE_SHEETS_WEBHOOK_URL env variable is not set');
      return res.status(500).send('Server Error: Sheets webhook not configured');
    }

    try {
      // Forward the registration data to Google Sheets
      const response = await fetch(sheetsWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nume: metadata.nume,
          email: metadata.email,
          telefon: metadata.telefon,
          varsta: metadata.varsta,
          transport: metadata.transport,
          plata: metadata.plata,
          zile: metadata.zile || '',
          zileAlese: metadata.zileAlese ? metadata.zileAlese.split(', ') : [],
          amount_paid: metadata.amount_paid,
          stripe_session_id: session.id,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(`Google Sheets webhook returned status ${response.status}: ${text}`);
        throw new Error('Google Sheets webhook failed');
      }

      console.log(`Successfully recorded registration in Google Sheets for: ${metadata.nume}`);
    } catch (error: unknown) {
      console.error('Error recording payment to Google Sheets:', error);
      // Continue even if Google Sheets fails
    }
  }

  return res.status(200).json({ received: true });
}
