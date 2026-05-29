import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { formData } = req.body;

    const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (!googleSheetsUrl) {
      console.warn('GOOGLE_SHEETS_WEBHOOK_URL is not defined in environment variables');
      return res.status(500).json({ error: 'Eroare de configurare a serverului.' });
    }

    // Format data just like we do in the Stripe webhook so the Google Apps Script can understand it
    const formattedData = {
      nume: formData.nume,
      varsta: String(formData.varsta),
      telefon: String(formData.telefon),
      email: formData.email,
      transport: formData.transport,
      cazareCabana: formData.cazareCabana,
      plata: formData.plata,
      zile: formData.zile,
      // Pass array for zileAlese
      zileAlese: formData.zileAlese || [],
      stripe_session_id: 'CASH_PAYMENT_' + Date.now(),
    };

    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });
    
    if (!response.ok) {
      console.error('Failed to send cash data to Google Sheets, HTTP status:', response.status);
      return res.status(500).json({ error: 'Eroare la trimiterea datelor către baza de date.' });
    } 

    const resultText = await response.text();
    try {
      const resultJson = JSON.parse(resultText);
      if (resultJson.status === 'error') {
        console.error('Google Apps Script internal error:', resultJson.message);
        return res.status(500).json({ error: 'Eroare internă în salvarea datelor.' });
      }
    } catch (e) {
      // It's possible the response wasn't JSON
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error submitting cash registration:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
