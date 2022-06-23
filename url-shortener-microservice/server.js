require('dotenv').config();

const dns = require('dns');
const path = require('path');
const url = require('url');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const shortURLs = new Map();

app.use(express.json());
app.use(express.urlencoded())
app.use('/public', express.static(__dirname + '/public')); 
app.use(cors());

app.get('/', (request, response) => {
  const filepath = path.join(__dirname, 'views', 'index.html');
  
  response.sendFile(filepath);
});

app.get('/api/shorturl/:shortURL', (request, response) => {
  const { shortURL } = request.params;

  if (shortURLs.has(shortURL)) {
    const originalURL = shortURLs.get(shortURL);

    response.redirect(originalURL);
  } else {
    response.;
  }
});

app.post('/api/shorturl', (request, response) => {
  const { url: originalURL } = request.body;
  const { hostname } = url.parse(originalURL);

  if (hostname === null) {
    response.json({ error: 'invalid url' });
    return;
  }

  dns.lookup(hostname, (error) => {
    if (error && error.code === 'ENOTFOUND') {
      response.json({ error: 'invalid url' });
    } else {
      const shortURL = (shortURLs.size + 1).toString();
  
      shortURLs.set(shortURL, originalURL);
      
      response.json({ original_url: originalURL, short_url: shortURL });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
