import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// We need the raw body for Stripe webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to read the raw body
const getRawBody = async (req: VercelRequest): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    let body = Buffer.from('');
    req.on('data', (chunk) => {
      body = Buffer.concat([body, chunk]);
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig as string, endpointSecret);
  } catch (err: unknown) {
    console.error(`⚠️  Webhook signature verification failed.`, (err as Error).message);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Retrieve the metadata we stored when creating the session
    const metadata = session.metadata;
    
    if (metadata) {
      console.log('Payment successful for:', metadata.email);
      
      // Send data to Google Sheets
      const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      
      if (googleSheetsUrl) {
        try {
          // Format data to prevent crashes in Google Apps Script
          const formattedData = {
            ...metadata,
            // Ensure zileAlese is an array if the script calls .join on it, or just pass it as string and let the script handle it.
            // Since the current Apps Script calls .join(), we must send an array.
            zileAlese: metadata.zileAlese ? metadata.zileAlese.split(', ') : [],
            cazareCabana: metadata.cazareCabana === 'Da',
            stripe_session_id: session.id
          };

          const response = await fetch(googleSheetsUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
          });
          
          if (!response.ok) {
            console.error('Failed to send data to Google Sheets, HTTP status:', response.status);
          } else {
            const resultText = await response.text();
            console.log('Google Sheets responded with:', resultText);
            try {
              const resultJson = JSON.parse(resultText);
              if (resultJson.status === 'error') {
                console.error('Google Apps Script internal error:', resultJson.message);
              } else {
                console.log('Successfully recorded in Google Sheets');
              }
            } catch {
              // It's possible the response wasn't JSON
            }
          }
        } catch {
          console.error('Error forwarding data to Google Sheets (non-fatal)');
        }
      } else {
        console.warn('GOOGLE_SHEETS_WEBHOOK_URL is not defined in environment variables');
      }
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return res.status(200).json({ received: true });
}
