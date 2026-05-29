import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { formData } = req.body;

    // Calculate amount based on the form data
    const PRET_INTEGRAL = 450;
    const PRET_ZI = 20; 
    const AVANS = 180;

    let amount = 0;
    let description = '';

    if (formData.plata === 'avans') {
      amount = AVANS;
      description = 'Avans Inspire+ Camp 2026';
    } else if (formData.zile === 'toate') {
      amount = PRET_INTEGRAL;
      description = 'Taxă Integrală Inspire+ Camp 2026';
    } else if (formData.zile === 'mai_putine') {
      amount = formData.zileAlese.length * PRET_ZI;
      description = `Inspire+ Camp 2026 - Zile Alese (${formData.zileAlese.join(', ')})`;
      // Prevent 0 amount for stripe
      if (amount === 0) {
        amount = PRET_INTEGRAL; // Fallback or handle differently
      }
    }

    // Format metadata to save properly later
    const metadata = {
      nume: formData.nume,
      varsta: String(formData.varsta),
      telefon: String(formData.telefon),
      email: formData.email,
      transport: formData.transport,
      cazareCabana: formData.cazareCabana ? 'Da' : 'Nu',
      plata: formData.plata,
      zile: formData.zile,
      zileAlese: formData.zileAlese.join(', '),
    };

    // The URL the user will be redirected to
    const origin = req.headers.origin || 'http://localhost:5173';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: description,
              description: `Nume participant: ${formData.nume}`,
            },
            unit_amount: amount * 100, // Stripe expects amounts in bani (cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}?status=cancel`,
      customer_email: formData.email,
      metadata: metadata,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
