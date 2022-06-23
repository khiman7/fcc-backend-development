require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", (_, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (request, response) => {
  const ipaddress = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
  const language = request.headers['accept-language'];
  const software = request.headers['user-agent'];

  response.json({ ipaddress, language, software });
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
