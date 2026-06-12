const https = require('https');
const data = JSON.stringify({
  nume: "TEST AI",
  email: "test@ai.com",
  telefon: "123",
  varsta: "32",
  transport: "Masina personala",
  cazareCabana: false,
  plata: "Integral",
  zile: "mai_putine",
  zileAlese: ["Miercuri", "Duminică"],
  amount_paid: "90",
  stripe_session_id: "cs_test_123"
});
const options = {
  hostname: 'script.google.com',
  path: '/macros/s/AKfycbwS_ep7z1KJa03iKlSJG_8FzpYP0jA5rsqIYwp-JDzR49W2_po9y4mV3c-wNhYUVVQ9xA/exec',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};
const req = https.request(options, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    // Follow redirect
    https.get(res.headers.location, (res2) => {
      let resData = '';
      res2.on('data', d => resData += d);
      res2.on('end', () => console.log('Response:', resData));
    });
  } else {
    let resData = '';
    res.on('data', d => resData += d);
    res.on('end', () => console.log('Response:', resData));
  }
});
req.on('error', e => console.error(e));
req.write(data);
req.end();
