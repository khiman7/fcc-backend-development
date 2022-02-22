const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/",  (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});
 
app.get("/api/:date?", (request, response) => {
  const composeResponse = (date) => {
    return { unix: date.valueOf(), utc: date.toGMTString() };
  };

  if (!request.params.date) {
    const date = new Date();

    response.json(composeResponse(date));
  }

  const date = new Date(Date.parse(request.params.date) || parseInt(request.params.date, 10));
  const valid = !isNaN(date.valueOf());

  if (!valid) {
    response.status(404).json({ error: date.toString() });
  }
  
  response.json(composeResponse(date));
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port: ${PORT}`);
});
