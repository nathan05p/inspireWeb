const https = require('https');
https.get('https://inspireweb-bay.vercel.app/', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const match = data.match(/src="\/assets\/index-([^\"]+)\.js"/);
    if(match) {
      https.get('https://inspireweb-bay.vercel.app/assets/index-' + match[1] + '.js', (res) => {
        let js = '';
        res.on('data', d => js += d);
        res.on('end', () => {
          const regex = /PRETURI_ZILE.*?\{.*?\}/;
          console.log(js.match(regex));
        });
      });
    } else {
      console.log('not found');
    }
  });
});
